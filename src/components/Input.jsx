import { useState } from "react";

export const Input = ({
    onChange, 
    disabled=false, 
    value="", 
    color="primary", 
    type="text", 
    label, 
    placeholder="",
    id,
    name

})=>{


    const theme = {
        primary:'border-primary shadow-[0px_10px_0px_0px_#E4B363] focus:shadow-[0px_5px_0px_0px_#E4B363]',
        second:'border-second shadow-[0px_10px_0px_0px_#EF6461] focus:shadow-[0px_5px_0px_0px_#EF6461]',
        light:'border-[#E0DFD5] shadow-[0px_10px_0px_0px_#E0DFD5] focus:shadow-[0px_5px_0px_0px_#E0DFD5]',
        disabled:'disabled:border-[#ABABAB] disabled:shadow-[0px_10px_0px_0px_#ABABAB] ',
    }
return(
    <div>
        <label className="text-3xl" htmlFor={id}>{label}</label>
        <input
        name={name}
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange} // ใช้ onChange เพื่ออัปเดตค่า
        className={`
             focus:outline-none 
            w-full border-2 p-2 py-4 text-4xl  rounded-[10px]  transition-all
            ${disabled == true ? `bg-[#EEEEEE] text-[#ABABAB] ${theme.disabled} cursor-not-allowed` : `bg-white text-black-2 focus:translate-y-[5px] ${theme[color]}`}`}
        onClick={onclick}
        disabled={disabled}
        />

    </div>
)
}


export function InputDropDown({
    onChange, 
    disabled=false, 
    value="", 
    color="primary", 
    label, 
    name,
    options = [],
    selected=false,
    error,
  }) {
    const theme = {
        primary:'border-primary shadow-[0px_10px_0px_0px_#E4B363] focus:shadow-[0px_5px_0px_0px_#E4B363]',
        second:'border-second shadow-[0px_10px_0px_0px_#EF6461] focus:shadow-[0px_5px_0px_0px_#EF6461]',
        light:'border-[#E0DFD5] shadow-[0px_10px_0px_0px_#E0DFD5] focus:shadow-[0px_5px_0px_0px_#E0DFD5]',
        disabled:'disabled:border-[#ABABAB] disabled:shadow-[0px_10px_0px_0px_#ABABAB] ',
    }
    return (
      <div className="flex flex-col items-start text-font-content">
        <label className="text-3xl">{label}</label>
        <select
         className={`
            focus:outline-none 
           w-full border-2 p-2 py-4 text-4xl  rounded-[10px]  transition-all
           ${disabled == true ? `bg-[#EEEEEE] text-[#ABABAB] ${theme.disabled} cursor-not-allowed` : `bg-white text-black-2 focus:translate-y-[5px] ${theme[color]}`}`}
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} selected={selected}>
              {option.label}
            </option>   
          ))}
        </select>
        {error ? (
          <div className="text-error text-font-content text-start">{error}</div>
        ) : null}
      </div>
    );
  }
  