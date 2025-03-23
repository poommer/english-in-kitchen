import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const gridSize = 9;
const directions = [[0, 1], [1, 0], [1, 1], [-1, 1]];

const shuffleArray = (array) => {
    for (let r = 1; r <= 3; r++) {
      // console.log('round',r);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // console.log(`Swapping ${array[i]} with ${array[j]}`); // ดูการสลับแต่ละครั้ง
        [array[i], array[j]] = [array[j], array[i]];
      }
      // console.log('result',array);
    }
    return array;
  };


const generateGrid = (words) => {
    if (!Array.isArray(words)) {
        console.error("Expected 'words' to be an array");
        return [];
      }
    
  let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
console.log("grid: ", grid);


words?.forEach((word) => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      let row = Math.floor(Math.random() * gridSize);
      let col = Math.floor(Math.random() * gridSize);
      let [dx, dy] = directions[Math.floor(Math.random() * directions.length)];

      if (canPlaceWord(grid, word.en.toUpperCase(), row, col, dx, dy)) {
        for (let i = 0; i < word.en.length; i++) {
          grid[row + i * dx][col + i * dy] = {type:'ans',status:false,char:word.en[i].toUpperCase()};
        }
        placed = true;
      }
      attempts++;
    }
  });

  return fillEmptyCells(grid);
};

const canPlaceWord = (grid, word, row, col, dx, dy) => {
  for (let i = 0; i < word.length; i++) {
    let newRow = row + i * dx;
    let newCol = col + i * dy;
    if (
      newRow < 0 ||
      newCol < 0 ||
      newRow >= gridSize ||
      newCol >= gridSize ||
      (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i])
    ) {
      return false;
    }
  }
  return true;
};

const fillEmptyCells = (grid) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const weightedLetters =
    "EEEEEEEEEEAAAAAAAIIIIIOOOOOUUUUYYYYTTTTTSSSSRRRRNNNNLLLLDDDDGGGGBBCCMMFFHHVVWWYYKJXQZ";
  return grid.map((row) =>
    row.map(
      (cell) =>
        cell === ""
          ? {type:'hit',status:false, char:weightedLetters[Math.floor(Math.random() * weightedLetters.length)]}
          : cell
    )
  );
};

const WordSearch = ({ words, setScore, point }) => {
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [foundWords, setFoundWords] = useState([]); // คำที่พบแล้ว

  useEffect(() => {
    if(words?.length > 0){
        const wordUse = shuffleArray(words).slice(0,10)
    setWordList(wordUse)
    setGrid(generateGrid(wordUse));
    console.log("word List",wordUse);
    }
  }, [words]);

  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    setStartCell([row, col]);
    setSelectedCells([[row, col]]);
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging) {
      const endRow = row;
      const endCol = col;
      const newCells = getHighlightedCells(startCell[0], startCell[1], endRow, endCol);
      setSelectedCells(newCells);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartCell(null);
    checkForFoundWords(selectedCells); // ตรวจสอบว่าพบคำหรือไม่
    setSelectedCells([])
    
  };

  const getHighlightedCells = (startRow, startCol, endRow, endCol) => {
    const cells = [];
    const dx = endRow - startRow;
    const dy = endCol - startCol;
    const length = Math.max(Math.abs(dx), Math.abs(dy));

    for (let i = 0; i <= length; i++) {
      const newRow = startRow + Math.sign(dx) * i;
      const newCol = startCol + Math.sign(dy) * i;
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
        cells.push([newRow, newCol]);
      }
    }
    return cells;
  };

  // ฟังก์ชันตรวจสอบคำที่พบ
  const checkForFoundWords = (selectedCells) => {
    const selectedWord = selectedCells
      .map(([row, col]) => { 
        return grid[row][col].char
    })
      .join("");
    const foundWord = words.find(
      (word) => word.en.toUpperCase() === selectedWord
    );

    if (foundWord && !foundWords.includes(foundWord.en)) {
      setFoundWords([...foundWords, foundWord.en]);
      console.log('correct!');
      setScore(point+1)
          // อัปเดตกริดเมื่อพบคำที่ถูกต้อง
  setGrid((prevGrid) => {
    // สร้างกริดใหม่จากกริดเดิม
    const updatedGrid = [...prevGrid];
    
    // อัปเดตสถานะเป็น true สำหรับตำแหน่งที่เลือก
    selectedCells.forEach(([row, col]) => {
      updatedGrid[row][col] = {
        ...updatedGrid[row][col],
        status: true,
      };
    });
    
    return updatedGrid; // คืนค่ากริดที่อัปเดตแล้ว
  });

  console.log("new Grid:", grid);
    }

    

    
  };

  return (
    <div className="flex flex-col items-center  ">
      <h1 className="text-2xl font-bold mb-4">Word Search Game</h1>
      <div className="w-full mb-4">
        <h2 className="text-xl font-semibold">Words to find:</h2>
        <ul className="grid grid-cols-3 grid-rows-1 auto-rows-max gap-4 overflow-hidden">
          {wordList?.length > 0 && wordList?.map((word, index) => (
            <li key={index} className="text-lg ">
              {foundWords.includes(word.en) ? (

                <div className="
                relative w-full pl-4 bg-green-100 flex gap-2 text-green-500 rounded-full 
                before:absolute before:h-0.5 before:w-[80%] before:bg-green-400 before:left-3 before:top-3.5 
                ">
                    {index+1}
                    <span className="ml-2">{word.en}</span>
                    </div>

              ) : (
                <div className="flex gap-2">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-amber-100">{index+1}</div>
                <span>{word.en}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        className="grid mt-4 bg-zinc-200 p-2"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 40px)` }}
      >
        {grid.flat().map((letter, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const isSelected = selectedCells.some(
            (cell) => cell[0] === row && cell[1] === col
          );
          const isFound = foundWords.includes(letter);

          return (
            <motion.div
              key={index}
              className={`w-10 h-10 flex items-center justify-center bg-blue-200 text-lg font-bold border-[0.5px] select-none cursor-pointer ${
                isSelected  ? "bg-yellow-300" : ""
              } ${letter.status ? "bg-green-300 line-through border-green-500" : ""}`}
              whileHover={{ scale: 1.2 }}
              onMouseDown={() => handleMouseDown(row, col)}
              onMouseEnter={() => handleMouseEnter(row, col)}
              onMouseUp={handleMouseUp}
            >
              {letter.char}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WordSearch;
