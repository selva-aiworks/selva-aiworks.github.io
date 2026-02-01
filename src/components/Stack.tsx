'use client';

import NextImage from 'next/image';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string; title?: string; link?: string }[];
  animationConfig?: { stiffness: number; damping: number };
  onCardChange?: (card: { id: number; img: string; title?: string; link?: string }) => void;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 400, height: 300 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  onCardChange
}: StackProps) {
  const [cards, setCards] = useState(cardsData);
  const [dimensions, setDimensions] = useState(cardDimensions);
  const [randomRotations, setRandomRotations] = useState<Record<number, number>>({});

  // Generate random rotations on the client side only (after mount)
  useEffect(() => {
    if (randomRotation) {
      const rotations: Record<number, number> = {};
      cardsData.forEach(card => {
        rotations[card.id] = Math.random() * 10 - 5;
      });
      setRandomRotations(rotations);
    }
  }, [randomRotation, cardsData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setDimensions({ width: 280, height: 200 });
      } else if (window.innerWidth < 768) { // md breakpoint
        setDimensions({ width: 320, height: 240 });
      } else {
        setDimensions(cardDimensions);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardDimensions]);

  const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);

      // Notify parent component about the new top card
      if (onCardChange && newCards.length > 0) {
        onCardChange(newCards[newCards.length - 1]);
      }

      return newCards;
    });
  };

  return (
    <div
      className="relative mx-auto"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotations[card.id] || 0;

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="image-container relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: dimensions.width,
                height: dimensions.height
              }}
            >
              <NextImage 
                  src={card.img} 
                  alt={card.title || `card-${card.id}`} 
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 400px"
                  priority={index > cards.length - 3}
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}