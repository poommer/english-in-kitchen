import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "../../components/Tap";
import { Multiple_choice, Unscramble } from "../../components/Multiple_choice";
import { Button } from "../../components/Button";
import { ProgressTab } from "../../components/Progress";
import { Matching } from "../../components/Matching";

export function Lesson() {
  const category = ["multiple choice", "matching", "unscramble word"];
  const [Quiz, setQuiz] = useState([]);
  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await fetch("/data/lessons.json");
        const data = await response.json();
        setQuiz(data);
        console.log("Tab data: ", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch_data();
  }, []);

  const [IsMenu, setIsMenu] = useState(0);
  return (
    <div
      className={`h-full w-full bg-white rounded-3xl border-4 border-color-black-2 overflow-auto`}
    >
      <div className="p-2 bg-amber-100 flex items-center justify-between">
        Welcome, login By {JSON.parse(localStorage.getItem("user")).name} [
        {JSON.parse(localStorage.getItem("user")).std_code}]
        <button
          onClick={() => {
            localStorage.clear();
            window.location = "/";
          }}
          className="cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-red-400"
          >
            <path d="M22.887,11.43c-.132-.322-1.427-3.21-6.024-5.373-.75-.353-1.643-.03-1.996,.719-.353,.75-.031,1.644,.719,1.996,1.193,.561,2.092,1.167,2.762,1.728H9.173c-.829,0-1.5,.671-1.5,1.5s.671,1.5,1.5,1.5h9.174c-.67,.561-1.569,1.167-2.762,1.728-.75,.353-1.071,1.246-.719,1.996,.256,.543,.795,.862,1.358,.862,.214,0,.431-.046,.638-.143,4.543-2.137,5.879-5.031,6.017-5.354,.157-.37,.16-.788,.007-1.159Z" />
            <path d="M12.338,16.177c-.826-.085-1.555,.532-1.63,1.357-.063,.689-.125,1.322-.173,1.803-.707,.238-1.832,.536-3.03,.536-1.176,0-2.327-.308-3.05-.55-.163-1.422-.454-4.375-.454-7.322s.292-5.904,.455-7.327c.715-.24,1.857-.545,3.05-.545,1.203,0,2.325,.297,3.03,.535,.049,.48,.111,1.113,.174,1.804,.075,.825,.795,1.431,1.631,1.356,.825-.076,1.432-.806,1.356-1.631-.139-1.513-.272-2.755-.272-2.755-.056-.519-.377-.971-.848-1.195-.096-.046-2.379-1.115-5.071-1.115-2.644,0-4.963,1.064-5.061,1.109-.462,.215-.784,.65-.854,1.156-.024,.175-.59,4.33-.59,8.607s.565,8.432,.59,8.606c.07,.509,.396,.947,.864,1.16,.099,.045,2.455,1.105,5.051,1.105,2.686,0,4.974-1.069,5.07-1.115,.472-.224,.794-.677,.85-1.197,0,0,.132-1.244,.271-2.753,.076-.825-.532-1.555-1.357-1.63Z" />
          </svg>
        </button>
      </div>
      <div className={`p-[10px] text-4xl uppercase`}>lessons All</div>
      <Tab IsMenu={IsMenu} setIsMenu={setIsMenu} />
      {/* ✅ ส่ง setIsMenu ไปให้ Tab */}
      <main className={`p-[10px] flex flex-col gap-4`}>
        {category.map((sec_name, sec_index) => (
          <section key={sec_index} className="bg-gray-300 p-4">
            <h1 className="text-2xl">{sec_name}</h1>
            <div className="flex flex-col text-xl gap-2 mt-2">
              {Quiz.length > 0 &&
               ( Quiz[IsMenu].quiz.map((val, index) => {
                  return (
                    <a
                      key={index}
                      className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-md"
                      href={`/lesson/${sec_name.replaceAll(
                        " ",
                        "_"
                      )}/${IsMenu}/${index}`}
                    >
                      <div className="flex flex-col">
                        <p>{val.name}</p>
                        {`${val.words.length} questions, ${
                          val.words.length * val.score
                        } points`}
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="arrow-circle-down"
                        viewBox="0 0 24 24"
                        className="w-8 h-8"
                      >
                        <path d="M0,12A12,12,0,1,0,12,0,12.013,12.013,0,0,0,0,12Zm15.414-1.414a2,2,0,0,1,0,2.828l-4.673,4.673L9.327,16.673,14,12,9.289,7.288,10.7,5.874Z" />
                      </svg>
                    </a>
                  );
                })
                )}
            </div>
          </section>
        ))}

<section className="bg-gray-300 p-4">
            <h1 className="text-2xl">word search</h1>
            <div className="flex flex-col text-xl gap-2 mt-2">
            {Quiz.length > 0 &&
               ( Quiz[IsMenu].quiz.map((val, index) => {
                  return (
                    <a
                      key={index}
                      className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-md"
                      href={`/lesson/word-search/${IsMenu}/${index}`}
                    >
                      <div className="flex flex-col">
                        <p>{val.name}</p>
                        {`${val.words.length} questions, ${
                          val.words.length * val.score
                        } points`}
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="arrow-circle-down"
                        viewBox="0 0 24 24"
                        className="w-8 h-8"
                      >
                        <path d="M0,12A12,12,0,1,0,12,0,12.013,12.013,0,0,0,0,12Zm15.414-1.414a2,2,0,0,1,0,2.828l-4.673,4.673L9.327,16.673,14,12,9.289,7.288,10.7,5.874Z" />
                      </svg>
                    </a>
                  );
                })
                )}
            </div>
</section>
      </main>
    </div>
  );
}

