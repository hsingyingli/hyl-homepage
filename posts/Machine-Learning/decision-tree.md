---
title: 'Decision Tree'
date: 'March 29, 2022'
excerpt: 'Decision Tree (python)'
cover_image: '/images/posts/Machine-Learning/decision-tree.png'
id: 'decision tree'
---

### Introdiction to Decisino tree
- The most popular of inductive inference algorithm
- Robust to noise
- Capable of learning disjunctive expressions
- Easily interpretable (Tree structure, If-Then rules)

#### Decision Tree 
- The tree itself forms hypothesis
  - Disjunction (OR’s) of conjunctions (AND’s)
  - Each path from root to leaf forms conjunction of constraints on attributes
  - Separate branches are disjunctio

### When to consider decision tree
- Instances describable by attribute-value pairs
- Target function is discrete valued
- Disjunctive hypothesis may be required
- Possibly noisy training data

### ID3 algorithm 
```
Algorithm Build-DT (Examples, Attributes)
  IF all examples have the same label 
    RETURN (leaf node with label)
  ELSE
    IF set of attributes is empty 
      RETURN (leaf with majority label)
    ELSE
      Choose best attribute A as root
      FOR each value v of A
        Create a branch out of the root for the condition A = v
        IF {x Examples: x.A = v} = Ø 
         RETURN(leaf with majority label)
        ELSE Build-DT ({xExamples: x.A = v}, Attributes ~ {A})
```

#### How to choose best attribute 
> information gain 
```
def entropy(self, y):
    classes = np.unique(y)
    entropy = 0.
    for cls in classes:
        p = len([i for i in y if i == cls]) / len(y)
        entropy += -p*np.log2(p)
    return entropy
```

#### Define Node 
```
class Node(object):
  def __init__(self, feature_idx = None, info_gain=None, threshold = None, left=None, right=None, value=None):
      self.feature_idx = feature_idx
      self.left = left
      self.right = right
      self.info_gain = info_gain
      self.value = value
      self.threshold = threshold
```

#### Main algorithm 
> 1.find best attribute(greedy method)

> 2.get node (next depth)

> 3.find best attributes(greedy method)

> 4.get node (next depth)

> 5.loop until finish (max depth)

```
class DecisionTreeClassifier(object):
  def __init__(self, max_depth=2, min_batch=2):
      self.root = None
      self.min_batch = min_batch
      self.max_depth = max_depth 
      self.Best = namedtuple('Best', ['info_gain', 'feature_idx', 'threshold', 'left', 'right'])
      self.Pair = namedtuple('Pair', ['feature', 'label'])

  def fit(self, x, y):
    self.root = self.get_node(x, y)

  def get_node(self, x, y, curr_depth=0):
    x = np.array(x)
    y = np.array(y)
    batch_size, feature_size = x.shape

    dataset = self.Pair(feature = x, label = y)
    if batch_size >= self.min_batch and curr_depth <= self.max_depth:
        # search node with maximun information gain
        best = self.greedy(dataset, batch_size, feature_size, criterion)
        if best.info_gain > 0:
            # get left children
            left_subtree = self.get_node(best.left.feature, best.left.label, curr_depth+1)
            # get right children
            right_subtree = self.get_node(best.right.feature, best.right.label, curr_depth+1)
            return Node(best.feature_idx, best.info_gain, best.threshold, left_subtree, right_subtree)
    
    value = self.get_value(y)
    return Node(value = value)

```

#### greedy method 

```
def greedy(self, dataset, batch_size, feature_size, criterion):
    best = None
    max_info_gain = -float('inf')
    for idx in range(feature_size):
        feature_value = dataset.feature[:, idx]
        #get all possible threshold 
        thresholds = np.unique(feature_value)
        # search for maximun information gain
        for threshold in thresholds:
            left, right = self.split(dataset, idx, threshold)
            if len(left.label)>0 and len(right.label)>0:
                info_gain = self.information_gain(dataset.label, left.label, right.label, criterion)
                if info_gain > max_info_gain:
                    best = self.Best(info_gain = info_gain, feature_idx = idx, hreshold = threshold, left = left, right = right)
                    max_info_gain = info_gain
    return best

def split(self, dataset, idx, threshold):
    # split dataset to left subtree datset and right subtree dataset
    left_feature  = []
    left_label    = []
    right_feature = []
    right_label   = []
    for row in range(len(dataset.feature)):
        if dataset.feature[row, idx]<= threshold: 
            left_feature.append(np.array(dataset.feature[row]))
            left_label.append(np.array(dataset.label[row]))
        else:
            right_feature.append(np.array(dataset.feature[row]))
            right_label.append(np.array(dataset.label[row]))

    return self.Pair(feature = left_feature, label = left_label), self.Pair(feature = right_feature, label = right_label)

```

#### Source Code 
[github](https://github.com/hsingyingli/machine-learning/blob/main/Classical-Machine-Learning-Algorithm/supervise-learning/decision-tree/model.py)


