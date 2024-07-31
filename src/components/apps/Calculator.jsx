import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

const Calculator = ({ isAppOpen, toggleCalculator }) => {
  const calculatorRef = useRef(null);
  const [display, setDisplay] = useState("");
  const [showResult, setShowResult] = useState(" Am I Right?");
  const [submit, setSubmit] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const appendToDisplay = (value) => {
    setDisplay((prevDisplay) => prevDisplay + value);
  };

  const calculate = () => {
    try {
      const result = eval(display);
      setClickCount((prevClickCount) => prevClickCount + 1);

      if (clickCount === 0 || clickCount === 4) {
        setDisplay("Hello World");
        setClickCount(1);
      } else {
        if (result !== undefined && !isNaN(result)) {
          setDisplay(result.toString());
          setSubmit(true);
        } else {
          setDisplay("Enter Something Stoopid");
          setTimeout(() => {
            setDisplay("");
          }, 1000);
        }
      }
    } catch (error) {
      setDisplay("Error");
      setTimeout(() => {
        setDisplay("");
      }, 1000);
    }
  };

  const clearDisplay = () => {
    setDisplay("");
    setShowResult(" Am I Right?");
    setSubmit(false);
  };

  const handleYesClick = () => {
    setShowResult("Too Easy😎");
    setTimeout(() => {
      setSubmit(false);
      setShowResult(" Am I Right?");
      setDisplay("");
    }, 3000);
  };

  const handleNoClick = () => {
    setShowResult("BRUH 💀");
    setTimeout(() => {
      setSubmit(false);
      setShowResult(" Am I Right?");
      setDisplay("");
    }, 3000);
  };

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bounds = {
    left: 0,
    top: 0,
    right: screenWidth - 544,
    bottom: screenHeight - 800,
  };

  return (
    <div
      className={`${
        isAppOpen ? "" : "hidden"
      } z-30 w-full h-screen pointer-events-none absolute`}
    >
      <Draggable handle=".title-bar" nodeRef={calculatorRef} bounds={bounds}>
        <div
          ref={calculatorRef}
          className="window bg-black w-[34em] h-[50em] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto"
        >
          <div className="title-bar">
            <div className="text-white h-9 flex justify-between select-none">
              <div className="m-1 ml-4 font-normal">Calculator</div>
              <div className="flex">
                <div
                  className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
                  onClick={toggleCalculator}
                >
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
            <div className="top-[10px] bg-neutral-900 mx-auto p-20 shadow-lg text-white h-screen">
              <input
                type="text"
                value={display}
                className="w-full mb-10 px-4 py-3 text-3xl rounded-lg bg-transparent shadow-inner text-right"
                placeholder="0"
                disabled
              />
              <div className="grid grid-cols-4 gap-3 text-2xl font-light">
                <div
                  className={`text-white text-center text-4l col-span-2 ${
                    submit ? "" : "hidden"
                  }`}
                >
                  {showResult}
                </div>
                <button
                  className={`btn btn-success text-white p-3 ${
                    submit ? "" : "hidden"
                  }`}
                  onClick={handleYesClick}
                >
                  YES
                </button>
                <button
                  className={`btn btn-error text-white p-3 ${
                    submit ? "" : "hidden"
                  }`}
                  onClick={handleNoClick}
                >
                  NO
                </button>
                <button
                  onClick={clearDisplay}
                  className="p-6 text-center bg-gray-300 rounded-full hover:bg-opacity-60 focus:outline-none bg-opacity-65"
                >
                  AC
                </button>
                <button
                  onClick={() => appendToDisplay("*2")}
                  className="p-6 text-center bg-gray-300 rounded-full hover:bg-opacity-60 focus:outline-none bg-opacity-65"
                >
                  x2
                </button>
                <button
                  onClick={() => appendToDisplay("%")}
                  className="p-6 text-center bg-gray-300 rounded-full hover:bg-opacity-60 focus:outline-none bg-opacity-65"
                >
                  %
                </button>
                <button
                  onClick={() => appendToDisplay("/")}
                  className="p-6 text-center bg-yellow-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  /
                </button>
                <button
                  onClick={() => appendToDisplay("7")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  7
                </button>
                <button
                  onClick={() => appendToDisplay("8")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  8
                </button>
                <button
                  onClick={() => appendToDisplay("9")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  9
                </button>
                <button
                  onClick={() => appendToDisplay("*")}
                  className="p-6 text-center bg-yellow-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  x
                </button>
                <button
                  onClick={() => appendToDisplay("4")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  4
                </button>
                <button
                  onClick={() => appendToDisplay("5")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  5
                </button>
                <button
                  onClick={() => appendToDisplay("6")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  6
                </button>
                <button
                  onClick={() => appendToDisplay("-")}
                  className="p-6 text-center bg-yellow-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  -
                </button>
                <button
                  onClick={() => appendToDisplay("1")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  1
                </button>
                <button
                  onClick={() => appendToDisplay("2")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  2
                </button>
                <button
                  onClick={() => appendToDisplay("3")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  3
                </button>
                <button
                  onClick={() => appendToDisplay("+")}
                  className="p-6 text-center bg-yellow-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  +
                </button>
                <button
                  onClick={() => appendToDisplay("0")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none col-span-2"
                >
                  0
                </button>
                <button
                  onClick={() => appendToDisplay(".")}
                  className="p-6 text-center bg-neutral-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  .
                </button>
                <button
                  onClick={calculate}
                  className="p-6 text-center bg-yellow-600 rounded-full hover:bg-opacity-60 focus:outline-none"
                >
                  =
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
