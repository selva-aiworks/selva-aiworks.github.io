import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.8,
  mouseConstraintStiffness = 0.35,
  fontSize = '1rem'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    // Sort highlight words by length (descending) to match longest phrases first
    const sortedHighlights = [...highlightWords].sort((a, b) => b.length - a.length);

    // Create regex pattern to match highlight phrases
    // Escape special regex characters in the keywords
    const regexPattern = `(${sortedHighlights.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`;
    const regex = new RegExp(regexPattern, 'g');

    const parts = text.split(regex);

    const newHTML = parts.map(part => {
      // Check if this part matches one of the highlight words
      // We use some() or includes() to be safe, though regex split isolates them
      const isHighlight = sortedHighlights.includes(part);

      if (isHighlight) {
        return `<span
              class="inline-block mx-[2px] select-none text-cyan-500 font-bold"
            >
              ${part}
            </span>`;
      } else {
        // Provide a way to handle empty strings from split if necessary, but map joins them back
        return part.split(/\s+/)
          .filter(word => word.length > 0) // Remove empty strings from whitespace split
          .map(word => `<span
                  class="inline-block mx-[2px] select-none"
                >
                  ${word}
                </span>`)
          .join(' ');
      }
    }).join(' ');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords]);

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    if (!textRef.current) return;
    const wordSpans = textRef.current.querySelectorAll('span');
    const wordBodies = [...wordSpans].map(elem => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2
      });
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    const mouse = Mouse.create(containerRef.current);
    // Allow scrolling by removing wheel listeners
    if (mouse.element) {
      mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
      mouse.element.removeEventListener("wheel", (mouse as any).mousewheel);
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    const handleResize = () => {
      if (!containerRef.current || !canvasContainerRef.current) return;
      const newRect = containerRef.current.getBoundingClientRect();
      const newW = newRect.width;
      const newH = newRect.height;

      render.canvas.width = newW;
      render.canvas.height = newH;

      Matter.Body.setPosition(floor, { x: newW / 2, y: newH + 25 });
      Matter.Body.setPosition(rightWall, { x: newW + 25, y: newH / 2 });
      Matter.Body.setPosition(leftWall, { x: -25, y: newH / 2 });
      Matter.Body.setPosition(ceiling, { x: newW / 2, y: -25 });

      // Update dimensions of static bodies
      Matter.Body.setVertices(floor, Matter.Bodies.rectangle(newW / 2, newH + 25, newW, 50).vertices);
      Matter.Body.setVertices(ceiling, Matter.Bodies.rectangle(newW / 2, -25, newW, 50).vertices);
      Matter.Body.setVertices(rightWall, Matter.Bodies.rectangle(newW + 25, newH / 2, 50, newH).vertices);
      Matter.Body.setVertices(leftWall, Matter.Bodies.rectangle(-25, newH / 2, 50, newH).vertices);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        // canvasContainerRef.current.removeChild(render.canvas);
        // React might handle cleanup, check if child exists
        if (canvasContainerRef.current.contains(render.canvas)) {
          canvasContainerRef.current.removeChild(render.canvas);
        }
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-pointer text-center overflow-hidden flex flex-col items-center justify-center"
      style={{ touchAction: 'pan-y' }}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block"
        style={{
          fontSize,
          lineHeight: 1.4
        }}
      />

      <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingText;
