import NextLink from 'next/link';
import {Box, Text, Heading, Progress, Button} from '@chakra-ui/react';
const Intro = ({...rest}) => {
  return (
    <Box {...rest}>
      <Box>
        <Heading
          mb={5}
          fontSize="5xl"
          fontFamily='"M PLUS Rounded 1c", sans-serif'
        >
          About me
        </Heading>
        <Text pt={3} fontSize="lg" fontWeight="500" lineHeight={1.8}>
          I am Hsing Ying Li, a graduate student in C.S. at FJU. My research
          interests include Machine Learning in FinTech. Meanwhile, I also
          self-learn web development.
        </Text>
      </Box>
      <Box mt={10}>
        <Heading
          mb={5}
          fontSize="5xl"
          fontFamily='"M PLUS Rounded 1c", sans-serif'
        >
          Skills
        </Heading>
        <Box>
          <Text pt={3} pb={1} fontSize="xl" fontWeight="500">
            Machine learning
          </Text>
          <Progress isAnimated={true} value={80} size="xs" colorScheme="teal" />
          <Text pt={3} pb={1} fontSize="xl" fontWeight="500">
            Front-end
          </Text>
          <Progress value={70} size="xs" colorScheme="orange" />
          <Text pt={3} pb={1} fontSize="xl" fontWeight="500">
            Back-end
          </Text>
          <Progress value={60} size="xs" colorScheme="pink" />
        </Box>
        <Box mt={10} fontWeight="500" fontSize="lg" lineHeight={1.8}>
          C, C++, Python, Pytorch, Numpy, Pandas, Matplotlib, Sklearn, React.js,
          Next.js, React Native, HTML, CSS, Javascript, Node.js, MongoDB, MySQL
        </Box>
        <Box textAlign="center" mt={5}>
          <NextLink href="/posts">
            <Button m={6} colorScheme="teal">
              Posts
            </Button>
          </NextLink>
          <NextLink href="/playground">
            <Button m={6} colorScheme="teal">
              Playground
            </Button>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
