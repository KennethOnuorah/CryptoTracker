import axios from "axios"

import { useEffect } from "react"
import { useAppDispatch } from "./redux"
import { setPopularTrends } from "../../redux/slices/popularTrends"

const useTrends = (URL: string) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async() : Promise<void> => {
      const res = await axios.get(URL)
      dispatch(setPopularTrends([...res.data]))
    }
    fetchData()
  }, [])
}

export default useTrends
