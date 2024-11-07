import { useState } from "react"
import { IRegistration } from "../interfaces/registration.interface"
import { UserService } from "../services/user.service"

const LogIn = () => {
  const [Form, SetForm] = useState<IRegistration>({ phone_number: "", password: "" })
  const [ShowPassword, SetShowPassword] = useState<boolean>(false)

  const ToggleShowPassword = () => {
    SetShowPassword(!ShowPassword)
  }

  const LogIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    UserService.LogIn(Form.phone_number, Form.password);
  };




  return (
    <main className="w-full h-full flex justify-center items-center">
      <form onSubmit={LogIn} className="p-2 w-80  border-black border-solid border-2 rounded-xl">
        <h2 className="text-center">Log in</h2>
        <div className="mt-3">
          <label htmlFor="">Phone</label>
          <input value={Form?.phone_number} onChange={(e) => SetForm({ ...Form, phone_number: e.target.value })} required placeholder="your phone" type="tel" className="w-full h-10 p-1 border-2 border-solid border-black rounded" />
        </div>
        <div className="mt-3">
          <label htmlFor="">Password</label>
          <div className="relative">
            <input value={Form?.password} onChange={(e) => SetForm({ ...Form, password: e.target.value })} required placeholder="your password" type={ShowPassword ? "text" : "password"} className="w-full h-10 p-1 border-2 border-solid border-black rounded" />
            <img onClick={ToggleShowPassword} src={ShowPassword ? "/assets/eye-open.svg" : "/assets/eye-closed.svg"} className="cursor-pointer absolute w-8 h-8 right-1 top-1" alt="" />
          </div>
        </div>
        {/*<a className="text-center block w-full mt-3">forgot password?</a>*/}
        <div className="flex justify-center w-full mt-3">
          <button className="w-[90%] bg-black h-10 text-white rounded">log in</button>
        </div>
        <span className="text-center block mt-3">Did you haven't an account? <a href="/signup">Sign up</a></span>
      </form>
    </main>
  )
}

export default LogIn
