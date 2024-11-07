

import { useState, useEffect } from "react";
import { IRegistration } from "../interfaces/registration.interface";
import { ValidatorService } from "../services/validator.service";
import { UserService } from "../services/user.service";

const SignUp = () => {
  const [form, setForm] = useState<IRegistration>({
    phone_number: "",
    password: "",
    name: "",
    password_reapet: ""
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordReapet, setShowPasswordReapt] = useState<boolean>(false);
  const [captchaAnswer, setCaptchaAnswer] = useState<string>("");
  const [captchaQuestion, setCaptchaQuestion] = useState<string>("");
  const [captchaSolution, setCaptchaSolution] = useState<number | null>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordReapet = () => {
    setShowPasswordReapt(!showPasswordReapet);
  };

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    setCaptchaQuestion(`What is ${num1} + ${num2}?`);
    setCaptchaSolution(num1 + num2);
  };

  useEffect(() => {
    generateCaptcha(); // Generate CAPTCHA on component mount
  }, []);

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    // Check if the user's answer matches the CAPTCHA solution
    if (captchaAnswer.trim() === "" || Number(captchaAnswer) !== captchaSolution) {
      alert("Please solve the CAPTCHA correctly.");
      return;
    }
    // Perform validation and signup process
    if (
      ValidatorService.ValidPasswordRepeat(form.password || "", form.password_reapet || "")
    ) {
      UserService.SignUp(form.phone_number || "", form.password || "", form.name || "");
    }
  };

  return (
    <main className="w-full h-full flex justify-center items-center">
      <form onSubmit={handleSignUp} className="p-2 w-80 border-black border-solid border-2 rounded-xl">
        <h2 className="text-center">Sign up</h2>
        <div className="mt-3">
          <label htmlFor="">Name</label>
          <input required placeholder="your name" type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full h-10 p-1 border-2 border-solid border-black rounded" />
        </div>
        <div className="mt-3">
          <label htmlFor="">Phone</label>
          <input required placeholder="your phone" type="tel"
            value={form.phone_number}
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            className="w-full h-10 p-1 border-2 border-solid border-black rounded" />
        </div>
        <div className="mt-3">
          <label htmlFor="">Password</label>
          <div className="relative">
            <input required placeholder="your password" type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full h-10 p-1 border-2 border-solid border-black rounded" />
            <img onClick={toggleShowPassword} src={showPassword ? "/assets/eye-open.svg" : "/assets/eye-closed.svg"}
              className="cursor-pointer absolute w-8 h-8 right-1 top-1" alt="" />
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="">Repeat Password</label>
          <div className="relative">
            <input required placeholder="repeat your password" type={showPasswordReapet ? "text" : "password"}
              value={form.password_reapet}
              onChange={(e) => setForm({ ...form, password_reapet: e.target.value })}
              className="w-full h-10 p-1 border-2 border-solid border-black rounded" />
            <img onClick={toggleShowPasswordReapet} src={showPasswordReapet ? "/assets/eye-open.svg" : "/assets/eye-closed.svg"}
              className="cursor-pointer absolute w-8 h-8 right-1 top-1" alt="" />
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="">CAPTCHA</label>
          <div className="mt-1">{captchaQuestion}</div>
          <input
            type="text"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            className="w-full h-10 p-1 border-2 border-solid border-black rounded"
            placeholder="Your answer"
            required
          />
        </div>
        <div className="flex justify-center w-full mt-3">
          <button type="submit" className="w-[90%] bg-black h-10 text-white rounded">Sign Up</button>
        </div>
        <span className="text-center block mt-3">Have you an account? <a href="">Log in</a></span>
      </form>
    </main>
  );
};

export default SignUp;

