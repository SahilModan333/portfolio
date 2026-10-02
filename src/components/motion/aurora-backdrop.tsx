'use client';
import { useMemo } from 'react';
import { motion, Transition, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export type AuroraBackdropProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Colours sampled per blob, cycled. Tints are expected to be semi-transparent. */
  colors?: string[];
  /** Number of drifting blobs. Each one is a composited layer, so keep it small. */
  blobs?: number;
  /** Multiplier on the drift cycle. 1 is the default tempo, 2 is twice as fast. */
  speed?: number;
  /** Multiplier on blob opacity. 0 renders the field invisible, 1 is the base. */
  intensity?: number;
  blur?: 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest';
  transition?: Transition;
};

const blurPresets: Record<NonNullable<AuroraBackdropProps['blur']>, string> = {
  soft: 'blur-2xl',
  medium: 'blur-3xl',
  strong: 'blur-[96px]',
  stronger: 'blur-[128px]',
  strongest: 'blur-[160px]',
};

const defaultColors = ['#2f27ce', '#433bff', '#dedcff'];

/* Deterministic hash in [0, 1). Blob geometry must be stable across renders and
   identical on server and client, which rules out Math.random(). */
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function AuroraBackdrop({
  className,
  style,
  colors = defaultColors,
  blobs = 4,
  speed = 1,
  intensity = 1,
  blur = 'strong',
  transition,
}: AuroraBackdropProps) {
  const shouldReduceMotion = useReducedMotion();
  const count = Math.max(1, Math.round(blobs));

  const field = useMemo(() => {
    const palette = colors.length > 0 ? colors : defaultColors;

    return Array.from({ length: count }, (_, i) => {
      const duration = (14 + hash(i + 1) * 12) / Math.max(speed, 0.05);

      return {
        color: palette[i % palette.length],
        duration,
        opacity: Math.min(1, (0.22 + hash(i + 7) * 0.28) * intensity),
        size: 34 + hash(i + 13) * 38,
        left: 4 + hash(i + 19) * 84,
        top: 6 + hash(i + 29) * 78,
        driftX: 6 + hash(i + 37) * 12,
        driftY: 5 + hash(i + 41) * 10,
        scale: 1.08 + hash(i + 43) * 0.22,
        /* Stagger start times so the field never pulses in unison. */
        delay: hash(i + 53) * 1.5,
      };
    });
  }, [colors, count, intensity, speed]);

  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
      style={style}
    >
      {field.map((blob, index) => (
        <motion.div
          key={index}
          className={cn(
            'absolute transform-gpu rounded-full will-change-transform',
            blurPresets[blur]
          )}
          style={{
            width: `${blob.size}%`,
            height: `${blob.size}%`,
            left: `${blob.left}%`,
            top: `${blob.top}%`,
            opacity: blob.opacity,
            background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 68%)`,
          }}
          initial={{ x: '0%', y: '0%', scale: 1 }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ['0%', `${blob.driftX}%`, `${-blob.driftX * 0.6}%`, '0%'],
                  y: ['0%', `${blob.driftY}%`, `${-blob.driftY * 0.5}%`, '0%'],
                  scale: [1, blob.scale, 1, 1],
                }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay,
            ...transition,
          }}
        />
      ))}
    </div>
  );
}
