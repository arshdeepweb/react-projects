import React, { useCallback, useEffect, useRef, useState } from 'react'

const Password = () => {

  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(null)
  const [uppercase, setUppercase] = useState(null)
  const [specialCharacter, setSpecialCharacter] = useState(null)
  const [password, setPassword] = useState("")
  const passCopy = useRef()


  const passwordGenerator = useCallback(() => {

    let lowerCase = "abcefghijklmnopqrstuvwxyz"
    let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let specialChar = "!@#$%^&*()_+~`|}{[]:;?><,./-="
    let number = "0123456789"
    let allCharacter = lowerCase
    
    if(uppercase){
      allCharacter += upperCase
    }
    if(numbers){
      allCharacter += number
    } 
    if(specialCharacter){
      allCharacter += specialChar
    } 

    let genPassword = ""

    for(let i=1; i<=length; i++){
      let randomGen = Math.floor(Math.random() * allCharacter.length)
      genPassword += allCharacter[randomGen]
      setPassword(genPassword)

    }
      
    },
    [uppercase, specialCharacter, numbers, length]
  )

  const copyPassword = () =>{
    let passwordValue = passCopy.current.value;
    navigator.clipboard.writeText(passwordValue).then(()=>{
      alert("Password is Copy")
    })
  }

  useEffect(() => {
    passwordGenerator()
  
  }, [uppercase, specialCharacter, numbers, length])
  
  
  


  return (
    <div>
      <div>
        <h1 className='text-center text-3xl font-bold text-blue-700'>Random Password Generator</h1>
        <div className='w-[100%] flex bg-blue-700 justify-center items-center my-3 rounded-md'>
          <input type="text" value={password} className='w-[100%] p-3 outline-none bg-transparent text-white' ref={passCopy} readOnly/>
          <button className='bg-transparent px-4 text-white font-bold' onClick={copyPassword}>Copy</button>
        </div>
        <hr className='h-1 bg-gray-300 my-3'/>
        <div className='flex flex-col gap-2 '>
          <div className='w-[100%] flex justify-between items-center'>
            <label htmlFor="123" className='font-bold'>Password Length</label>
            <input type="range" id='123' max='30' onChange={(e)=>setLength(e.target.value)}/>
            <p>{length}</p>
          </div>
          <hr className='h-1 bg-gray-300'/>
          <div className='w-[100%] flex justify-between'>
            <label htmlFor="123" className='font-bold'>Add Numbers (0-9)</label>
            <input type="checkbox" id='123' onChange={()=>setNumbers(numbers?false:true)} />
          </div>
          <hr className='h-1 bg-gray-300'/>
          <div className='w-[100%] flex justify-between'>
            <label htmlFor="ABC" className='font-bold' >Add Uppercase (ABC)</label>
            <input type="checkbox" id='ABC' onChange={()=>setUppercase(uppercase?false:true)}/>
          </div>
          <hr className='h-1 bg-gray-300'/>
          <div className='w-[100%] flex justify-between'>
            <label htmlFor="special" className='font-bold'>Add Special Character</label>
            <input type="checkbox" id='special' onChange={()=>setSpecialCharacter(specialCharacter ? false : true)}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Password