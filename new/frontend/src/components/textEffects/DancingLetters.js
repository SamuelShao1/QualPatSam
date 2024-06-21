import React from 'react';
import { useSprings, animated, config } from 'react-spring';

const DancingLetters = ({ text }) => {
  const letters = text.split('');
  const springs = useSprings(letters.length, letters.map((_, index) => ({
    loop: true,
    to: [
      { transform: 'scale(1.5)', opacity: 1 },
      { transform: 'scale(1)', opacity: 0.5 }
    ],
    from: { transform: 'scale(1)', opacity: 0.5 },
    config: config.wobbly,
    delay: index * 100 // stagger the animation start for each letter
  })));

  return (
    <div style={{ display: 'inline-block' }}>
      {springs.map((props, index) => (
        <animated.span key={index} style={props}>
          {letters[index]}
        </animated.span>
      ))}
    </div>
  );
};

export default DancingLetters;
