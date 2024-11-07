import { useEffect, useState } from "react"
import Bicycle from "../components/Bycycle"
import { IUser } from "../interfaces/user.interface"
import { UserService } from "../services/user.service"
import { IBicycle } from "../interfaces/bicycle.interface"

const Dashboard = () => {
  const [UserData, SetUserData] = useState<IUser>()
  const [Bicycles, SetBicycles] = useState<IBicycle[]>()

  const GetUser = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const TokenParse = JSON.parse(token)
      const data = await UserService.GetUser(TokenParse)
      const bicycles = await UserService.GetBicyclesByID(TokenParse)
      SetUserData(data)
      SetBicycles(bicycles)
    }
  }

  useEffect(() => {
    GetUser()
  }, [])
  return (
    <main className="w-full h-full flex flex-col items-center mt-3">
      <div className="p-3 border-black border-2 border-solid rounded">
        <div className="">
          <div className="">
            <h2>{UserData?.user.name}</h2>
            <span>{UserData?.user.phone_number}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span>Score: {UserData?.user.score}</span></div>
      </div>
      <div className="p-3 border-black border-2 border-solid mt-3 rounded">
        <h2>Bicycle</h2>
        <div className="overflow-y-scroll h-28">
          {Bicycles?.map(bicycle => (
            <Bicycle key={bicycle.id} name={bicycle.name} Daily_income={bicycle.Daily_income} id={bicycle.id} userID={bicycle.userID} />
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <button className="mt-3 bg-black text-white rounded p-3" onClick={() => window.location.assign("/withdraw")}>Withdraw</button>
        <button className="mt-3 bg-black text-white rounded p-3" onClick={() => window.location.assign("/shop")}>Shop</button>
      </div>
    </main>
  )
}

export default Dashboard
