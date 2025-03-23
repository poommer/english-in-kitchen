import { Outlet } from "react-router-dom"


export const Button = ({onclick, disabled=false, text, color="primary"})=>{
    const theme = {
        primary:'border-primary shadow-[0px_10px_0px_0px_#E4B363] active:shadow-[0px_5px_0px_0px_#E4B363]',
        second:'border-second shadow-[0px_10px_0px_0px_#EF6461] active:shadow-[0px_5px_0px_0px_#EF6461]',
        green:'border-[#6B8E23] shadow-[0px_10px_0px_0px_#6B8E23] active:shadow-[0px_5px_0px_0px_#6B8E23]',
        light:'border-[#E0DFD5] shadow-[0px_10px_0px_0px_#E0DFD5] active:shadow-[0px_5px_0px_0px_#E0DFD5]',
        disabled:'disabled:border-[#ABABAB] disabled:shadow-[0px_10px_0px_0px_#ABABAB] ',
    }
return(
<button
className={`
    head-font
    w-full border-2 p-2 py-4 text-4xl  rounded-[10px]  transition-all
     ${disabled == true ? `bg-[#EEEEEE] text-[#ABABAB] ${theme.disabled} cursor-not-allowed` : `bg-white text-black-2 active:translate-y-[5px] cursor-pointer ${theme[color]}`}`}
onClick={onclick}
disabled={disabled}
>
   {text}
</button>)
}