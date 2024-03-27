import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

const Calculator = ({ isAppOpen, toggleCalculator }) => {
  const explorerRef = useRef(null);
  const [submit, setSubmit] = useState(false);
  const [showResult, setShowResult] = useState(" Am I Right?");
  const [click, setClick] = useState(0);

  const appendToDisplay = (value) => {
    const display = document.getElementById("display");
    display.value += value;
  };

  const calculate = () => {
    const display = document.getElementById("display");
    try {
      const result = eval(display.value);
      setClick((prevClick) => prevClick + 1); // Increment click count

      if (click === 0 || click === 4) {
        display.value = "Hello World";
        setClick(1); // Reset click count
      } else {
        if (result !== undefined && !isNaN(result)) {
          display.value = result;
          setSubmit(true);
        } else {
          display.value = "Enter Something Stoopid";
          setTimeout(() => {
            display.value = "";
          }, 1000);
        }
      }
    } catch (error) {
      display.value = "Error";
      setTimeout(() => {
        display.value = "";
      }, 1000);
    }
  };

  const clearDisplay = () => {
    const display = document.getElementById("display");
    display.value = "";
    setShowResult(" Am I Right?");
    setSubmit(false);
  };

  const handleYesClick = () => {
    const display = document.getElementById("display");
    setShowResult("Too Easy😎");
    setTimeout(() => {
      setSubmit(false);
      setShowResult(" Am I Right?");
      display.value = "";
    }, 3000);
  };

  const handleNoClick = () => {
    const display = document.getElementById("display");
    setShowResult("BRUH 💀");
    setTimeout(() => {
      setSubmit(false);
      setShowResult(" Am I Right?");
      display.value = "";
    }, 3000);
  };

  return (
    <div className={`${isAppOpen ? "" : "hidden"} z-30`}>
      <Draggable handle=".title-bar" nodeRef={explorerRef}>
        <div
          ref={explorerRef}
          className="window bg-black w-auto rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-semibold"
        >
          <div className="title-bar">
            <div className="text-white h-9 flex justify-between select-none">
              <div className="m-1 ml-4 font-normal">Calculator</div>
              <div className="flex">
                <div className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl">
                  minimize
                </div>
                <div className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm">
                  check_box_outline_blank
                </div>
                <div
                  className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                  onClick={toggleCalculator}
                >
                  close
                </div>
              </div>
            </div>
          </div>
          <div className="content text-white select-none text-center flex justify-center">
            <div className="top-[10px] bg-gradient-to-r from-blue-500 to-pink-500 mx-auto p-20 rounded-xl shadow-lg text-black wp">
              <input
                type="text"
                id="display"
                className="w-full mb-10 px-4 py-3 text-xl rounded-lg bg-white shadow-inner font-bold"
              />
              <div className="grid grid-cols-4 gap-4">
                <div
                  className={`text-white col-span-4 text-center text-2xl ${
                    submit ? "" : "hidden"
                  }`}
                >
                  {showResult}
                </div>
                <button
                  className={`btn btn-success col-span-2 text-white ${
                    submit ? "" : "hidden"
                  }`}
                  onClick={handleYesClick}
                >
                  YES
                </button>
                <button
                  className={`btn btn-error col-span-2 text-white ${
                    submit ? "" : "hidden"
                  }`}
                  onClick={handleNoClick}
                >
                  NO
                </button>
                <button
                  onClick={() => appendToDisplay("7")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  7
                </button>
                <button
                  onClick={() => appendToDisplay("8")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  8
                </button>
                <button
                  onClick={() => appendToDisplay("9")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  9
                </button>
                <button
                  onClick={() => appendToDisplay("/")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  /
                </button>
                <button
                  onClick={() => appendToDisplay("4")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  4
                </button>
                <button
                  onClick={() => appendToDisplay("5")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  5
                </button>
                <button
                  onClick={() => appendToDisplay("6")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  6
                </button>
                <button
                  onClick={() => appendToDisplay("*")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  *
                </button>
                <button
                  onClick={() => appendToDisplay("1")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  1
                </button>
                <button
                  onClick={() => appendToDisplay("2")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  2
                </button>
                <button
                  onClick={() => appendToDisplay("3")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  3
                </button>
                <button
                  onClick={() => appendToDisplay("-")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  -
                </button>
                <button
                  onClick={() => appendToDisplay("0")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  0
                </button>
                <button
                  onClick={() => appendToDisplay(".")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  .
                </button>
                <button
                  onClick={() => calculate()}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  =
                </button>
                <button
                  onClick={() => appendToDisplay("+")}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  +
                </button>
                <button
                  onClick={() => clearDisplay()}
                  className="p-3 text-2xl text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  C
                </button>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Calculator;
