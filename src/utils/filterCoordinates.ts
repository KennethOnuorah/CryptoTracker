import { Coordinate, TimeFilter } from "../helpers/types"

export const filterCoordinates = (list: Coordinate[], filter: TimeFilter) => {
  switch (filter) {
    case '1d':
      list = list?.slice(list.length - 24)
      return list
    case '3d':
      list = list?.slice(list.length - 72)
      return list
    case '5d': 
      list = list?.slice(list.length - 120)
      return list
    case '7d':
      return list
    default:
      break
  }
}
