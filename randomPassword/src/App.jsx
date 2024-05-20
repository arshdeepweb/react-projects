import React from 'react'
import Password from './component/Password'

const App = () => {
  return (
    <div>
      <div className='flex justify-center items-center h-[100vh] bg-blue-700'>
      <div className=' bg-white p-4 w-[70vw] sm:w-[60vw] md:w-[45vw] lg:w-[28vw] rounded-md'>
        <Password />
      </div>
      </div>
    </div>
  )
}

export default App