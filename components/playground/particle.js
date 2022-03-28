class Particle {
  constructor(x, y, size, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = weight;
    this.opacity = 1;
  }
}

export function connectParticle(ctxRef, particleArray, particleColor) {
  for (let i = 0; i < particleArray.current.length; i++) {
    for (let j = i; j < particleArray.current.length; j++) {
      let dx = particleArray.current[i].x - particleArray.current[j].x;
      let dy = particleArray.current[i].y - particleArray.current[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        let opacityValue = Math.min(
          particleArray.current[i].opacity,
          particleArray.current[j].opacity,
        );
        ctxRef.current.strokeStyle = `rgba(${particleColor}, ${opacityValue})`;
        ctxRef.current.beginPath();
        ctxRef.current.lineWidth = 1;
        ctxRef.current.moveTo(
          particleArray.current[i].x,
          particleArray.current[i].y,
        );
        ctxRef.current.lineTo(
          particleArray.current[j].x,
          particleArray.current[j].y,
        );
        ctxRef.current.stroke();
      }
    }
  }
}

export function updateParticle(ctxRef, particleArray) {
  const height = ctxRef.current.canvas.height;

  particleArray.current.forEach((particle) => {
    particle.y += Math.random() * 15;
    particle.opacity *= 0.9;
  });
  particleArray.current = particleArray.current.filter((particle) => {
    return particle.y < height;
  });
}

export function addParticle(particleArray, mouse) {
  particleArray.current.push(
    new Particle(
      mouse.x + Math.random() * 50,
      mouse.y + Math.random() * 50,
      2,
      2,
    ),
  );
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
    ctxRef.current.fillStyle = `rgba(${particleColor}, ${0})`;
    ctxRef.current.fill();
    ctxRef.current.closePath();
  });
}
