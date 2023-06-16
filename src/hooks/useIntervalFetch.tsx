import axios from "axios"

import { useEffect } from "react"
import { useAppDispatch } from "./redux"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

interface useIntervalFetchProps<T>{
  URL: string,
  interval: number,
  checkpoint: number,
  action: ActionCreatorWithPayload<T, string>
  fetchID: string
}

const useIntervalFetch = <T,>({ URL, interval, checkpoint, action, fetchID } : useIntervalFetchProps<T>) => {
  const dispatch = useAppDispatch()

  const fetch = async(): Promise<void> => {
    try {
      const timeLastFetched = JSON.parse(localStorage.getItem(`time_last_fetched_${fetchID}`) as string)
      const hasPassedCheckpoint = (Date.now() - timeLastFetched) >= checkpoint
      if(!hasPassedCheckpoint) return
      const res = await axios.get(URL)
      dispatch(action(res.data))
      console.log(`[${new Date().toLocaleTimeString('en-US')}] Response received from: \n${URL}`) 
    }
    catch (e) {
      console.error("Error:", e)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => fetch(), interval)
    return () => clearInterval(intervalId)
  }, [interval])
}

export default useIntervalFetch
