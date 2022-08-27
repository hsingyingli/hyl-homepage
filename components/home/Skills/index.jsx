import { Box, Heading } from '@chakra-ui/react';
import ChakraTab from './ChakraTab';
import ChakraProgress from './ChakraProgress';

const Skills = ({ skills, ...rest }) => {
  return (
    <Box {...rest}>
      <Heading
        mb={5}
        fontSize="5xl"
        fontFamily='"M PLUS Rounded 1c", sans-serif'
      >
        Skills
      </Heading>
      <Box width='100%'>
        <ChakraProgress skills={skills}/>
      </Box>
      <Box mt={10} fontWeight="500" fontSize="lg" lineHeight={1.8}>
        <ChakraTab skills={skills}/>
      </Box>
    </Box>
  );
};

export default Skills;
