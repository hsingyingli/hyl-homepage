import {Box, Container, Heading, SimpleGrid} from '@chakra-ui/react';
import Canvas from '../../components/playground//canvas';
import Card from '../../components/playground/card';

export default function Playground() {
  const canvasOption = {
    position: 'fixed',
    top: 100,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -10,
  };
  return (
    <Container maxW="container.lg" minH='100vh' p={10}>
      <Canvas style={canvasOption} />
      <Box>
        <Heading
          textAlign="center"
          fontFamily='"M PLUS Rounded 1c", sans-serif'
          bgGradient="linear(to-l, #FFFFFF, #008080)"
          bgClip="text"
          fontSize={{base: '4xl', md: '6xl'}}
          fontWeight="extrabold"
        >
          {'<Play with Canvas />'}
        </Heading>
      </Box>
      <Box my={10}>
        <SimpleGrid columns={{base: 1, sm: 2, lg: 3}} gap={8}>
          <Card
            text={'Particle Text'}
            image={'/images/playground/particle-text.png'}
            href={'/playground/particleText'}
            maxW="300px"
            maxH="250px"
            overflow="hidden"
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
