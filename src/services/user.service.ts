import axios from "axios";
import { IUser } from "../interfaces/user.interface";
import { IBicycle } from "../interfaces/bicycle.interface";

export class UserService {

  static async GetBicyclesByID(token: string) {
    try {
      const { data } = await axios.get<IBicycle[]>(`https://bicycleserver.vercel.app/bicycle/`, {
        headers: {
          Authorization: `Bearer ${token}`  // Добавляем токен в заголовок
        }
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        alert(error.response.data.error);
        window.location.assign("/");
      } else {
        console.error("Unexpected error:", error);  // Логируем другие ошибки
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  }

  static async GetUser(token: string) {
    try {
      console.log(token)
      const { data } = await axios.get<IUser>(`https://bicycleserver.vercel.app/user/`, {
        headers: {
          Authorization: `Bearer ${token}`  // Добавляем токен в заголовок
        }
      });
      sessionStorage.setItem("User", JSON.stringify(data))
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        alert(error.response.data.error);
        window.location.assign("/");
      } else {
        console.error("Unexpected error:", error);  // Логируем другие ошибки
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  }

  static async SignUp(phone_number: string, password: string, name: string) {
    try {
      const { data } = await axios.post("https://bicycleserver.vercel.app/user/signup", { name, phone_number, password })
      console.log(data)
      sessionStorage.setItem("User", JSON.stringify(data))
      sessionStorage.setItem("token", JSON.stringify(data.token))
      window.location.assign("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        alert(error.response.data.error)
        window.location.assign("/")
      }
    }
  }

  static async LogIn(phone_number: string, password: string) {
    try {
      const { data } = await axios.post("https://bicycleserver.vercel.app/user/login", { phone_number, password })
      sessionStorage.setItem("User", JSON.stringify(data))
      sessionStorage.setItem("token", JSON.stringify(data.token))
      window.location.assign("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        alert(error.response.data.error)
        window.location.assign("/")
      }
    }
  }

  static async Buy(userID: number, name: string, Daily_income: number, token: string) {
    try {
      const { data } = await axios.post("https://bicycleserver.vercel.app/bicycle", { userID, name, Daily_income }, {
        headers: {
          Authorization: `Bearer ${token}`  // Добавляем токен в заголовок
        }
      })
      alert(data)
      window.location.assign("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        alert(error.response.data.error)
        window.location.assign("/dashboard")
      }
    }
  }

  static async Withdraw(amount: number, address: string, token: string) {
    try {
      await axios.post("https://bicycleserver.vercel.app/payment/withdraw", { amount, address }, {
        headers: {
          Authorization: `Bearer ${token}`  // Добавляем токен в заголовок
        }
      })
      window.location.assign("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        alert(error.response.data.error)
        window.location.assign("/dashboard")
      }
    }
  }
}
