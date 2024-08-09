import { useState } from 'react'
import './App.css'

const SIMBOLS=['C','/','*','-','+','.','⌫']

function App() {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleOperador = (simbol) => {
    if (simbol === 'C') {
      setDisplay('0');
      setOperation('');
    } else if (simbol === '⌫') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else {
      setOperation(operation + simbol);
      setResetDisplay(true);
    }
  };
  const calculateResult = () => {
    try {
      const result = eval(operation);
      setDisplay(result.toString());
      setOperation(result.toString());
      setResetDisplay(true);
    } catch {
      setDisplay('Error');
      setOperation('');
    }
  };

  const handleClick = (number) => {
    if (resetDisplay) {
      setDisplay(number.toString());
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? number.toString() : display + number);
    }
    setOperation(operation + number);
  };

  return (
    <>
      <div className="calculator">
            <div className="display">
                <div id="result">{display}</div>
            </div>
            <div className="buttons">
                {SIMBOLS.map((sim, index) => (
            <button className="btn" onClick={() => handleOperador(sim)} key={index}>
              {sim}
            </button>
          ))}
                <br/>
                {Array.from({ length: 10 }, (_, index) => (
            <button
              className="btn"
              key={index}
              onClick={() => handleClick(index)}
            >
              {index}
            </button>
          ))}
                <button className="btn btn-equal" onClick={calculateResult} >=</button> 
            </div>
      </div>     
    </>
  )
}

export default App
