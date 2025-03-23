import { useEffect, useState } from "react";

export function Matching({ data, point, setScore }) {
    const [selectA, setSelectA] = useState(null);
    const [selectB, setSelectB] = useState(null);
    const [choiceA, setChoiceA] = useState([]);
    const [choiceB, setChoiceB] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);

    useEffect(() => {
        setChoiceA(shuffleArray([...data])); // สุ่มลำดับ A
        setChoiceB(shuffleArray([...data])); // สุ่มลำดับ B
    }, [data]);

    const select = (role, word) => {
        if (role === "a") {
            setSelectA(word);
        } else {
            setSelectB(word);
        }
    };

    useEffect(() => {
        if (selectA && selectB) {
            if (selectA === selectB) {
                // ถ้าเลือก A กับ B ตรงกัน
                setMatchedPairs((prev) => [...prev, selectA]); // บันทึกคำที่จับคู่ได้
                setScore(point + 1); // เพิ่มคะแนน

                // ลบคำที่จับคู่แล้วออกจากตัวเลือก
                setChoiceA((prev) => prev.filter((item) => item.en !== selectA));
                setChoiceB((prev) => prev.filter((item) => item.en !== selectB));
            }
            // รีเซ็ตค่าหลังจาก 0.5 วินาที
            setTimeout(() => {
                setSelectA(null);
                setSelectB(null);
            }, 500);
        }
    }, [selectA, selectB]);

    return (
        <div className="w-full flex">
            {point}
            {/* ตัวเลือก A */}
            <div className="w-[50%] flex flex-col gap-4">
                A:
                {choiceA.map((val, index) => (
                    <button
                        key={index}
                        className={`w-2/3 bg-zinc-200 p-4 rounded-md text-2xl cursor-pointer 
                        ${selectA === val.en ? "border-4 border-primary" : ""}
                        ${matchedPairs.includes(val.en) ? "opacity-50" : ""}`}
                        onClick={() => select("a", val.en)}
                        disabled={matchedPairs.includes(val.en)}
                    >
                        {val.en}
                    </button>
                ))}
            </div>

            {/* ตัวเลือก B */}
            <div className="w-[50%] flex flex-col gap-4">
                B:
                {choiceB.map((val,index) => (
                    <button
                        key={index}
                        className={`w-full bg-zinc-200 overflow-hidden rounded-md text-2xl cursor-pointer 
                        ${selectB === val.en ? "border-4 border-primary" : ""}
                        ${matchedPairs.includes(val.en) ? "opacity-50" : ""}`}
                        onClick={() => select("b", val.en)}
                        disabled={matchedPairs.includes(val.en)}
                    >
                        <img src={val.image_url} alt={val.en} className="w-full h-full object-cover object-center" />
                    </button>
                ))}
            </div>
        </div>
    );
}

// ฟังก์ชันสุ่มค่าแบบไม่ทำลายต้นฉบับ
const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let r = 1; r <= 3; r++) {
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
    }
    return shuffled;
};
