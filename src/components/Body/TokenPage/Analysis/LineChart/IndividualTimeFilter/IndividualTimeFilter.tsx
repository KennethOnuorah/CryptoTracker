import { TimeFilter } from '../../../../../../helpers/types'
import './IndividualTimeFilter.css'

interface IndividualTimeFilterProps{
  timeFilter: TimeFilter
  currentTimeFilter: TimeFilter
  dispatch: React.Dispatch<React.SetStateAction<TimeFilter>>
  children: React.ReactNode
}

const IndividualTimeFilter = ({ currentTimeFilter, timeFilter, dispatch, children } : IndividualTimeFilterProps) => {
  return (
    <button
      className='timeFilter'
      onClick={() => dispatch(timeFilter)}
      style={{
        backgroundColor: currentTimeFilter === timeFilter ? "#c0c0c0" : '#E5E5E5'
      }}
    >
      {children}
    </button>
  )
}

export default IndividualTimeFilter
