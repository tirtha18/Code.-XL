import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Timer from "../ui/reusables/Timer";
import rawQuestions from "../../../dummy_dbs/questions.json";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  LogOut,
  Send,
  X,
  Save,
  Eye,
  Trophy,
  Target,
} from "lucide-react";
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
const Result = ({
  setShowResult,
  attemptedq,
  correctq,
  totalq,
  questionsfetched,
}) => {
  const [disableSave, setDisablesave] = useState(false);
  const [testName, setTestName] = useState("");
  const { user } = useContext(AuthContext);

  const handleSaveResult = async () => {
    if (!testName) {
      toast.error("Please enter a name for your test!");
      return;
    }

    try {
      await axios.post("https://code-xl.onrender.com/api/uploadMock", {
        user_id: user._id,
        name: testName,
        questions: questionsfetched,
        total_q: totalq.toString(),
        attempted_q: attemptedq.toString(),
        correct_q: correctq.toString(),
      });
      setDisablesave(true);
      toast.success("Assessment Results Uploaded Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };

  const ProgressBar = ({ value, color }) => (
    <div className="w-full bg-zinc-800/50 rounded-full h-3 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  );

  const StatCard = ({ title, value, total, color, icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6 hover:border-green-500/20 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-zinc-400 text-sm mb-1">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              {value}
            </span>
            <span className="text-zinc-500">/ {total}</span>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <ProgressBar
        value={Math.floor((value / total) * 100)}
        color={color.replace("bg-", "bg-opacity-20 bg-")}
      />
    </motion.div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800/50 
                    w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden "
        >
          {/* Header */}
          <div className="relative border-b border-zinc-800/50 p-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Assessment Results
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowResult(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 h-[80vh] overflow-auto">
            {/* Stats Grid */}
            <div className="grid gap-4">
              <StatCard
                title="Questions Attempted"
                value={attemptedq}
                total={totalq}
                color="bg-blue-500"
                icon={CheckCircle}
              />
              <StatCard
                title="Correct Answers"
                value={correctq}
                total={totalq}
                color="bg-green-500"
                icon={Trophy}
              />
              <StatCard
                title="Accuracy"
                value={attemptedq !== 0 ? correctq : 0}
                total={attemptedq !== 0 ? attemptedq : 1}
                color="bg-purple-500"
                icon={Target}
              />
            </div>

            {/* Test Name Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6 hover:border-green-500/20 transition-all duration-300"
            >
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Name your test
              </label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Example: Mock Test A"
                className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-lg px-4 py-2.5 text-zinc-200 
                          placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 transition-colors"
              />
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {!disableSave && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveResult}
                  className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl py-3 px-4
                            font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 
                            flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Results
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowResult(false);
                  toast.success(
                    "Correct answers are displayed below each question!"
                  );
                }}
                className="flex-1 bg-zinc-800/50 text-zinc-100 rounded-xl py-3 px-4 font-medium 
                          transition-all duration-300 hover:bg-zinc-700/50 flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Show Answers
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

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
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="lg:min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex lg:flex-row flex-col justify-between items-start p-8 gap-8">
      {ShowResult && (
        <Result
          setShowResult={setShowResult}
          correctq={correctq}
          attemptedq={attemptedq}
          totalq={totalq}
          questionsfetched={questionsfetched}
        />
      )}

      {/* Question Section */}
      <motion.div className="lg:w-[65%] w-full" {...fadeIn}>
        {/* Question Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Question {quesno} of {totalq}
          </h2>
          <div className="flex gap-4 mt-2 text-zinc-400">
            <span className="flex items-center gap-1">
              <Clock size={16} className="text-green-500" />
              {duration} minutes
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle size={16} className="text-green-500" />
              {attemptedq} attempted
            </span>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          className="bg-zinc-900/70 backdrop-blur-lg rounded-2xl border border-zinc-800/50 hover:border-green-500/20 transition-all duration-500 shadow-lg shadow-green-500/5 overflow-hidden"
          whileHover={{ scale: 1.01 }}
        >
          {questionShow && (
            <div className="p-8" key={quesno}>
              {/* Question Text */}
              <div className="text-lg text-zinc-100 font-medium leading-relaxed">
                <span className="text-xl text-green-400 font-bold mr-2">
                  Q{quesno}.
                </span>
                {selectedQuestion.question}
              </div>

              {/* Options */}
              <div className="space-y-4 mt-8">
                {["a", "b", "c", "d"].map((option) => (
                  <motion.label
                    key={option}
                    className={`
                      flex items-center space-x-4 p-4 rounded-xl border 
                      ${
                        selectedQuestion.selectedOption ===
                        selectedQuestion.options[option]
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-zinc-800/50 hover:border-green-400/30"
                      }
                      cursor-pointer transition-all duration-300 hover:bg-zinc-800/30 group
                    `}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        onChange={(e) => handleOptionclick(e, quesno)}
                        className="w-5 h-5 appearance-none rounded-full border-2 border-zinc-600 checked:border-green-500 transition-all duration-300
                        checked:before:content-[''] checked:before:absolute checked:before:w-3 checked:before:h-3 checked:before:bg-green-500
                        checked:before:rounded-full checked:before:top-1 checked:before:left-1"
                      />
                    </div>
                    <span className="text-zinc-300 group-hover:text-zinc-100 transition-colors duration-300 flex-1">
                      {selectedQuestion.options[option]}
                    </span>
                  </motion.label>
                ))}
              </div>

              {/* Correct Answer Display */}
              {timesup && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                >
                  <span className="text-zinc-400">Correct answer: </span>
                  <span className="text-green-400 font-semibold">
                    {selectedQuestion.correctAns}
                  </span>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Side Panel */}
      <motion.div
        className="lg:w-[32%] w-full lg:sticky lg:top-8 space-y-6"
        {...fadeIn}
      >
        {/* Timer Card */}
        <div className="bg-zinc-900/70 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-6 shadow-lg">
          <div className="bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-xl p-6">
            <div className="text-center">
              <h3 className="text-zinc-400 mb-2">Time Remaining</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                <Timer
                  initialMinutes={duration}
                  initialSeconds={0}
                  setTimesup={setTimesup}
                  timesup={timesup}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="bg-zinc-900/70 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-6 shadow-lg">
          <h3 className="text-zinc-400 mb-4">Question Navigation</h3>
          <div className="grid grid-cols-5 gap-2 max-h-[240px] overflow-y-auto custom-scrollbar pr-2">
            {questionsfetched.map((question, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setQuestionShow(true);
                  setSelectedQuestion(question);
                  setQuesno(index + 1);
                  handleNavigation(index);
                }}
                className={`
                  h-10 w-10 rounded-lg font-medium transition-all duration-300
                  ${
                    navbuttons[index]
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg shadow-green-500/20"
                      : question.selectedOption === ""
                      ? "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                  }
                `}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl py-4 px-6 font-medium 
            transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2"
          >
            {submitHide ? (
              <>
                <CheckCircle size={20} />
                View Score
              </>
            ) : (
              <>
                <Send size={20} />
                Submit
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setShowAssessment(false);
              setDifficulty(null);
              setTopics([]);
              setDuration(null);
              setNumber(null);
            }}
            className="flex-1 bg-zinc-800/50 text-zinc-100 rounded-xl py-4 px-6 font-medium 
            transition-all duration-300 hover:bg-zinc-700/50 flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            Exit
          </motion.button>
        </div>
      </motion.div>
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
    <div className="flex h-full w-full bg-zinc-950 justify-center items-center overflow-scroll">
      <div className="flex items-center m-4 lg:m-8 h-[90%] justify-center">
        <div className="text-zinc-300 h-full w-full flex flex-col">
          <div className="mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              Custom Online Mock Assessment
            </h1>
            <p className="mt-4 text-zinc-400 text-md leading-relaxed">
              This feature enables users to create meticulously crafted mock
              tests modeled after those used by leading software companies.
              Leveraging premier resources, it facilitates the design of
              assessments covering key subjects such as{" "}
              <span className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium">
                Database Management Systems (DBMS)
              </span>
              ,{" "}
              <span className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium">
                Operating Systems (OS)
              </span>
              , and{" "}
              <span className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium">
                Aptitude
              </span>
              , ensuring comprehensive preparation and assessment for aspiring
              professionals.
            </p>
          </div>

          {!showAssessment && (
            <div className="w-full rounded-lg mt-12 flex lg:flex-row flex-col items-center lg:h-[190px] lg:space-y-0 space-y-4">
              {/* Topics Section */}
              <div className="pl-6 py-4 w-full lg:w-[20%] bg-zinc-900 rounded-xl h-full border border-zinc-800/50">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center mb-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      name="checkbox-group"
                      value={option.value}
                      className="form-checkbox h-4 w-4 text-green-500 border-zinc-600 rounded 
                               focus:ring-1 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-zinc-900"
                      onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 group-hover:text-green-400 transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Center Settings Section */}
              <div className="lg:ml-4 rounded-xl lg:w-[60%] w-full lg:h-full flex text-zinc-400 flex-col">
                <div className="w-full h-full rounded-xl bg-zinc-900 lg:mb-0 mb-3 border border-zinc-800/50">
                  <h2 className="mx-6 mt-6 mb-5 capitalize text-zinc-300 font-medium">
                    Select your preferences:
                  </h2>
                  <div className="flex flex-row mx-5 w-full space-x-2">
                    <div className="w-[40%] relative">
                      <select
                        name="number-of-questions"
                        id="number-of-questions"
                        className="w-full bg-zinc-950 rounded-xl py-2.5 pl-5 pr-10 text-sm 
                                 border border-zinc-800 appearance-none cursor-pointer
                                 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                        onChange={(e) =>
                          setNumber(
                            e.target.value !== "0" ? e.target.value : null
                          )
                        }
                      >
                        <option value="0">No of Questions:</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-zinc-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="w-[40%] relative">
                      <select
                        name="duration"
                        id="duration"
                        className="w-full bg-zinc-950 rounded-xl py-2.5 pl-5 pr-10 text-sm 
                                 border border-zinc-800 appearance-none cursor-pointer
                                 focus:outline-none focus:ring- focus:ring-green-500 focus:border-transparent"
                        onChange={(e) =>
                          setDuration(
                            e.target.value !== "Duration:"
                              ? e.target.value
                              : null
                          )
                        }
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
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-zinc-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="hover:cursor-pointer capitalize lg:h-[25%] w-full bg-gradient-to-r from-green-600 to-green-500 
                           hover:from-green-500 hover:to-green-400 text-zinc-200 mx-auto mt-4 px-3 flex items-center 
                           justify-center lg:py-0 py-3 rounded-xl font-medium text-lg transition-all duration-300 
                           shadow-lg shadow-green-500/20"
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
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Start your mock assessment
                </button>
              </div>

              {/* Difficulty Section */}
              <div className="pl-6 lg:w-[20%] w-full lg:ml-4 bg-zinc-900 rounded-xl lg:h-full text-zinc-400 border border-zinc-800/50">
                <div className="mt-3 font-medium text-zinc-300">
                  Difficulty:
                </div>
                <div className="my-4  flex flex-col items-center justify-center">
                  {[
                    {
                      value: "easy",
                      label: "Easy",
                      bg: "bg-green-500/10",
                      text: "text-green-400",
                      hover: "hover:bg-green-500/20",
                    },
                    {
                      value: "medium",
                      label: "Medium",
                      bg: "bg-yellow-500/10",
                      text: "text-yellow-400",
                      hover: "hover:bg-yellow-500/20",
                    },
                    {
                      value: "hard",
                      label: "Hard",
                      bg: "bg-red-500/10",
                      text: "text-red-400",
                      hover: "hover:bg-red-500/20",
                    },
                  ].map((level) => (
                    <label
                      key={level.value}
                      className="flex flex-row mb-3 w-full cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={level.value}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-4 h-4 text-green-500 border-zinc-600
                                  focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-zinc-900"
                      />
                      <span
                        className={`ml-4 text-center px-2 py-1 rounded-xl ${level.bg} ${level.text} 
                                     w-full lg:w-[70%] transition-colors ${level.hover}`}
                      >
                        {level.label}
                      </span>
                    </label>
                  ))}
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
