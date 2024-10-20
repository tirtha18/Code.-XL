import React, { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Timer from "../ui/reusables/Timer";
import ProgressBar from "../ui/reusables/ProgressBar";
import rawQuestions from "../../../dummy_dbs/questions.json";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";

const Questions = JSON.parse(JSON.stringify(rawQuestions));
const options = [
  { value: "aptitude", label: "Aptitude" },
  { value: "dbms", label: "DBMS" },
  { value: "os", label: "Operating System" },
  { value: "oops", label: "OOPs" },
];
const questions = [
  {
    question: "If a car travels 60 km in 1.5 hours, what is its average speed?",
    options: { a: "30 km/h", b: "40 km/h", c: "45 km/h", d: "60 km/h" },
    correctAns: "40 km/h",
  },
];
function Result({
  setShowResult,
  attemptedq,
  correctq,
  totalq,
  questionsfetched,
}) {
  const [disableSave, setDisablesave] = useState(false);
  const { user } = useContext(AuthContext);
  const handleSaveResult = () => {
    if (!testName) {
      alert("Enter the name of the Mock Test to continue!");
      return;
    }
    const uploadMocktest = async () => {
      try {
        const response = await axios.post(
          "https://code-xl.onrender.com/api/uploadMock",
          {
            user_id: user._id,
            name: testName,
            questions: questionsfetched,
            total_q: totalq.toString(),
            attempted_q: attemptedq.toString(),
            correct_q: correctq.toString(),
          }
        );
        console.log(response);
        setDisablesave(true);
        toast.success("Assessment Results Uploaded Successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Upload failed!");
      }
    };
    uploadMocktest();
  };
  const [testName, setTestName] = useState("");
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen z-50 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-800 border-zinc-600 border  w-[40%] rounded-lg shadow-lg text-zinc-300 flex-col flex items-center">
        <div className="text-lg font-semibold p-4 border-b border-zinc-600 text-zinc-300 w-full">
          <div className="ml-4">Report Card</div>
          <button
            onClick={() => setShowResult(false)}
            className="absolute top-4 right-4"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6 flex-col w-[90%] h-[90%]">
          <div className=" text-zinc-300 bg-zinc-600 rounded-lg shadow-sm shadow-zinc-600 p-4">
            <div className="flex flex-row w-full justify-between">
              <h1>Attemted:</h1>
              <p className="ml-2 bg-zinc-800 px-2 text-zinc-400 py-0.5 text-sm rounded-lg">
                {attemptedq + "/" + totalq}
              </p>
            </div>
            <div className=" mt-3">
              <ProgressBar value={Math.floor((attemptedq / totalq) * 100)} />
            </div>
          </div>
          <div className=" text-zinc-300 bg-zinc-700 rounded-lg  p-4 mt-4 mb-6">
            <div className="flex flex-row w-full justify-between">
              <h1>Total Score:</h1>
              <p className="ml-2 bg-zinc-800 px-2 text-zinc-400 py-0.5 text-sm rounded-lg">
                {correctq + "/" + totalq}
              </p>
            </div>
            <div className=" mt-3">
              <ProgressBar value={Math.floor((correctq / totalq) * 100)} />
            </div>
            <div className="flex flex-row w-full justify-between mt-3">
              <h1>Accuracy</h1>
            </div>
            <div className=" mt-3">
              <ProgressBar
                value={
                  attemptedq !== 0
                    ? Math.floor((correctq / attemptedq) * 100)
                    : 0
                }
              />
            </div>
          </div>
          <div className=" text-zinc-400 bg-zinc-700 rounded-lg  p-4 mt-4 mb-6">
            <h1 className="ml-1">Name your test:</h1>
            <input
              onChange={(e) => {
                setTestName(e.target.value);
              }}
              className="bg-zinc-800 rounded-lg w-full p-1 px-2 text-sm mt-2"
              type="text"
              value={testName}
              placeholder="Example: Mock Test A"
            />
          </div>
          <div className="w-full space-x-2 mb-6 flex flex-row">
            {!disableSave && (
              <button
                onClick={() => {
                  handleSaveResult();
                }}
                className="px-2 py-1 bg-green-600 rounded-lg ml-auto hover:bg-green-800"
              >
                <h1>Save Results</h1>
              </button>
            )}
            <button
              className="px-3 py-1 bg-zinc-600 rounded-lg  ml-auto hover:bg-zinc-900  "
              onClick={() => {
                setShowResult(false);
                toast("Correct Answers are displayed below each question!");
              }}
            >
              <h1>Show Answers</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function AssesmentQuestions({
  duration,
  difficulty,
  topics,
  number,
  setShowAssessment,
  setDuration,
  setDifficulty,
  setTopics,
  setNumber,
}) {
  const [questionsfetched, setQuestionsfetched] = useState(questions);
  const [questionShow, setQuestionShow] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [quesno, setQuesno] = useState("");
  const [timesup, setTimesup] = useState(false);
  const [ShowResult, setShowResult] = useState(false);
  const [submitHide, setSubmithide] = useState(false);
  const [correctq, setCorrectq] = useState(0);
  const [attemptedq, setAttemptedq] = useState(0);
  const [totalq, setTotalq] = useState(0);
  const [navbuttons, setNavbuttons] = useState([]);
  const temp = [];
  useEffect(() => {
    if (timesup) handleSubmit();
  }, [timesup]);
  useEffect(() => {
    const allQues = JSON.parse(JSON.stringify(Questions.questions));
    const filteredQuestions = allQues.filter(
      (question) =>
        topics.includes(question.topic) &&
        question.difficulty === difficulty.toLowerCase()
    );
    const ques = filteredQuestions.slice(0, number);
    for (let i = 0; i < ques.length; i++) temp.push(false);
    if (temp.length > 0) temp[0] = true;
    setNavbuttons(temp);
    setQuestionsfetched(ques);
    setSelectedQuestion(ques[0]);
    setQuesno("1");
    setQuestionShow(true);
  }, [duration, difficulty, topics, number]);
  const handleOptionclick = (e, index) => {
    const temp = [...questionsfetched];
    temp[index - 1].selectedOption = temp[index - 1].options[e.target.value];
    setQuestionsfetched(temp);
  };

  const handleNavigation = (index) => {
    const temp = [...navbuttons];
    for (let i = 0; i < temp.length; i++) {
      if (i != index) temp[i] = false;
      else temp[i] = true;
      setNavbuttons(temp);
    }
  };
  useEffect(() => {
    const correctQues = questionsfetched.filter((question) => {
      return question.correctAns === question.selectedOption;
    });
    const attemptedQues = questionsfetched.filter((question) => {
      return question.selectedOption !== "";
    });
    setTotalq(questionsfetched.length);
    setAttemptedq(attemptedQues.length);
    setCorrectq(correctQues.length);
  }, [questionsfetched, totalq, attemptedq, correctq]);
  const handleSubmit = () => {
    setShowResult(true);
    setSubmithide(true);
    setTimesup(true);
  };
  return (
    <div className="h-full w-full flex flex-row justify-between items-center overflow-auto bg-black">
      {ShowResult && (
        <Result
          setShowResult={setShowResult}
          correctq={correctq}
          attemptedq={attemptedq}
          totalq={totalq}
          questionsfetched={questionsfetched}
        />
      )}
      <div className="w-[60%] bg-zinc-900 rounded-lg h-[70%] p-4 ">
        {questionShow && (
          <div className="mx-2 my-1" key={quesno}>
            <div className="">
              {quesno + ") "}
              {selectedQuestion.question}
            </div>
            <div className="mt-4">
              <input
                type="radio"
                name="option"
                value="a"
                onChange={(e) => handleOptionclick(e, quesno)}
              />{" "}
              {selectedQuestion.options.a}
            </div>
            <div
              className="mt-2"
              onChange={(e) => handleOptionclick(e, quesno)}
            >
              <input type="radio" name="option" value="b" />{" "}
              {selectedQuestion.options.b}
            </div>
            <div
              className="mt-2"
              onChange={(e) => handleOptionclick(e, quesno)}
            >
              <input type="radio" name="option" value="c" />{" "}
              {selectedQuestion.options.c}
            </div>
            <div
              className="mt-2"
              onChange={(e) => handleOptionclick(e, quesno)}
            >
              <input type="radio" name="option" value="d" />{" "}
              {selectedQuestion.options.d}
            </div>
            {timesup && (
              <div className="mt-2 text-zinc-500">
                Correct answer: {selectedQuestion.correctAns}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-[70%] w-[20%] rounded-lg flex flex-col">
        <div className="text-center text-xl">
          <div className="py-1 bg-white text-black rounded-lg mb-5 font-semibold">
            <Timer
              initialMinutes={duration}
              initialSeconds={0}
              setTimesup={setTimesup}
              timesup={timesup}
            />
          </div>
        </div>
        <div
          className="flex-grow overflow-y-scroll"
          style={{
            overflowY: "scroll",
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
            scrollbarColor: "#10B981 transparent",
          }}
        >
          <div h-full>
            <div className=" h-full grid grid-cols-4 place-items-center gap-y-2 gap-x-2 ">
              {questionsfetched.map((question, index) => (
                <button
                  className={`text-zinc-200 ${
                    navbuttons[index]
                      ? "bg-zinc-200 text-zinc-900"
                      : question.selectedOption === ""
                      ? "bg-zinc-900"
                      : "bg-violet-600"
                  }  flex items-center py-2 w-12 justify-center rounded-lg`}
                  key={index}
                  onClick={() => {
                    setQuestionShow(true);
                    setSelectedQuestion(question);
                    setQuesno(index + 1);
                    handleNavigation(index);
                    console.log(navbuttons);
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full mt-5 flex-row flex space-x-3">
          <button
            onClick={() => handleSubmit()}
            className="text-center text-white text-lg  w-full bg-green-600 hover:bg-green-800  rounded-lg py-1"
          >
            {submitHide ? <h1>Score</h1> : <h1>Submit</h1>}
          </button>
          <button
            onClick={() => {
              setShowAssessment(false);
              setDifficulty(null);
              setTopics([]);
              setDuration(null);
              setNumber(null);
            }}
            className="text-center text-white text-lg  w-full bg-red-600 hover:bg-red-800  rounded-lg py-1"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
export default function MockAssessment() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [duration, setDuration] = useState(null);
  const [number, setNumber] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [topics, setTopics] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTopics((prev) => [...prev, value]);
    } else {
      setTopics((prev) => prev.filter((topic) => topic !== value));
    }
  };

  return (
    <div className="flex h-full w-full justify-center items-center overflow-scroll">
      <div className="flex items-center w-[90%] h-[90%] justify-center">
        <div className="text-zinc-300 h-full w-full flex flex-col ">
          <div>
            <h1 className="text-3xl font-bold">
              Custom Online Mock Assessment
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              This feature enables users to create meticulously crafted mock
              tests modeled after those used by leading software companies.
              Leveraging premier resources, it facilitates the design of
              assessments covering key subjects such as Database Management
              Systems (DBMS), Operating Systems (OS), and Aptitude, ensuring
              comprehensive preparation and assessment for aspiring
              professionals.
            </p>
          </div>
          {!showAssessment && (
            <div className="w-full rounded-lg mt-16 flex lg:flex-row flex-col items-center lg:h-[190px] lg:space-y-0 space-y-4">
              <div className="pl-6 py-4 w-full lg:w-[20%] bg-zinc-900 rounded-xl h-full">
                {options.map((option) => (
                  <label key={option.value} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox-group"
                      value={option.value}
                      className="form-checkbox"
                      onChange={handleCheckboxChange}
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
              <div className="lg:ml-4 rounded-xl lg:w-[60%] w-full lg:h-full lg:bg-black bg-zinc-800  flex text-zinc-400 flex-col items-center ">
                <div className="w-full h-full rounded-xl bg-zinc-800 lg:mb-0 mb-3">
                  <h1 className="mx-6 mt-6 mb-5 capitalize">
                    Select your preferences:
                  </h1>
                  <div className="flex flex-row mx-5 w-full space-x-2">
                    <div className="w-[40%] bg-zinc-950 rounded-2xl border border-zinc-800">
                      <select
                        name="number-of-questions"
                        id="number-of-questions"
                        className="w-[95%] bg-zinc-950 rounded-2xl py-2 pl-5 text-sm font-light"
                        onChange={(e) => {
                          setNumber(
                            e.target.value !== "0" ? e.target.value : null
                          );
                        }}
                      >
                        <option value="0">No of Questions:</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                      </select>
                    </div>
                    <div className="w-[40%] bg-zinc-950 rounded-2xl border border-zinc-800">
                      <select
                        name="duration"
                        id="duration"
                        className="w-[95%] bg-zinc-950 rounded-2xl py-2 pl-5 text-sm font-light"
                        onChange={(e) => {
                          setDuration(
                            e.target.value !== "Duration:"
                              ? e.target.value
                              : null
                          );
                        }}
                      >
                        <option value="Duration:">Duration:</option>
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  className="hover:cursor-pointer capitalize lg:h-[25%] w-full bg-gradient-to-br from-green-700 to-green-600 text-zinc-200 mx-auto mt-4 px-3 flex items-center justify-center lg:py-0 py-0.5 l rounded-b-lg lg:rounded-2xl font-semibold text-lg"
                  onClick={() => {
                    if (
                      duration !== null &&
                      number !== null &&
                      difficulty !== null &&
                      topics.length !== 0
                    ) {
                      toast.success("Best of Luck");
                      setShowAssessment(true);
                    } else {
                      toast.error("Fill in all the details!");
                    }
                  }}
                >
                  Start your mock assessment
                </button>
              </div>
              <div className="pl-6 lg:w-[20%] w-full lg:ml-4 bg-zinc-900 rounded-xl  lg:h-full text-zinc-400">
                <div className="mt-6">Difficulty:</div>
                <div className="mt-4 mb-4 w-[95%] flex flex-col items-center justify-center">
                  <label className="flex flex-row mb-3 w-full ">
                    <input
                      type="radio"
                      name="difficulty"
                      value="easy"
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span className="ml-4 text-center px-2 rounded-2xl bg-green-800 text-green-300 w-full lg:w-[65%]">
                      Easy
                    </span>
                  </label>
                  <label className="flex flex-row mb-3 w-full">
                    <input
                      type="radio"
                      name="difficulty"
                      value="medium"
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span className="ml-4 text-center px-2 rounded-2xl bg-yellow-800 text-yellow-300 lg:w-[65%] w-full">
                      Medium
                    </span>
                  </label>
                  <label className="flex flex-row w-full">
                    <input
                      type="radio"
                      name="difficulty"
                      value="hard"
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span className="ml-4 text-center px-2 rounded-2xl bg-red-800 text-red-300 lg:w-[65%] w-full ">
                      Hard
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
          {showAssessment && (
            <AssesmentQuestions
              duration={duration}
              topics={topics}
              difficulty={difficulty}
              number={number}
              setShowAssessment={setShowAssessment}
              setDuration={setDuration}
              setDifficulty={setDifficulty}
              setTopics={setTopics}
              setNumber={setNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
}
