//use client means yeh jo component hum bana rahy hain wo browser pr chaly ga
"use client";

//yeh sub nichy react ky functions hain
//use state: data ya value ko store krny mai help krta hai
//use reference: refernce bnany mai help krey ga
//use effect: yeh function ksi kam ko repeat krny ky liye use hota hai
//change event: yeh btata hai kay input field mai jo change horaha wo ek event ky through horha
//means yahn hum bta rahy kay yeh charon react say import kia hai
import { useState, useRef, useEffect, ChangeEvent } from "react";

//yahn bta rhy ky input or button humnay component ek folder hai usky andr ui ek folder hai usmy button.tsx hai or input.tsx hai wahn say import kia hai dono ko
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//now making countdown function:
//duration: pr timer set hoga
//set duration: woh function hai jo value ko update krny ky liye use hoga
export default function Countdown (){
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);    //yeh state remaining time ko yad rakhny ky liye use hoga
    const [isActive, setisActive] = useState<boolean>(false);   //yahn boolean value btaye gi ky timer chal raha ya nhi
    const [isPaused, setisPaused] = useState<boolean>(false);   //yahn boolean value btaye gi kay timer ruk gaya hai ya nhi
    const timeRef = useRef<NodeJS.Timeout | null>(null);   //yeh reference hai jo timer id ko yad rakhny ky liye use hota hai takay ap timer ko control krskain e.g start krna , pause ya set krna  or reset krna.

    //ab duration set krny ka function bnayengy
    //void : means yeh function kuch bhi return nhi krey ga
    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0){     //means jo bhi user input dey wo number ho or greater than 0 ho.
            setTimeLeft(duration);   
            setisActive(false); //yeh wala function or nichy wala dono timer ko reset krdetay hain takay timer phir say shuru hoskay
            setisPaused(false);
            if(timeRef.current){     //means agar koi purana timer chal raha ho to wo usay rok dey or new timer start krdey 
                clearInterval(timeRef.current);
            }
        }
    };

    //ab timer start krny ka function bnana hai
    const handleStart = (): void => {      //yeh function jb chly ga jb ap start ky button pr click kraingy
        if(timeLeft > 0) {                 //yeh condition yeh chk krey gi ky timer ka time abhi khatm nh hua hai mtlb 0 say zyada hai 0 nhi hua hai timer mai
            setisActive(true);    //yeh timer ko start krny ky liye true rkha hai
            setisPaused(false);    //yahn false rkha hai taky ruky huay timer ko unpause krskay
        }
    };

    //ab timer ko pause krny ka function bnana hai means user jb pause pr click krey to timer pause hojaye
    const handlePause = (): void => {
        if(isActive){      //yani agr timer active hai to usay pause krdo
            setisPaused(true);    //timer ko pause krdo
            setisActive(false);
            if(timeRef.current){                //koi bhi timer chal raha hoga woh timer ko rok dega
                clearInterval(timeRef.current)
            }
        }
    };

    //ab timer ko reset krny ka function bnana hai:
    const handleReset = (): void => {           //jb user reset ka button click krey ga to yeh function chly ga
        setisActive(false);                     //yeh timer ko band krdega
        setisPaused(false);                     //yeh timer ko unpause krdey ga yahn false kia hai 
        setTimeLeft(typeof duration === "number"? duration : 0)    //yeh condition timer ko jb reset krain gay tou pr le ayega mtln 0 pr timer ajayega 
        if(timeRef.current){
            clearInterval(timeRef.current)        //jo timer chal raha hoga usay clear interval ky through timer ko clear krdega
        }
    };

    //ab apny timer ko chalana hai:
    useEffect(() => {
        if(isActive && !isPaused){     //means agr timer chal raha hai or pause nhi hai to yeh block execute hoga
            timeRef.current = setInterval(() => {     //yeh function har ek second ky bad timer ka waqt kum krey ga means timer chalta hai to waqt ek ek second kum hota jata hai
                setTimeLeft((prevTime) => {           
                    if(prevTime <= 1) {
                    clearInterval(timeRef.current!);
                    return 0;
                }
                return prevTime -1;               //yeh timer ki value ko update krdega jesay hi phir 0 hoga means value 0 hogaye 1 say kum hojaye to timer ko stop krdo
            });
            }, 1000);
        };
        //now make cleanup function:
        //jb bhi component band hota hai ya phir variables change hotay hain to timer ko clear krdega
        return () => {
            if(timeRef.current){
                clearInterval(timeRef.current)
            }
        };
    }, [isActive, isPaused]);

    //ab time ko format krna hai (yeh function jo bnayengy wo time ko minutes ko or minutes ko seconds mai convert krdeyga)

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time/60);                 //math.floor = va;ue ko roundoff krta hai, yeh line time ko minutes mai convert krdegi
        const seconds = time % 60;                           //yeh line time ko seconds mai convert kreygi
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`            //yeh line ka maksad hai kay koi number single digit mai given ho like 9 seconds to us single digit kay agay 0 lg jaye like jb timer chly to '09, phir 08 and so on 01'    }
    }

    //ab input values ko handle krna (means jb bhi koi user input krey ka to yeh time set krey ga)
    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");        //e.target.value : means jb user input field mai type krey ga like 10 seconds ka timer chlao etc, and this line means jo bhi value aye wo number mai convert ho (blank value na ho "")
    }

    //yeh nichy wala code copy paste kia hai discord project say
    // JSX return statement rendering the Countdown UI
  return (
    // Container div for centering the content
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Timer box container */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        {/* Input and set button container */}
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Set
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

