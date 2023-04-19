import React, { Component, useEffect, useState } from 'react'
import './App.css';
import Header from "./components/header/Header"
import Keypad from "./components/keypad/Keypad"
import moon from "./images/moon.png"
import sun from "./images/sun.png"

const usekeycode = [
  48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,8,13,190,187,189,191,56,111,106,107,109
];

const numbers = [
  "0","1","2","3","4","5","6","7","8","9"
];

const operators = [
  "*" , "+","-","/"
];



function App() {
  const [isdark , setisdark] = useState(JSON.parse(localStorage.getItem("calculator-app-mode")) || false);

  const [exp , setexp] = useState("");
  const  [result , setresult] = useState("");
  const[history , sethistory] = useState(JSON.parse(
    localStorage.getItem("calculator-app-mode-history")) || []
  );

  const handleKeyPress = (keycode , key) => {
    if(!keycode)return;
    if(!usekeycode.includes(keycode))return;


    if(numbers.includes(key)){
      if(key == "0"){
        if(exp.length === 0)return;
      }
      calculator(exp + key);
      setexp(exp + key);
    }
    else if(operators.includes(key)){ 
      if(!exp)return
      const lastchar = exp.slice(-1);
      if(operators.includes(lastchar) || lastchar === ".")return;
      setexp(exp + key);
    }
    else if(key === "."){
      if(!exp)return
      const lastchar = exp.slice(-1);
      if(!numbers.includes(lastchar))return;
      setexp(exp + ".");
    }
    else if(keycode===8){
      if(!exp){
        setresult("");
        return;
      }
      calculator(exp.slice(0,-1));
      setexp(exp.slice(0,-1));
    }
    else if(keycode===13){
      if(!exp)return;
      calculator(exp);
      const temphistory = [...history]
      if(temphistory.length > 20){
        temphistory = temphistory.slice(0,1);
      }
      temphistory.push(exp);
      sethistory(temphistory);
    }
  }

  const calculator = (exp) => {
    if(!exp){
      setresult("");
      return;
    }
    const lastchar = exp.slice(-1);
    if(!numbers.includes(lastchar))exp=exp.slice(0,1);
    const answer = eval(exp).toFixed(2) + "";
    console.log(answer);
    setresult(answer);
    console.log(result);
  }

  useEffect( () => {
    localStorage.setItem("calculator-app-mode-history" , JSON.stringify(history))
  } , [history])

  useEffect( () => {
    localStorage.setItem("calculator-app-mode" , JSON.stringify(isdark))
  } , [isdark])

  return (
    <div className="app" data-theme={isdark ? "dark" : ""}
          tabIndex="0"
          onKeyDown={(event) => handleKeyPress(event.keyCode , event.key)}
    >
      <div className='app_calculator'>
        <div className='app_calculator_navbar'>
          <div className='app_calculator_navbar_toggle' 
          onClick={() => setisdark(!isdark)}>
            <div 
            className={`app_calculator_navbar_toggle_circle  ${
              isdark ? "app_calculator_navbar_toggle_circle_active" : ""
            }`}
            />
            </div>
            <img src= {isdark ? moon : sun} alt="mode" />
        </div>

        <Header exp={exp}  result={result}  history = {history}/>
        <Keypad handleKeyPress={handleKeyPress}  />
      </div>
    </div>
  )
}

export default App;

