import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WordSearch from "../../components/word-search";
import { Button } from "../../components/Button";

export function WordSearchPage() {
  const { type, lesson, quiz } = useParams();

  const [Quiz, setQuiz] = useState([]);
  const [qs, setQs] = useState(0);
  const [score, setScore] = useState(0);

  const [isLoadQuiz, setIsLoadQuiz] = useState(false);
  const [Send, setSend] = useState(false);

  
  useEffect(() => {
    const fetch_data = async () => {
      if (lesson) {
        const response = await fetch(`/data/lessons.json`);
        const data = await response.json();
        setQuiz(data[lesson].quiz[quiz]);
        console.log(data[lesson].quiz[quiz]);
      }
    };

    fetch_data();
  }, []);

  const insert_data = async () => {
    setIsLoadQuiz(true);
    if (lesson) {
      const information = JSON.parse(localStorage.getItem("user"));
      const quiz_name = `[Word Search Game] - ${Quiz.name}`;
      console.log(quiz_name);
      const bind = `s1=${information.std_code}&s2=${information.name}&s3=${information.class}&&s4=${quiz_name}&s5=${score}`;
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbyj0jobHFNmdQp3uPUl7cQ-KiS8Ft2R_t5Pwv7yUS_78d4MluGlzNER1mEWhb_lzaYAvg/exec?${bind}`
      );
      const data = await response.json();
      setSend(true)
    }
  };

  return (
    
    <div
      className={`h-full w-full bg-white rounded-3xl border-4 border-color-black-2 p-[10px] overflow-auto`}
    >
        <section>
        <div className={`flex items-center gap-2`}>
          <button
            className="cursor-pointer"
            onClick={() => {
              window.location = "/";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="arrow-circle-down"
              viewBox="0 0 24 24"
              className="w-8 h-8"
            >
              <path d="M24,12A12,12,0,1,0,12,24,12.013,12.013,0,0,0,24,12ZM8,12a2.993,2.993,0,0,1,.752-1.987c.291-.327.574-.637.777-.84L12.353,6.3a1,1,0,0,1,1.426,1.4L10.95,10.58c-.187.188-.441.468-.7.759a1,1,0,0,0,0,1.323c.258.29.512.57.693.752L13.779,16.3a1,1,0,0,1-1.426,1.4L9.524,14.822c-.2-.2-.48-.507-.769-.833A2.99,2.99,0,0,1,8,12Z" />
            </svg>
          </button>
          <div className="flex flex-col">
            <p>{Quiz.name}</p>
          </div>
        </div>

        <div className="w-full h-0.5 bg-zinc-200 my-4 rounded-full"></div>
      </section>
      {!Send && (
        <>
      <WordSearch words={Quiz.words} point={score} setScore={setScore} />

       <div className="mt-8">
                    <Button
                      text={"send"}
                      onclick={() => {insert_data();}}
                    />
        </div>
   
    </>
    )} 

{Send && (
        <>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl flex justify-center items-center bg-amber-100 p-4 rounded-full text-amber-800">
                  summary
                </h1>

                <p>
                The score has been recorded in the system. Details are as follows:
                </p>

                <p className="flex gap-2 text-lg items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    height="512"
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                    data-name="Layer 1"
                  >
                    <path d="m16 7a2 2 0 0 1 -2-2v-5h-6a5.006 5.006 0 0 0 -5 5v14a5.006 5.006 0 0 0 5 5h8a5.006 5.006 0 0 0 5-5v-12zm-4.289 12.7-1.611 1.639a2.255 2.255 0 0 1 -3.186 0l-.631-.639a1 1 0 0 1 1.434-1.394l.616.633a.249.249 0 0 0 .344-.009l1.612-1.63a1 1 0 1 1 1.422 1.4zm1.289-4.7v-1h-2v1a1 1 0 1 1 -2 0v-4a3 3 0 0 1 6 0v4a1 1 0 1 1 -2 0zm4 6h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 0 2zm-4-10v1h-2v-1a1 1 0 0 1 2 0zm7.7-6h-4.7v-4.7a4.968 4.968 0 0 1 1.879 1.164l1.656 1.658a4.954 4.954 0 0 1 1.165 1.878z" />
                  </svg>
                  [Word Search Game] - {Quiz.name}
                </p>

                <p className="flex gap-2 text-lg items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                  >
                    <path d="m22.305,2.87l-2.281,4.622c-1.639-1.751-3.84-2.96-6.319-3.347l.945-1.915c.679-1.376,2.053-2.23,3.587-2.23h2.283c.692,0,1.324.351,1.689.939.366.588.401,1.31.095,1.931Zm-12.01,1.275l-.945-1.915c-.679-1.376-2.053-2.23-3.587-2.23h-2.26c-.692,0-1.324.351-1.689.938-.366.589-.401,1.311-.095,1.932l2.272,4.607c1.637-1.743,3.833-2.945,6.304-3.331Zm10.706,10.855c0,4.963-4.038,9-9,9S3,19.963,3,15,7.038,6,12,6s9,4.037,9,9Zm-4.843-.59c0-.306-.266-.644-.696-.644h-2.14l-.567-2.175c-.09-.345-.399-.585-.755-.591-.355.007-.665.246-.755.591l-.567,2.175h-2.14c-.43,0-.696.337-.696.644,0,.361.251.665.539.825l1.49.828-.661,1.803c-.128.349-.012.741.285.965h0c.304.229.723.226,1.023-.007l1.482-1.146,1.482,1.146c.301.232.72.235,1.023.007h0c.297-.224.413-.615.285-.965l-.661-1.803,1.49-.828c.288-.16.539-.464.539-.825Z" />
                  </svg>
                  {score}
                </p>

                <div className="mt-8">
              <Button
                text={"to homepage..."}
                onclick={() => {
                  window.location = '/'
                }}
              />
            </div>
              </div>
   
        </>
    )}
    
    </div>
  );
}
