import Product from "../components/Product"
import { bicycles } from "../list/bicycle.list"

const Shop = () => {
  return (
    <div className="flex gap-5 justify-center items-center px-5 h-full">
      {bicycles.map(bicycle => (
        <Product key={bicycle.id} name={bicycle.name} price={bicycle.price} income={bicycle.income} id={bicycle.id} />
      ))}
    </div>
  )
}

export default Shop
