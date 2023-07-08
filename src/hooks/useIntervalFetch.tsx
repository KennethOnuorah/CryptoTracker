import axios from "axios"

import { useEffect } from "react"
import { useAppDispatch } from "./redux"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

interface UseIntervalFetchProps<T>{
  URL: string,
  interval: number,
  checkpoint: number,
  action: ActionCreatorWithPayload<T, string>
  fetchID: string
}

const useIntervalFetch = <T,>({ ...props } : UseIntervalFetchProps<T>) => {
  const dispatch = useAppDispatch()
  const fetch = async(): Promise<void> => {
    try {
      const timeLastFetched = JSON.parse(localStorage.getItem(`time_last_fetched_${props.fetchID}`) as string)
      const hasPassedCheckpoint = (Date.now() - timeLastFetched) >= props.checkpoint
      if(!hasPassedCheckpoint) return
      const res = await axios.get(props.URL)
      dispatch(props.action(res.data))
      console.log(`[${new Date().toLocaleTimeString('en-US')}] Response received from: \n${props.URL.slice(0, 40)}...`) 
    }
    catch (e) {
      console.error("Error:", e)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => fetch(), props.interval)
    return () => clearInterval(intervalId)
  }, [props.interval])
}

export default useIntervalFetch
