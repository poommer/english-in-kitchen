import { useState } from "react";
import { Button } from "../../components/Button";
import { Register } from "../../components/modal/Register";

export function Homepage() {
    const [is_open, set_isOpen] = useState(false)

    return(
      <div className={`relative h-screen  p-4 flex flex-col justify-between items-center`}>
        <div className="w-full">
            <h1 className="text-7xl text-white drop-shadow-[2px_2px_2px_black] text-stroke-black">English  in</h1>
            <h1 className="text-8xl text-white text-stroke drop-shadow-[2px_2px_2px_black] mt-2"> Kitchen</h1>
        </div>

        <div className="relative">
            <img src="/icon/chef.png" alt="" />
            
            <img src="/icon/pancake.png" alt=""
            className="absolute top-[19rem] left-0"
            />

            <img src="/icon/cup.png" alt=""
            className="absolute right-0 bottom-[-7rem] transform-gpu"
            />

        </div>

        <div className="w-full">
            <div className="w-full mt-28 mb-16">
                <Button
                color={'second'}
                text={'start'}
                onclick={()=>{set_isOpen(true)}}
                />
            </div>
        </div>
        {is_open === true ? <Register Is_open={is_open} set_isOpen={set_isOpen}  /> : 'not open'}
      </div>

    
    )
    }
    