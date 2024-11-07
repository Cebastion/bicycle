import { FC } from "react"
import { IBicycle } from "../interfaces/bicycle.interface"

const Bicycle: FC<IBicycle> = ({ name, Daily_income }) => {
  return (
    <div className="flex items-center gap-10">
      <img src="/assets/bicycle.png" alt="" className="w-32 h-32" />
      <h3>{name}</h3>
      <div className="flex gap-5">
        <div className="">
          <p>Estimated Daily Revenue</p>
          <p>{Daily_income}</p>
        </div>
      </div>
    </div>
  )
}


export default Bicycle
