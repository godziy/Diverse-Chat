import React, { useEffect, useState } from 'react';
import '../styles/MatrixAnimations.css';

const MatrixAnimation = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const generateColumns = () => {
      const newColumns = [];
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const numColumns = 10;
      const numRows = Math.floor(window.innerHeight / 20);

      for (let i = 0; i < numColumns; i++) {
        const column = [];
        for (let j = 0; j < numRows; j++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          const character = characters.charAt(randomIndex);
          column.push(character);
        }
        newColumns.push(column);
      }

      setColumns(newColumns);
    };

    const moveColumns = () => {
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Add this line
      setInterval(() => {
        setColumns((prevColumns) => {
          const newColumns = prevColumns.map((column) => {
            const randomIndex = Math.floor(Math.random() * characters.length);
            const character = characters.charAt(randomIndex);
            column.pop();
            column.unshift(character);
            return [...column];
          });
          return newColumns;
        });
      }, 100);
    };

    generateColumns();
    moveColumns();

    // Recalculate columns on window resize
    window.addEventListener('resize', generateColumns);
    return () => {
      window.removeEventListener('resize', generateColumns);
    };
  }, []);

  return (
    <div className="matrix-animation">
      {columns.map((column, columnIndex) => (
        <div className="matrix-column" key={columnIndex}>
          {column.map((character, rowIndex) => (
            <span className="matrix-character" key={rowIndex}>
              {character}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixAnimation;
