import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import {Box, Container} from '@chakra-ui/react';
import {motion, useAnimation} from 'framer-motion';
import Hero from '../components/home/hero';
import Intro from '../components/home/intro';

const MotionBox = motion(Box);

const HomePage = () => {
  const [introRef, introInView] = useInView({threshold: 0.3});
  const animation = useAnimation();

  useEffect(() => {
    if (introInView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 2,
          bounce: 0.3,
        },
      });
    }

    if (!introInView) {
      animation.start({
        y: 20,
        opacity: 0,
      });
    }
  }, [introInView, animation]);

  return (
    <Container maxW='container.lg'>

      {/* Hero section */}
      <MotionBox
        className="hero"
        w="100%"
        h="calc(100vh - 100px)"
        initial={{y: 10, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{type: 'spring', duration: 2, bounce: 0.3}}
      >
        <Hero />
      </MotionBox>

      {/* Introduction section */}
      <Box  display='flex' alignItems='center' justifyContent='center' minH="calc(100vh - 100px)" ref={introRef} className="introduction">
        <MotionBox animate={animation} maxW='container.md'>
          <Intro fontFamily='"M PLUS Rounded 1c", sans-serif' px={10} />
        </MotionBox>
      </Box>
    </Container>
  );
};

export default HomePage;
