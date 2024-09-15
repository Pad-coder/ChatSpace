import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
const BackButton = () => {
  return (
    <Link to='/'>
    <div className='mt-auto'>
        <IoIosArrowBack className='w-6 h-6 rounded-full text-white cursor-pointer hover:bg-stone-900' />
    </div>
    </Link>
  )
}

export default BackButton