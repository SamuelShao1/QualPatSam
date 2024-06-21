import React from 'react';
import { useSpring, animated } from 'react-spring';

const RippleText = ({ text }) => {
  const fading = useSpring({
    from: { backgroundPosition: '0% 50%', opacity: 0 },
    to: async (next) => {
      while (1) {
        await next({ backgroundPosition: '100% 50%', opacity: 1 });
        await next({ backgroundPosition: '0% 50%', opacity: 0 });
      }
    },
    config: { duration: 3000 },
  });

  return (
    <animated.div
      style={{
        ...fading,
        background: 'linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2rem',
        fontWeight: 'bold',
        display: 'inline-block',
      }}
    >
      {text}
    </animated.div>
  );
};

export default RippleText;
