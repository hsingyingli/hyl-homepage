import fs from 'fs';
import path from 'path';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, Container } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import Hero from '../components/home/Hero'
import Intro from '../components/home/Intro';
import Skills from '../components/home/Skills'
const MotionBox = motion(Box);

const HomePage = ({ skills }) => {
  const [introRef, introInView] = useInView({ threshold: 0.3 });
  const [skillRef, skillInView] = useInView({ threshold: 0.3 });
  const introAnimation = useAnimation();
  const skillsAnimation = useAnimation();
  useEffect(() => {
    if (introInView) {
      introAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 2,
          bounce: 0.2,
        },
      });
    }

    if (!introInView) {
      introAnimation.start({
        y: 20,
        opacity: 0,
      });
    }
    if (skillInView) {
      skillsAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 2,
          bounce: 0.2,
        },
      });
    }

    if (!skillInView) {
      skillsAnimation.start({
        y: 20,
        opacity: 0,
      });
    }
  }, [introInView, skillInView, introAnimation, skillsAnimation]);

  return (
    <Container maxW="container.lg">
      {/* Hero section */}
      <MotionBox
        className="hero"
        w="100%"
        h="calc(100vh - 80px)"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 2, bounce: 0.3 }}
      >
        <Hero/> 
      </MotionBox>

      {/* Introduction section */}
      <Box
        display="flex"
        alignItems="start"
        justifyContent="center"
        minH="calc(100vh - 80px)"
        ref={introRef}
      >
        <MotionBox animate={introAnimation} w='100%' maxW="container.md">
          <Intro fontFamily='"M PLUS Rounded 1c", sans-serif' px={10} />
        </MotionBox>
      </Box>
      {/* Skills section */}
      <Box
        display="flex"
        alignItems="start"
        justifyContent="center"
        minH="calc(100vh - 80px)"
        ref={skillRef}
      >
        <MotionBox animate={skillsAnimation} w='100%' maxW="container.md">
          <Skills skills={skills} fontFamily='"M PLUS Rounded 1c", sans-serif' px={10} />
        </MotionBox>
      </Box>
    </Container>
  );
};

export async function getStaticProps() {
  let rawData = fs.readFileSync(path.join('public', 'skills.json'), 'utf8')
  const skills = JSON.parse(rawData)
  return {
    props: {
      skills
    }
  }
}

export default HomePage;
