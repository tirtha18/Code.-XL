import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Star } from "lucide-react";
import osData from "../../../dummy_dbs/os.json";
import dbmsdata from "../../../dummy_dbs/dbms.json";
import cnData from "../../../dummy_dbs/cn.json";
import oopData from "../../../dummy_dbs/oops.json";
const ITEMS_PER_PAGE = 5;

const questionsData = {
  "Operating System": osData.os_questions,
  DBMS: dbmsdata.dbms_questions,
  "Computer Networks": cnData.cn_questions,
  OOPs: oopData.oop_questions,
};

export default function CoreSub() {
  // Set default selected topic to "Operating System"
  const [selectedTopic, setSelectedTopic] = useState("Operating System");
  const [currentPage, setCurrentPage] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [visibleAnswers, setVisibleAnswers] = useState(new Set());
  const [markedForRevision, setMarkedForRevision] = useState(new Set());

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
    setCurrentPage(1);
  };

  const toggleQuestionComplete = (topicName, questionId) => {
    setCompletedQuestions((prev) => ({
      ...prev,
      [`${topicName}-${questionId}`]: !prev[`${topicName}-${questionId}`],
    }));
  };

  const toggleAnswer = (questionId) => {
    setVisibleAnswers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleRevisionMark = (questionId) => {
    setMarkedForRevision((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const totalPages = selectedTopic
    ? Math.ceil(questionsData[selectedTopic].length / ITEMS_PER_PAGE)
    : 0;

  const getCurrentPageItems = () => {
    if (!selectedTopic) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return questionsData[selectedTopic].slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  };

  const calculateProgress = (topic) => {
    const questions = questionsData[topic];
    const completedCount = questions.filter(
      (q) => completedQuestions[`${topic}-${q.id}`]
    ).length;
    return (completedCount / questions.length) * 100;
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex items-center m-8 h-[90%] justify-center">
        <div className="text-zinc-300 h-full w-full flex flex-col ">
          <div>
            <h1 className="text-3xl font-bold font-heading">Core Concepts Archive</h1>
            <p className="mt-4  text-zinc-400">
              Code.XL's Core Concepts Archive provides users with a wealth of
              expertly crafted materials on essential topics in computer
              science, including Operating Systems (OS), Object-Oriented
              Programming (OOP), Database Management Systems (DBMS), and other
              critical subjects. This archive serves as a comprehensive resource
              for learners, offering clear explanations, practical examples, and
              insightful explanations to deepen understanding and enhance
              skills. Users can explore key concepts, engage with interactive
              content, and access valuable study materials that support their
              educational journey in the dynamic field of technology.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-4 gap-x-8 gap-y-4 text-lg">
              {Object.keys(questionsData).map((topic) => (
                <div
                  key={topic}
                  onClick={() => handleTopicClick(topic)}
                  className={`h-28 p-4 rounded-lg font-semibold shadow-lg  hover:scale-105 duration-300 hover:cursor-pointer flex-col flex ${
                    selectedTopic === topic
                      ? "bg-zinc-900 ring-2 ring-green-700"
                      : "bg-zinc-900"
                  }`}
                >
                  <h1>{topic}</h1>
                  <div className="w-full bg-zinc-600 rounded-full h-2 mt-auto mb-3">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${calculateProgress(topic)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {selectedTopic && (
              <div className="rounded-lg">
                <h2 className="text-2xl font-bold mb-6">{selectedTopic}</h2>

                <div className="w-full">
                  <table className="w-full border-collapse">
                    <tbody>
                      {getCurrentPageItems().map((item) => (
                        <tr
                          key={item.id}
                          className="border border-zinc-700 group bg-black text-md "
                        >
                          <td className="border border-zinc-700 w-20 text-center">
                            <input
                              type="checkbox"
                              checked={
                                completedQuestions[
                                  `${selectedTopic}-${item.id}`
                                ] || false
                              }
                              onChange={() =>
                                toggleQuestionComplete(selectedTopic, item.id)
                              }
                              className="appearance-none h-5 w-5 border-2 border-zinc-600 rounded-md checked:bg-green-500 checked:border-zinc-600 checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 cursor-pointer transition duration-200 relative"
                            />
                          </td>
                          <td className="border border-zinc-700 py-4">
                            <div className="space-y-2">
                              <p className="font-semibold text-zinc-300 px-4">
                                {item.question}
                              </p>
                              {visibleAnswers.has(item.id) && (
                                <div className="w-full border-t border-zinc-700"></div>
                              )}
                              <div
                                className={`transition-all duration-300 ${
                                  visibleAnswers.has(item.id)
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0 overflow-hidden"
                                }`}
                              >
                                <p className="text-zinc-400 pt-2 px-4">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="border border-zinc-700 px-2 py-4 w-24 text-center">
                            <button
                              onClick={() => toggleAnswer(item.id)}
                              className="flex items-center justify-center w-full hover:bg-zinc-700 py-2 rounded-lg transition-colors"
                              aria-label={
                                visibleAnswers.has(item.id)
                                  ? "Hide Answer"
                                  : "Show Answer"
                              }
                            >
                              {visibleAnswers.has(item.id) ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </td>
                          <td className="border border-zinc-700 px-2 py-4 w-20 text-center">
                            <button
                              onClick={() => toggleRevisionMark(item.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                markedForRevision.has(item.id)
                                  ? "text-yellow-500"
                                  : "text-zinc-400"
                              }`}
                              aria-label={
                                markedForRevision.has(item.id)
                                  ? "Unmark for Revision"
                                  : "Mark for Revision"
                              }
                            >
                              <Star className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-4 text-zinc-400">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 hover:bg-zinc-700 rounded-full disabled:opacity-50"
                    >
                      <ChevronLeft />
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 hover:bg-zinc-700 rounded-full disabled:opacity-50"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
