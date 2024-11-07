import { FC } from "react"
import { IProduct } from "../interfaces/product.interface"

const Product: FC<IProduct> = ({ name, price, income, id }) => {
  return (
    <div className="p-3 border-black border-solid border-2 rounded w-full">
      <img src="/assets/bicycle.png" alt="" className="w-32 h-28" />
      <div className="">
        <p>Equipment prices: {price}</p>
        <p>Daily income: {income}</p>
      </div>
      <h2>{name}</h2>
      <button className="w-full mt-3 bg-black text-white rounded p-3" onClick={() => window.location.assign(`/buy/${id}`)}>Buy</button>
    </div>
  )
}

export default Product
