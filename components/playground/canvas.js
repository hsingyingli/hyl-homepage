import {useRef, useEffect} from 'react';
import {useColorModeValue} from '@chakra-ui/react';
import {
  drawParticle,
  updateParticle,
  connectParticle,
  addParticle,
} from './particle';

export default function Canvas({...rest}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const particleArray = useRef([]);
  const mouse = useRef({
    x: null,
    y: null,
    radius: 80,
  });

  const particleColor = useColorModeValue('0, 0, 0', '83, 249, 244');

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (canvasRef?.current && ctxRef?.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        particleArray.current = [];
      }
    });

    window.addEventListener('mousemove', (event) => {
      mouse.current.x = event.x;
      mouse.current.y = event.y - 80;

      if (particleArray?.current) {
        addParticle(particleArray, mouse.current);
      }
    });
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext('2d');

    let animationFrameId;

    const render = () => {
      drawParticle(ctxRef, particleArray, particleColor);
      connectParticle(ctxRef, particleArray, particleColor);
      updateParticle(ctxRef, particleArray);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [particleColor, mouse]);

  return (
    <canvas ref={canvasRef} {...rest}>
      your browser dont support canvas tag
    </canvas>
  );
}
