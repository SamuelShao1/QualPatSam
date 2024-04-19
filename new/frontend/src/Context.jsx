import { createContext, useState } from "react";

export const Context=createContext();
const ContextProvider=(props)=>{

    const[input,setInput]=useState("")
    // display in main component
    const[recentPrompt,setRecentPrompt]=useState("")
    //display in recent tab
    const[prevPrompts,setPrevPrompts]=useState([])
    const[showResult,setShowResult]=useState(false)
    const[loading,setLoading]=useState(false)
    const[resultData,setResultData]=useState("")

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
          setResultData(prev=>prev+nextWord)
        },75*index)

    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)

    }

    const onSent=async(prompt)=>{
       setInput("")

    }

    



    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        loading,
        showResult,
        resultData,
        input,
        setInput,
        newChat


    }
    return(
        <Context.Provider value={contextValue }>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider