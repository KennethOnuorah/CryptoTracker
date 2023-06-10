import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import "./SkeletonEntry.css"

const SkeletonEntry = () => {
  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#e0e0e0">
      <tr className="skeletonTableEntry">
        <th className="index">
          <Skeleton count={1}/>
        </th>
        <th className="name">
          <div>
            <Skeleton circle={true} count={1} width={25} height={25}/>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left"
          }}>
            <Skeleton count={1} width={60} height={13}/>
            <Skeleton count={1} width={30} height={13}/>
          </div>
        </th>
        <th>
          <Skeleton count={1}/>
        </th>
        <th>
          <Skeleton count={1}/>
        </th>
        <th>
          <Skeleton count={1}/>
        </th>
        <th>
          <Skeleton count={1}/>
        </th>
      </tr>
    </SkeletonTheme>
  )
}

export default SkeletonEntry
