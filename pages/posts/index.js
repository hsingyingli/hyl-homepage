import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {useState} from 'react';
import {motion} from 'framer-motion';
import {Box, Container, Select, Heading, SimpleGrid} from '@chakra-ui/react';
import Card from '../../components/notes/card';
import sortByDate from '../../lib/sortByDate';

const MotionBox = motion(Box);

const NotesPage = ({collection, categories}) => {
  const [value, setValue] = useState('');
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Container maxW="container.lg" p={10}>
      <MotionBox
        initial={{y: 10, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{type: 'spring', duration: 2, bounce: 0.3}}
      >
        <Heading
          textAlign="center"
          fontFamily='"M PLUS Rounded 1c", sans-serif'
          bgGradient="linear(to-l, #FFFFFF, #008080)"
          bgClip="text"
          fontSize={{base: '4xl', md: '6xl'}}
          fontWeight="extrabold"
        >
          {'<CodingDiary />'}
        </Heading>
        <Box maxW="300px" m={10}>
          <Heading
            fontSize="xl"
            mb={3}
            fontFamily='"M PLUS Rounded 1c", sans-serif'
          >
            Category
          </Heading>

          <Select
            size="sm"
            value={value}
            placeholder="Select ..."
            onChange={handleOnChange}
          >
            {categories.map((category, index) => {
              return (
                <option value={category.replace('-', ' ')} key={index}>
                  {category.replace('-', ' ')}
                </option>
              );
            })}
          </Select>
        </Box>
        <Box my={10}>
          <SimpleGrid columns={{base: 1, sm: 2, lg: 3}} gap={8}>
            {collection
              .filter((item) => {
                return item.category.replace('-', ' ').includes(value);
              })
              .map((item, index) => {
                return (
                  <Card
                    key={index}
                    post={item.data}
                    href={`/posts/${item.category}/${item.data.id}`}
                    maxW="300px"
                    maxH="250px"
                    overflow="hidden"
                  />
                );
              })}
          </SimpleGrid>
        </Box>
      </MotionBox>
    </Container>
  );
};

export default NotesPage;

export async function getStaticProps() {
  const categories = fs.readdirSync(path.join('posts'));
  const collection = [];

  categories.map((category) => {
    const postPool = fs.readdirSync(path.join('posts', category));
    postPool.map((post) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', category, post),
        'utf-8',
      );
      const {data} = matter(markdownWithMeta);

      collection.push({
        category,
        data,
      });
    });
  });

  return {
    props: {
      collection: collection.sort(sortByDate),
      categories,
    },
  };
}
