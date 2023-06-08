import React, { useEffect, useState } from 'react';
import "../styles/Chat.css";

const LettersComponent = ({room}) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [text, setText] = useState(`Welcome to the room`);

  const handleMouseOver = () => {
    let count = 0;
    const interval = setInterval(() => {
      setText(prevText => {
        let newText = prevText.split('').map((letter, index) => {
          if (index < count) {
            return text.charAt(index);
          }
          return letters[Math.floor(Math.random() * letters.length)];
        }).join("");

        if (count >= prevText.length) {
          clearInterval(interval);
        }
        count += 1 / 4;
        return newText;
      });
    }, 20);
  };

  useEffect(() => {
    const heading = document.querySelector('h1');
    heading.addEventListener('mouseover', handleMouseOver);

    return () => {
      heading.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <h1 className='headxxx'>{text}</h1>
  );
};

export default LettersComponent;
