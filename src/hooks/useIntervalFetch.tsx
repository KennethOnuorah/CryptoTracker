import axios from "axios"

import { useEffect } from "react"
import { useAppDispatch } from "./redux"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

interface useIntervalFetchProps<T>{
  URL: string,
  interval: number,
  action: ActionCreatorWithPayload<T[]>
}

const useIntervalFetch = <T,>({ URL, interval, action } : useIntervalFetchProps<T>) => {
  const dispatch = useAppDispatch()
  const fetch = async(): Promise<void> => {
    try {
      const res = await axios.get(URL)
      dispatch(action([...res.data]))
      window.localStorage.setItem("cryptocurrency_data", JSON.stringify([res.data]))
      window.localStorage.setItem("time_last_fetched", JSON.stringify(new Date()))
      console.log(`[${new Date().toLocaleTimeString('en-US')}] Response received from: \n${URL.slice(0, URL.length / 3)}...`) 
    }
    catch (e) {
      console.error("Error:", e)
    }
  }

  useEffect(() => {
    fetch()
    const intervalId = setInterval(() => fetch(), interval)
    return () => clearInterval(intervalId)
  }, [interval])
}

export default useIntervalFetch
