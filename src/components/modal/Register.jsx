import { useState } from "react";
import { Input, InputDropDown } from "../Input";
import { Button } from "../Button";

export function Register({is_open, set_isOpen}) {
  const [information, setInformation] = useState({
    std_code: "",
    name: "",
    class: "",
    room: "",
  });

  return (
    <div className="h-screen absolute w-full top-0 bg-neutral-900/80">
        is_open = {`${is_open}`}
      <div className="absolute flex flex-col items-center py-4 px-2 bg-[#E0DFD5] w-full h-[650px] overflow-auto bottom-0 rounded-t-2xl">
        <div className="w-full flex items-center justify-end">
          <button
          className="cursor-pointer"
          onClick={()=>{set_isOpen(false)}}
          > 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="m15.707,9.707l-2.293,2.293,2.293,2.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Zm8.293,2.293c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z" />
            </svg>
          </button>
        </div>
        <h1 className="head-font text-[40px] text-[#313638]">Who are you?</h1>
        <p className="head-font text-[16px] text-[#313638] font-[200]">
          Please, could you let me know.☺️
        </p>
        <div className="flex flex-col gap-5 mt-4">
          <Input
            name={"std_code"}
            value={information.std_code}
            placeholder="student code"
            label={"student code"}
            onChange={(e) => {
              const { name, value, nativeEvent } = e.target; // ดึงค่า name และ value จาก input
              const { data } = e.nativeEvent;

              if (
                (information.std_code.length >= 0 &&
                  information.std_code.length < 11) ||
                data == null
              ) {
                setInformation((prevState) => ({
                  ...prevState, // คัดลอกค่าที่มีอยู่ใน state ก่อนหน้า
                  [name]: value, // อัพเดตฟิลด์ที่ตรงกับ name ที่ถูกเปลี่ยนแปลง
                }));
              }
            }}
          />
          <Input
            name={"name"}
            value={information.name}
            placeholder="name"
            label={"name"}
            onChange={(e) => {
              const { name, value } = e.target; // ดึงค่า name และ value จาก input

              setInformation((prevState) => ({
                ...prevState, // คัดลอกค่าที่มีอยู่ใน state ก่อนหน้า
                [name]: value, // อัพเดตฟิลด์ที่ตรงกับ name ที่ถูกเปลี่ยนแปลง
              }));
            }}
          />
          <InputDropDown
            options={[
              { label: "ปวช.1", value: "ปวช.1" },
              { label: "ปวช.2", value: "ปวช.2" },
              { label: "ปวช.3", value: "ปวช.3" },
              { label: "ปวส.1", value: "ปวส.1" },
              { label: "ปวส.2", value: "ปวส.2" },
            ]}
            value={information.class}
            name={"class"}
            placeholder="class"
            label={"class"}
            onChange={(e) => {
              const { name, value } = e.target; // ดึงค่า name และ value จาก input
              console.log("class", { name, value });

              setInformation((prevState) => ({
                ...prevState, // คัดลอกค่าที่มีอยู่ใน state ก่อนหน้า
                [name]: value, // อัพเดตฟิลด์ที่ตรงกับ name ที่ถูกเปลี่ยนแปลง
              }));
            }}
          />

          <div className="mt-4">
            <Button
              color={"second"}
              text={"register"}
              onclick={() => {
                localStorage.setItem("user", JSON.stringify(information));
                window.location = "/";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
