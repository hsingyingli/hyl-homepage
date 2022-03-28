import {Box} from '@chakra-ui/react';
import Canvas from '../../../components/playground/particle-text/canvas';

export default function ParticleText() {
  const canvasOption = {
    width: '100%',
    height: '100%',
  }

  return (
    <Box w="100%" h="100%" >
      <Canvas style={canvasOption}/>
    </Box>
  );
}
