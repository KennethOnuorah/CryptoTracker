import { useRef } from 'react'
import { TimeFilter } from '../../../../../../helpers/types'

import './ToggleTimeFilter.css'

interface ToggleTimeFilterProps{
  dispatch: React.Dispatch<React.SetStateAction<TimeFilter>>
}

const ToggleTimeFilter = ({ dispatch } : ToggleTimeFilterProps) => {
  const timeFilters = ['1d', '3d', '5d', '7d']
  const currentIndex = useRef(1)

  const toggleNewTimeFilter = (index: number) => {
    switch (timeFilters[index]) {
      case '1d':
        dispatch('1d')
        break
      case '3d':
        dispatch('3d')
        break
      case '5d':
        dispatch('5d')
        break
      case '7d':
        dispatch('7d')
        break
      default:
        console.warn(timeFilters[index], "is not a valid time filter.")
        break
    }
  }

  return (
    <button 
      className="timeFilter"
      onClick={() => {
        currentIndex.current = currentIndex.current + 1 < timeFilters.length ? currentIndex.current + 1 : 0
        toggleNewTimeFilter(currentIndex.current)
      }}
    >
      {timeFilters[currentIndex.current]}
    </button>
  )
}

export default ToggleTimeFilter
