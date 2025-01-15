import { useEffect, useRef, useState } from "react";

function App() {
  const [theme, setTheme] = useState(0);
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("0");
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
  // For Key prop in history list items
  const nextHistoryID = useRef(0);

  useEffect(() => {
    // Removing leading zeros but not when zero is the only number so the input is never empty
    setInput((prevInput) => prevInput.replace(/^0+(?=\d)/, ""));
  }, [input]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (["Error", "0"].includes(output)) {
      return;
    }
    setHistory((prevHistory) => {
      //   displayHistory([...prevHistory, output]);
      if (prevHistory.length > 5) prevHistory.shift();
      if (output === prevHistory[prevHistory.length - 1]) return prevHistory;
      return [...prevHistory, output];
    });
  }, [output]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history])

  function deleteHistory() {
    setHistory([]);
  }

  function handleKeyPress(e) {
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", ".", "/", "x", "*", "="].includes(e.key)) {
      keyClicked(e.key);
    } else if (e.key === "Backspace") {
      keyClicked("DEL");
    } else if (e.key === "`") {
      keyClicked("RESET");
    } else if (e.key === "Enter") {
      keyClicked("=");
    }
  }

  function calculateOutput() {
    try {
      return eval(input).toString();
    } catch {
      return "Error";
    }
  }

  function keyClicked(key) {
    switch (key) {
      case "DEL":
        if (input.length > 1) {
          setInput((prevInput) => prevInput.slice(0, prevInput.length - 1));
        } else {
          setInput("0");
        }
        break;
      case "=":
        const result = calculateOutput();
        setOutput(result);
        // Only update the input if the result is not an Error so that the user can edit the input
        if (result !== "Error") setInput(result);
        break;
      case "RESET":
        setOutput("0");
        setInput("0");
        break;
      case "x":
        setInput((prevInput) => prevInput + "*");
        break;
      default:
        setInput((prevInput) => prevInput + key);
        break;
    }
  }

  return (
    <main className={`max-sm:p-2 max-lg:flex-col p-4 bg-screenBg flex gap-2 ${theme ? "theme" + (theme + 1) : " defaultTheme"}`}>
      {/* defaultTheme theme2 theme3 */}
      <div className="max-h-screen flex justify-center items-center grow">
        <div className="max-w-96 grow flex flex-col gap-4 max-sm:gap-2">
          <header className="flex justify-between items-end defaultTheme:text-white text-textColor">
            <h1>calc</h1>
            <div className="flex gap-4 items-end">
              <span className="uppercase text-xs">Theme</span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 justify-around">
                  <button className="text-xs hover:cursor-pointer" onClick={() => setTheme(0)}>
                    1
                  </button>
                  <button className="text-xs hover:cursor-pointer" onClick={() => setTheme(1)}>
                    2
                  </button>
                  <button className="text-xs hover:cursor-pointer" onClick={() => setTheme(2)}>
                    3
                  </button>
                </div>

                <button className={`w-14 h-4 bg-inputBg rounded-full hover:cursor-pointer relative`} onClick={() => setTheme((prevTheme) => (prevTheme + 1) % 3)}>
                  <div className={`h-[75%] aspect-square bg-equalKeyBg rounded-full transition-all absolute top-[12.5%] ${theme === 0 ? "left-0.5" : theme === 1 ? "left-1/2 -translate-x-1/2" : "left-full -translate-x-[115%]"}`}></div>
                </button>
              </div>
            </div>
          </header>
          <section className="flex flex-col justify-around items-end defaultTheme:text-white text-textColor bg-outputBg rounded-lg py-2 px-4">
            <div className="text-textColor self-start text-sm">{input}</div>
            <div className="text-4xl">{output.toLocaleString()}</div>
          </section>

          <section className="grid grid-rows-5 grid-cols-4 gap-4 bg-inputBg p-4 rounded-lg max-sm:p-1 max-sm:pb-2 max-sm:gap-2" id="input">
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              7
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              8
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              9
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-specialKeyShadow grid place-content-center bg-specialKeyBg rounded-lg py-1 text-white text-xl shadow-[0px_8px_0px_-1px] uppercase">
              del
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              4
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              5
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              6
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              +
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              1
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              2
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              3
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              -
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              .
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              0
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              /
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-keyShadow grid place-content-center bg-keyBg rounded-lg py-1 text-textColor text-xl shadow-[0px_8px_0px_-1px]">
              x
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-specialKeyShadow grid place-content-center bg-specialKeyBg rounded-lg py-1 text-white text-xl col-span-2 shadow-[0px_8px_0px_-1px] uppercase">
              reset
            </button>
            <button onClick={(e) => keyClicked(e.target.innerText)} className="hover:cursor-pointer active:scale-105 shadow-equalKeyShadow shadow-[0px_8px_0px_-1px] grid place-content-center bg-equalKeyBg rounded-lg py-1 text-white text-xl col-span-2 theme3:text-[hsl(198,20%,13%)]">
              =
            </button>
          </section>
        </div>
      </div>
      <div className={`flex items-center max-w-20 self-center ${!history.length && "hidden"}`}>
        <ul className="flex flex-col gap-2 opacity-50 border overflow-x-auto p-2 relative">
          <h2 className="defaultTheme:text-white text-textColor text-lg">History:</h2>
          {history.map((element) => (
            <li className="defaultTheme:text-white text-textColor text-xs" key={nextHistoryID.current++}>{element}</li>
          ))}
          <button onClick={deleteHistory} className="rounded-full bg-red-500 text-xs p-1 defaultTheme:text-white text-textColor sticky bottom-0 left-0">
            Delete
          </button>
        </ul>
      </div>
    </main>
  );
}

export default App;
