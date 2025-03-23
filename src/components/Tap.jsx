import { useEffect, useState } from "react"

export function Tab({ IsMenu, setIsMenu }){
    const [category, setCategory] = useState([]) ;
    useEffect(()=>{
        const fetch_data = async()=>{
            try {
            const response = await fetch('/data/lessons.json');
            const data = await response.json();
            setCategory(data);
            console.log("Tab data: ", category); } catch (error) {
                console.error("Error fetching data:", error);
            }
        }


        fetch_data();
    }, [])
    return(
        <div className="w-full flex p-2 gap-4 bg-zinc-100  overflow-auto">
           
                {category.map((val, index)=>( 
                    <button
                    key={index}
                    className={`
                        ${IsMenu == index ? "bg-amber-200 rounded-full text-amber-800" : ""}
                        w-full cursor-pointer  p-2 whitespace-nowrap
                    `}

                    onClick={()=>{setIsMenu(index)}}
                    >
                    
                        {val.lesson}
                    </button>
            ))}
            
        </div>
    )    
}