import { useEffect, useState } from "react";
import { Button } from "./Button";

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

export function Multiple_choice({ data, word, point, setScore }) {
  const getThreeItems = (data, specificWord) => {
    // กรองเอาค่าที่กำหนดเอง
    const selectedItem = data.filter((item) => item.en === specificWord);
    // กรองเอาค่าที่ไม่ใช่ค่าที่กำหนดเอง
    let otherItems = data.filter((item) => item.en !== specificWord);

    // สุ่มค่าอีก 2 ค่า
    otherItems = shuffleArray(otherItems).slice(0, 2);

    // รวมค่าและ return เฉพาะ word_en และ soundURL
    return [...selectedItem, ...otherItems].map((item) => ({
      en: item.en,
      check: null,
    }));
  };

  const handleClick = (selectedEn) => {
    setChoice((prevChoice) =>
      prevChoice.map((item) =>
        item.en === selectedEn
          ? { ...item, check: item.en === data[word].en }
          : item
      )
    );

    if (selectedEn === data[word].en) {
      setStatus(true); // ล็อกปุ่มทั้งหมดเมื่อเลือกถูก
      setScore(point + 1);
    } else {
      setStatus(true); // ล็อกปุ่มทั้งหมดเมื่อเลือกถูก
      setChoice((prevChoice) =>
        prevChoice.map((item) =>
          item.en === data[word].en
            ? { ...item, check: true } // กำหนด check เป็น true
            : item
        )
      );
    }
  };

  const [choice, setChoice] = useState([]);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (data?.[word]?.en) {
      setChoice(shuffleArray(getThreeItems(data, data[word].en)));
      setStatus(false);
    }
    console.log(choice);
  }, [data, word]);

  console.log("Prop:", data);

  return (
    <div className="flex flex-col gap-8">
      {choice.map((val, index) => (
        <Button
          key={index}
          color={val.check === null ? "light" : val.check ? "green" : "second"}
          text={val.en}
          disabled={val.check == null && status}
          onclick={() => {
            console.log("clicked!");
            handleClick(val.en);
          }}
        />
      ))}
    </div>
  );
}

export function Unscramble({ word, point, setScore }) {
  const [char, setChar] = useState([]);
  const [Ans, setAns] = useState([]);
  const [check, setCheck] = useState(null);
  const [status, setStatus] = useState(false);

  const add_ans = () => {};
  useEffect(() => {
    if (word) {
      setChar(shuffleArray(word.en.split("")));
      setStatus(false);
      setCheck(null);
      setAns([]);
    }
    console.log(char);
  }, [word]);
  return (
    <>
      <div
        className={`w-full h-[4.5rem] p-2 text-4xl border-2 rounded-[5px] bg-white text-black-2 transition-all flex justify-between items-center
        ${
          check == null
            ? "border-[#E0DFD5] shadow-[0px_10px_0px_0px_#E0DFD5]"
            : check == true
            ? "border-[#6B8E23]  shadow-[0px_7px_0px_0px_#6B8E23]"
            : "border-second shadow-[0px_7px_0px_0px_#EF6461]"
        }`}
      >
        <span className="w-[70%]">{Ans.join("")}</span>

        {/* refresh button */}
        <button 
        onClick={ ()=>{
            if(check == null){
            setChar(shuffleArray(word.en.split("")));
            setStatus(false);
            setCheck(null);
            setAns([]);
            }
        }} 
        className="w-[10%] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Isolation_Mode"
            data-name="Isolation Mode"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12,2.99a9.03,9.03,0,0,1,6.36,2.65L15.986,8.014h5.83a1.146,1.146,0,0,0,1.146-1.146V1.038L20.471,3.529A11.98,11.98,0,0,0,0,12H2.99A9.02,9.02,0,0,1,12,2.99Z" />
            <path d="M21.01,12A8.994,8.994,0,0,1,5.64,18.36l2.374-2.374H1.993a.956.956,0,0,0-.955.955v6.021l2.491-2.491A11.98,11.98,0,0,0,24,12Z" />
          </svg>
        </button>

      </div>
      <div className="flex gap-4 mt-8">
        {word?.en?.length > 0 &&
          word?.en?.split("").map((val, index) => (
            <div className="w-12 h-12 bg-zinc-200  rounded-[5px]">
              {char !== null && ( // เช็คว่าเป็น null หรือไม่ ถ้าเป็น null ไม่ต้องแสดงปุ่ม
                <button
                  className={`${
                    char[index] != null &&
                    "text-xl w-full h-full border-2 border-primary bg-white text-black-2 shadow-[0px_7px_0px_0px_#E4B363] rounded-[5px] transition-all active:translate-y-[3px] cursor-pointer active:shadow-[0px_3px_0px_0px_#E4B363]"
                  }`}
                  onClick={() => {
                    setChar((prevChar) =>
                      prevChar.map((c, i) => (i === index ? null : c))
                    );
                    setAns((prev) => [...prev, char[index]]);
                  }}
                >
                  {char[index]}
                </button>
              )}
              {/* {char.map((Item, i_item)=>(
                    <button key={i_item} className="w-full h-full border-2 bg-white border-primary shadow-[0px_10px_0px_0px_#E4B363] active:shadow-[0px_5px_0px_0px_#E4B363]">
                        {Item[index]}
                    </button>
                ))} */}
            </div>
          ))}
      </div>
      <div className="mt-8">
        <Button
          color="green"
          text={"send"}
          disabled={check == false || check}
          onclick={() => {
            if(Ans.join("") == word.en){setScore(point+1)}
            setCheck(Ans.join("") == word.en);
          }}
        />
      </div>
    </>
  );
}
