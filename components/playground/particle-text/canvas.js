import {useRef, useEffect} from 'react';
import {useColorModeValue, useBreakpointValue} from '@chakra-ui/react';
import {drawParticle, updateParticle, connectParticle, initParticle} from './particle'



export default function Canvas({...rest}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const particleArray = useRef([]);
  const mouse = useRef({
    x: null,
    y: null,
    radius: 80,
  })
  const fontSize = useBreakpointValue({base: '1rem', xs: '1.2rem', sm: '1.4rem', md: '2rem'})

  const particleColor = useColorModeValue('0, 0, 0', '83, 249, 244');

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (canvasRef?.current && ctxRef?.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        initParticle(ctxRef, particleArray, fontSize);
      }
    });

    window.addEventListener('mousemove', (event) => {
      mouse.current.x = event.x ;
      mouse.current.y = event.y - 80;
    });
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext('2d');

    initParticle(ctxRef, particleArray, fontSize);
    let animationFrameId;

    const render = () => {
      drawParticle(ctxRef, particleArray, particleColor);
      connectParticle(ctxRef, particleArray, particleColor);
      updateParticle(particleArray, mouse.current);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [fontSize, particleColor, mouse]);

  return (
    <canvas ref={canvasRef} {...rest}>
      your browser dont support canvas tag
    </canvas>
  );
}
