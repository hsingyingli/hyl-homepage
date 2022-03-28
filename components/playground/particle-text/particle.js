class Particle {
  constructor(x, y, baseX, baseY, size, weight) {
    this.x = x;
    this.y = y;
    this.baseX = baseX;
    this.baseY = baseY;
    this.size = size;
    this.weight = weight;
    this.opacity = 1;
  }
}

export function connectParticle(ctxRef, particleArray, particleColor) {
  let opacityValue = 1;
  for (let i = 0; i < particleArray.current.length; i++) {
    for (let j = i; j < particleArray.current.length; j++) {
      let dx = particleArray.current[i].x - particleArray.current[j].x;
      let dy = particleArray.current[i].y - particleArray.current[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 20) {
        opacityValue = 1 - distance / 20;
        ctxRef.current.strokeStyle = `rgba(${particleColor}, ${opacityValue})`;
        ctxRef.current.beginPath();
        ctxRef.current.lineWidth = 1;
        ctxRef.current.moveTo(particleArray.current[i].x, particleArray.current[i].y);
        ctxRef.current.lineTo(particleArray.current[j].x, particleArray.current[j].y);
        ctxRef.current.stroke();
      }
    }
  }
}

export function updateParticle(particleArray, mouse) {
  particleArray.current.forEach((particle) => {
    let dx = particle.x - mouse.x;
    let dy = particle.y - mouse.y;
    let distance = Math.sqrt(dx*dx + dy*dy)

    if (distance < mouse.radius) {
      particle.x += dx/2
      particle.y += dy/2
    }

    if (particle.x != particle.baseX) {
      let dx = (particle.x - particle.baseX) / 50;
      particle.x -= dx;
    }
    if (particle.y != particle.baseY) {
      let dy = (particle.y - particle.baseY) / 50;
      particle.y -= dy;
    }


    particle.x += (Math.random() - Math.random())/1.5
    particle.y += (Math.random() - Math.random())/1.5
  });
}

export function initParticle(ctxRef, particleArray, fontSize) {
  particleArray.current = []
  const width = ctxRef.current.canvas.width;
  const height = ctxRef.current.canvas.height;

  ctxRef.current.clearRect(0, 0, width, height);
  ctxRef.current.textAlign = 'center';
  ctxRef.current.font = `${fontSize} Comic Sans MS`;
  ctxRef.current.fillText('NEXT.js', (width) / 2, ((height-80) / 2) -20  );
  ctxRef.current.fillText('+', (width) / 2, ((height-80) / 2)  );
  ctxRef.current.fillText('ChakraUI', (width) / 2, ((height-80) / 2) +20 );
  const data = ctxRef.current.getImageData(0, 0, width, height);

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
        let baseX = x + (x - width / 2) * 5 ;
        let baseY = y + (y - (height-80) / 2) * 5 ;
        let positionX = Math.random() * width;
        let positionY = Math.random() * height;
        particleArray.current.push(
          new Particle(positionX, positionY, baseX, baseY, 1, 1),
        );
      }
    }
  }
}

export function drawParticle(ctxRef, particleArray, particleColor) {
  ctxRef.current.clearRect(
    0,
    0,
    ctxRef.current.canvas.width,
    ctxRef.current.canvas.height,
  );
  particleArray.current.forEach((particle) => {
    ctxRef.current.beginPath();
    ctxRef.current.arc(
      particle.x,
      particle.y,
      particle.size,
      0,
      Math.PI * 2,
      false,
    );
    ctxRef.current.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
    ctxRef.current.fill();
    ctxRef.current.closePath();
  });
}