export function Detail() {
  const { type, lesson, quiz } = useParams();

  const [Quiz, setQuiz] = useState([]);
  const [qs, setQs] = useState(0);
  const [score, setScore] = useState(0);

  const [isLoadQuiz, setIsLoadQuiz] = useState(false);

  useEffect(() => {
    const fetch_data = async () => {
      if (lesson) {
        const response = await fetch(`/data/lessons.json`);
        const data = await response.json();
        setQuiz(data[lesson].quiz[quiz]);
        console.log(data[lesson]);
      }
    };

    fetch_data();
  }, []);

  const insert_data = async () => {
    setIsLoadQuiz(true);
    if (lesson) {
      const information = JSON.parse(localStorage.getItem("user"));
      const quiz_name = `[${type.replaceAll("_", " ")}] - ${Quiz.name}`;
      console.log(quiz_name);
      const bind = `s1=${information.std_code}&s2=${information.name}&s3=${information.class}&&s4=${quiz_name}&s5=${score}`;
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbyj0jobHFNmdQp3uPUl7cQ-KiS8Ft2R_t5Pwv7yUS_78d4MluGlzNER1mEWhb_lzaYAvg/exec?${bind}`
      );
      const data = await response.json();
      if( type == "matching"){
        setQs(Quiz?.words?.length-1)
      }
      setIsLoadQuiz(false);
      console.log(data);
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
            {qs}
            {Quiz?.words?.length}
            <small className="text-sm">{type.replaceAll("_", " ")}</small>
          </div>
        </div>

        <div className="w-full h-0.5 bg-zinc-200 my-4 rounded-full"></div>
      </section>
      {/* {qs + 1} */}

      {(isLoadQuiz || !lesson) && <>loading...</>}

      {!isLoadQuiz && lesson && (
        <>
          {/* score = {score} */}
          <main className={`flex flex-col gap-4`}>
            {qs+1 == Quiz?.words?.length && (
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
                  [{type.replaceAll("_", " ")}] - {Quiz.name}
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
                  {score} / {Quiz.words.length}
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
            )}

            {qs < Quiz?.words?.length - 1 && type != "matching" && (
              <>
                <div class="w-full h-full bg-zinc-100 border-2 border-second rounded-full overflow-hidden">
                  <div
                    class="w-2/12 h-full bg-second-2 ease-out duration-75 transition-all flex justify-center items-center"
                    style={{
                      width: `${((qs + 1) * 100) / Quiz.words?.length}%`,
                    }}
                  >
                    {`${qs + 1}/${Quiz.words?.length}`}
                  </div>
                </div>
                <div className="w-full h-[220px]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={
                      (Quiz.words?.length > 0 && Quiz.words[qs].image_url) ||
                      "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
                    }
                    alt=""
                  />
                </div>
                {type == "multiple_choice" && (
                  <Multiple_choice
                    data={Quiz.words}
                    word={qs}
                    point={score}
                    setScore={setScore}
                  />
                )}
                {type == "unscramble_word" && (
                  <Unscramble
                    word={Quiz?.words?.length > 0 && Quiz.words[qs]}
                    point={score}
                    setScore={setScore}
                  />
                )}
              </>
            )}

            {qs < Quiz?.words?.length - 1 && type == "matching" && (
              <Matching 
              data={Quiz.words}
              point={score}
              setScore={setScore}
              />
            )}
          </main>

          {qs < Quiz?.words?.length - 1 && (
            <div className="mt-8">
              <Button
                text={type == "matching" ? "send" : qs+1 < Quiz?.words?.length  ? "next" :  "send"}
                onclick={() => {
                  if(type == "matching"){
                    insert_data();
                  }else if(qs+1 <= Quiz?.words?.length){
                     setQs(qs + 1) 
                  }else{
                      setQs(qs + 1)
                      insert_data();
                  }
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
