import { useRef, useState } from "react";
import "./App.css";
import { data } from "./assets/data";

function App() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkans = (e, ans) => {
    if (lock == false) {
      if (question.ans == ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if(lock == true){
      if(index == data.length - 1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option)=>{
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
    }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div className="w-[60%] mx-auto">
      <h1 className="text-cyan-500 font-bold uppercase text-2xl mb-3">React Quiz</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="text-semibold mt-4 mb-4 ">
            {index + 1}. {question.question}
          </h2>
          <ul className="w-full flex flex-col gap-3 text-center">
            <li
              className=" w-[80%] text-center mx-auto border p-3 text-semibold text-gray-600"
              ref={Option1}
              onClick={(e) => {
                checkans(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              className=" w-[80%] text-center mx-auto border p-3 text-semibold text-gray-600"
              ref={Option2}
              onClick={(e) => {
                checkans(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              className=" w-[80%] text-center mx-auto border p-3 text-semibold text-gray-600"
              ref={Option3}
              onClick={(e) => {
                checkans(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              className=" w-[80%] text-center mx-auto border p-3 text-semibold text-gray-600"
              ref={Option4}
              onClick={(e) => {
                checkans(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button
            className="w-[30%] text-center mx-auto border shadow-lg p-2 mt-3 bg-cyan-500 opacity-70 text-white hover:bg-white hover:text-cyan-500"
            onClick={next}
          >
            Next
          </button>
          <div>
            {index + 1} of {data.length} question
          </div>
        </div>
      )}

      {result ? (
        <div className="mx-auto mt-10 flex flex-col gap-3">
          <h2 className="font-semibold">
            You Scored {score} out of {data.length}
          </h2>
          <button
            className="w-[30%] text-center mx-auto border shadow-lg p-2 bg-cyan-500 opacity-70 text-white hover:bg-white hover:text-cyan-500"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
