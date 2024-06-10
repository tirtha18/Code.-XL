import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

const sheetData = [
  { ind: 1, name: "Sheet 1", problems: ["Problem 1", "Problem 2"] },
  { ind: 2, name: "Sheet 2", problems: ["Problem 3", "Problem 4"] },
  { ind: 3, name: "Sheet 3", problems: ["Problem 5", "Problem 6"] },
  { ind: 4, name: "Sheet 4", problems: ["Problem 7", "Problem 8"] },
];

function Sheet({ setSheetshow, selectedsheet }) {
  return (
    <div>
      <button
        className="px-2 py-1 rounded-lg text-white bg-blue-800 ml-8"
        onClick={() => {
          setSheetshow(false);console.log(selectedsheet);
        }}
      >
        Back
      </button>
      
    </div>
  );
}

export default function Sheets() {
  const [sheetshow, setSheetshow] = useState(false);
  const [selectedsheet, setSelectedsheet] = useState({});

  return (
    <div>
      {!sheetshow ? (
        <div
          className="px-10 py-10 overflow-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-14 gap-4">
            <div className="hover:cursor-pointer hover:scale-105 duration-300 bg p-5 rounded-xl h-44 flex border text-3xl text-gray-700 font-bold bg-white items-center justify-center">
              <FiPlus className="hover:scale-105 duration-200" size={100} />
            </div>
            {sheetData.map((sheet) => (
              <div
                key={sheet.ind}
                onClick={() => {
                  setSelectedsheet(sheet);
                  setSheetshow(true);
                }}
                className="hover:cursor-pointer hover:scale-105 duration-300 p-5 rounded-xl h-44 flex border flex-col bg text-3xl text-black font-bold bg-white"
              >
                <div>{sheet.name}</div>
                <div className="text-sm font-sans font mt-auto text-gray-900 underline flex flex-row items-center">
                  View all
                  <div className="px-1">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Sheet setSheetshow={setSheetshow} selectedsheet={selectedsheet} />
      )}
    </div>
  );
}
