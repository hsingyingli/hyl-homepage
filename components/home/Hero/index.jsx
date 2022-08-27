import { Box, Heading, Text } from '@chakra-ui/react';
const Hero = ({ ...rest }) => {
  return (
    <Box pb="100px" w='100%' h='100%' display='flex' alignItems='center' justifyContent='center' {...rest}>
      <Box>
        <Heading
          fontSize={{ base: '2.5rem', sm: '3rem', md: '3.5rem' }}
          textAlign="center"
          fontWeight="bold"
          fontFamily='"M PLUS Rounded 1c", sans-serif'
        >
          Hi, I&apos;m Hsing Ying Li.
        </Heading>

        <Text
          fontSize={{ base: '1.5rem', sm: '2rem', md: '2.5rem' }}
          textAlign="center"
          fontWeight="bold"
          fontFamily='"M PLUS Rounded 1c", sans-serif'
        >
          Welcome to my website
        </Text>

        <Text
          fontFamily='"M PLUS Rounded 1c", sans-serif'
          fontSize={{ base: '0.8rem', sm: '1.2rem' }}
          fontWeight={500}
          textAlign="center"
        >
          (Machine Learning / Web Development/{' '}
          <Text
            as="span"
            color="teal.300"
            whiteSpace="nowrap"
          >
            DevOps
          </Text>
          )
        </Text>
      </Box>
    </Box>
  );
};

export default Hero;
