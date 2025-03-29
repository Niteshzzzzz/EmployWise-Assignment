import React from 'react'

function InputField({id, label, name, value, onChange, error, type}) {
    return (
        <div className="relative mb-10">
            <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder='Marry Doe' className='border-1 border-[#CBCBCB] rounded text-black-700 px-4 py-2 w-full focus:outline-[#6C25FF]' ></input>
            <p className='text-red-600 text-xs absolute top-[100%] left-2'>{error}</p>
            <label htmlFor={id} className='absolute top-[-0.8rem] left-[1.2rem] bg-[#F7F8F9] text-[#6C25FF] px-[4px] text-sm'>{label} <sup className='text-[#DD4A3D]'>*</sup></label>
        </div>
    )
}

export default InputField