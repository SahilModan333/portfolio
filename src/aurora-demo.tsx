import { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuroraBackdrop } from '@/components/motion/aurora-backdrop';
import { cn } from '@/lib/utils';

/* The Realtime Colors config, in the order the tool emits it:
   text #050315 · background #fbfbfe · primary #2f27ce · secondary #dedcff · accent #433bff */
const palette = ['#2f27ce', '#433bff', '#dedcff'];

const speeds = [
  { label: 'calm', value: 0.6 },
  { label: 'base', value: 1 },
  { label: 'brisk', value: 1.8 },
];

const counts = [2, 3, 4, 6];

function Toggle({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1 text-xs font-medium transition-colors',
        active
          ? 'bg-rc-primary text-white'
          : 'bg-rc-text/5 text-rc-text/60 hover:bg-rc-text/10'
      )}
    >
      {children}
    </button>
  );
}

function Demo() {
  const [speed, setSpeed] = useState(1);
  const [blobs, setBlobs] = useState(4);

  return (
    <div className='relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-rc-bg px-6 py-16 font-inter text-rc-text'>
      <AuroraBackdrop colors={palette} blobs={blobs} speed={speed} />

      <div className='w-full max-w-2xl'>
        <p className='text-sm font-medium tracking-wide text-rc-primary'>
          New primitive · AuroraBackdrop
        </p>

        <h1 className='mt-4 max-w-[18ch] text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-6xl'>
          Ambient depth, painted with motion.
        </h1>

        <p className='mt-6 max-w-[58ch] text-lg leading-relaxed text-rc-text/70'>
          A drifting gradient field built from the same{' '}
          <code className='rounded bg-rc-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-rc-primary'>
            motion/react
          </code>{' '}
          primitives as the rest of the kit. Drift runs on transforms only, so the field
          composites on the GPU and never triggers layout.
        </p>

        <div className='mt-8 flex flex-wrap items-center gap-3'>
          <a
            href='#controls'
            className='rounded-lg bg-rc-primary px-4 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5'
          >
            Install the primitive
          </a>
          <a
            href='#controls'
            className='rounded-lg border border-rc-text/15 bg-white/60 px-4 py-2.5 text-sm font-medium text-rc-text backdrop-blur transition-colors hover:bg-white'
          >
            Read the props
          </a>
        </div>

        <div
          id='controls'
          className='mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rc-text/10 pt-6 text-sm'
        >
          <div className='flex items-center gap-3'>
            <span className='text-rc-text/50'>speed</span>
            <div className='flex gap-1'>
              {speeds.map((option) => (
                <Toggle
                  key={option.label}
                  active={speed === option.value}
                  onClick={() => setSpeed(option.value)}
                >
                  {option.label}
                </Toggle>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <span className='text-rc-text/50'>blobs</span>
            <div className='flex gap-1'>
              {counts.map((option) => (
                <Toggle
                  key={option}
                  active={blobs === option}
                  onClick={() => setBlobs(option)}
                >
                  {String(option)}
                </Toggle>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Demo />
  </StrictMode>
);
