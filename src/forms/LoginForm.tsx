"use client"
import { useState } from "react";
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"
import { useRouter } from "next/navigation";
interface FormData {
   email: string;
   password: string;
}

const LoginForm = () => {

   const schema = yup
      .object({
         email: yup.string().required().email().label("Email"),
         password: yup.string().required().label("Password"),
      })
      .required();

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const [loading, setLoading] = useState(false);
   const router = useRouter();
   const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("https://localhost:7183/User/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        toast("Đăng nhập thành công!", { position: "top-center" });
        // Điều hướng theo role
        if (result.user.role === "Admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        reset();
      } else {
        const errorData = await response.json();
        toast(errorData.message || "Đăng nhập thất bại!", { type: "error", position: "top-center" });
      }
    } catch (error) {
      toast("Đã xảy ra lỗi khi đăng nhập", { type: "error", position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input id="email" {...register("email")} type="text" placeholder="email" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input id="password" {...register("password")} type="password" placeholder="password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="account__check">
            <div className="account__check-remember">
               <input type="checkbox" className="form-check-input" value="" id="terms-check" />
               <label htmlFor="terms-check" className="form-check-label">Remember me</label>
            </div>
            <div className="account__check-forgot">
               <Link href="/registration">Forgot Password?</Link>
            </div>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">Sign In<BtnArrow /></button>
      </form>
   )
}

export default LoginForm
