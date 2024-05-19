import React,{useEffect, useRef, useState} from 'react'

const Board = () => {

  const [text, setText] = useState("X")
  const [lock, setLock] = useState(false)
  const [data, setData] = useState(["","","","","","","","",""])
  const inText = useRef(null)
  const btn0 = useRef(null)
  const btn1 = useRef(null)
  const btn2 = useRef(null)
  const btn3 = useRef(null)
  const btn4 = useRef(null)
  const btn5 = useRef(null)
  const btn6 = useRef(null)
  const btn7 = useRef(null)
  const btn8 = useRef(null)
  const btn_array = [btn0,btn1,btn2,btn3,btn4,btn5,btn6,btn7,btn8]


  

  const onChangeHandler = (e, num) =>{
    if(lock){
      return 0;
    } 
    if(text === "X"){
      e.target.innerText = "X"
      data[num] = "X"
      setText("O")
    } else {
      e.target.innerText = "O"
      data[num] = "O"
      setText("X")
    }
    e.target.disabled = true
    calculateWinner()
  }

  function calculateWinner() {
    if(data[0] === data[1] && data[1] === data[2] && data[2] !== ""){
      winShow(data[2])
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== ""){
      winShow(data[5])
    } else if(data[6] === data[7] && data[7] === data[8] && data[8] !== ""){
      winShow(data[8])
    } else if(data[0] === data[4] && data[4] === data[8] && data[8] !== ""){
      winShow(data[8])
    } else if(data[2] === data[4] && data[4] === data[6] && data[6] !== ""){
      winShow(data[6])
    } else if(data[0] === data[3] && data[3] === data[6] && data[6] !== ""){
      winShow(data[6])
    } else if(data[1] === data[4] && data[4] === data[7] && data[7] !== ""){
      winShow(data[7])
    } else if(data[2] === data[5] && data[5] === data[8] && data[8] !== ""){
      winShow(data[8])
    }
  }

  const winShow = (name) =>{
    setLock(true)
    inText.current.innerHTML = `<h1 className='text-4xl text-green-700 font-bold my-4'>${name} is a Winner</h1>`

  }
  
  const resetBtn = ()=>{
    setData(["","","","","","","","",""])
    inText.current.innerHTML = `<h1 className='text-4xl text-green-700 font-bold my-4'>Tic Tac Toe Game</h1>`
    setLock(false)
    setText("X")
    btn_array.map((btn)=>{
      btn.current.innerHTML = ""
      btn.current.disabled = false
    })

  }

  return (
    <div>
      <div className='flex flex-col items-center h-[100vh] my-6'>
        <h1 className='text-4xl text-black font-bold my-4' ref={inText}>Tic Tac Toe Game</h1>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn0} onClick={(e)=>{onChangeHandler(e,0)}}></button>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn1} onClick={(e)=>{onChangeHandler(e,1)}}></button>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn2} onClick={(e)=>{onChangeHandler(e,2)}}></button>
          </div>
          <div className='flex gap-2'>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn3} onClick={(e)=>{onChangeHandler(e,3)}}></button>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn4} onClick={(e)=>{onChangeHandler(e,4)}}></button>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn5} onClick={(e)=>{onChangeHandler(e,5)}}></button>
          </div>
          <div className='flex gap-2'>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn6} onClick={(e)=>{onChangeHandler(e,6)}}></button>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn7} onClick={(e)=>{onChangeHandler(e,7)}}></button>
            <button className='h-16 w-16 bg-slate-700 border-white rounded-md text-white text-2xl' ref={btn8} onClick={(e)=>{onChangeHandler(e,8)}}></button>
          </div>
        </div>
        <button className='text-lg font-bold text-white bg-slate-700 rounded-md my-6 py-2 px-6' onClick={resetBtn}>Reset</button>
      </div>
    </div>
  )
}

export default Board