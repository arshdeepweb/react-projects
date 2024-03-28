import { useState, useRef, useEffect, useCallback } from 'react'
import countryList from './codes'
//https://flagsapi.com/US/flat/48.png

function Currency() {

  // Set the Variable State
  const [show, setShow] = useState("WelCome to Currency Converter");
  const [amount, setamount] = useState(1);
  const [fromCountryCode, setFromCountryCode] = useState("");
  const [toCountryCode, setTOCountryCode] = useState("");


  // Set the Ref State
  const inputAmount = useRef(null);
  const fromRef1 = useRef(null);
  const toRef2 = useRef(null);


  // Fetch the Currency
  let useCurrencyInfo = useCallback( async(from, to, amount) =>{
    const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f84317269dmshfdc52c63f6016c0p1ee7adjsn8fc9abd24dd7',
        'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      setShow("Waiting...")
      const result = await response.json();
      let resultShow = `${inputAmount.current.value} ${fromRef1.current.value} to ${Math.floor(result.result)} ${toRef2.current.value}`
      await setShow(resultShow)
    } catch (error) {
      console.error(error);
    }
  }, [])

  // run the Onload function
  useEffect(() => {
    if (fromRef1.current && toRef2.current) {
      fromRef1.current.value = 'USD';
      toRef2.current.value = 'INR';
      inputAmount.current.value = 1;
    }

    showImg()
    
  }, []);

  // get the value and convert the Currency
  const handleSelectChange = useCallback(() => {
    const fromVal = fromRef1.current.value;
    const toVal = toRef2.current.value;
    const amount = inputAmount.current.value;

    useCurrencyInfo(fromVal, toVal, amount)

  },[]);

  // show image according to  the value
  const showImg = () => {
    const fromImgVal = fromRef1.current.value;
    const toImgVal = toRef2.current.value;
    

    const fromCountryCode = countryList[fromImgVal];
    const toCountryCode = countryList[toImgVal];

    setFromCountryCode(fromCountryCode)
    setTOCountryCode(toCountryCode)

  };

return (
  <>
    <div className='bg-[url(https://images.pexels.com/photos/5632353/pexels-photo-5632353.jpeg?auto=compress&cs=tinysrgb&w=600)] w-[100%] h-[100vh] bg-no-repeat bg-center bg-cover relative pt-[10rem]'>
    
      <div className=' z-10 relative border-grey border-2 border-solid  backdrop-blur-md w-[50%] py-4 rounded-lg lg:w-[30vw] m-auto text-center'>
        <h1 className='text-3xl font-bold'>Currency Converter</h1>
        <div className="flex gap-4 my-4 justify-center flex-col md:flex-row">
          <p className='text-xl font-semibold'>Amount :</p>
          <input type="text" placeholder="Enter the Amount" ref={inputAmount} className='p-1 text-md rounded-md bg-transparent border-2 border-solid border-grey mx-6 md:mx-0 outline-none' />
        </div>
        <div className="flex justify-evenly items-center md:my-8">
          <div className="md:flex gap-3">
            <img src={`https://flagsapi.com/${fromCountryCode}/flat/48.png`} alt="img" />
            <select name="from" className='p-1 text-md rounded-md bg-transparent border-2 border-solid border-grey'
              ref={fromRef1}
              onChange={showImg}
            >
              
            {Object.entries(countryList).map(([code,name]) => (
            <option key={code} value={code} name={name} >
              {code}
            </option>
          ))}

            </select>
          </div>
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
          <div className="md:flex gap-3">
            <img src={`https://flagsapi.com/${toCountryCode}/flat/48.png`} alt="img" />
            <select name="to" className='p-1 text-md rounded-md bg-transparent border-2 border-solid border-grey'
              ref={toRef2} onChange={showImg}
            >
              
              {Object.entries(countryList).map(([code]) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}

            </select>
          </div>
        </div>
        <div>
          <p className='my-4 text-white text-md '>{show}</p>


          <button id="conv-btn" onClick={handleSelectChange} className='py-2 px-6 text-white text-md rounded-md bg-blue-600 '>Convert Now</button>
        </div>
      </div>
      <div className='bg-black opacity-55 w-[100%] h-[100vh] absolute top-0'></div>
    </div>
    
  </>
);
}

export default Currency;