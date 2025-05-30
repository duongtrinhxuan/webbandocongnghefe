"use client"
import { useState } from "react";
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"
import { registerUser } from '@/services/UserService';

interface FormData {
   fname: string;
   lname: string;
   email: string;
   password: string;
   cpassword: string;
   birthDate: Date;
   address: string;
   phoneNumber: string;
}

const schema = yup
   .object({
      fname: yup.string().required().label("First Name"),
      lname: yup.string().required().label("Last Name"),
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().label("Password"),
      cpassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required().label("Confirm Password"),
      birthDate: yup.date().typeError("Birth Date is required").required().label("Birth Date"),
      address: yup.string().required().label("Address"),
      phoneNumber: yup.string().required().label("Phone Number"),
   })
   .required();

const RegistrationForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FormData) => {
      setLoading(true);
      try {
        await registerUser({
            accountName: `${data.fname} ${data.lname}`,
            email: data.email,
            password: data.password,
            birthDate: data.birthDate,
            address: data.address,
            phoneNumber: data.phoneNumber,
      });
         toast('Registration successfully', { position: 'top-center' });
         reset();
      } catch (error: any) {
         toast(error?.response?.data?.message || 'Registration failed', { type: "error", position: 'top-center' });
      } finally {
         setLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="row gutter-20">
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="fast-name">First Name</label>
                  <input type="text" {...register("fname")} id="fast-name" placeholder="First Name" />
                  <p className="form_error">{errors.fname?.message}</p>
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="last-name">Last name</label>
                  <input type="text" {...register("lname")} id="last-name" placeholder="Last name" />
                  <p className="form_error">{errors.lname?.message}</p>
               </div>
            </div>
         </div>
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} id="email" placeholder="email" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} id="password" placeholder="password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" {...register("cpassword")} id="confirm-password" placeholder="Confirm Password" />
            <p className="form_error">{errors.cpassword?.message}</p>
         </div>
         
         <div className="form-grp">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" {...register("phoneNumber")} id="phoneNumber" placeholder="Phone Number" />
            <p className="form_error">{errors.phoneNumber?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="birthDate">Birth Date</label>
            <input type="date" {...register("birthDate")} id="birthDate" placeholder="Birth Date" />
            <p className="form_error">{errors.birthDate?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="address">Address</label>
            <input type="text" {...register("address")} id="address" placeholder="Address" />
            <p className="form_error">{errors.address?.message}</p>
         </div>

         <button type="submit" className="btn btn-two arrow-btn" disabled={loading}>
             {loading ? "Đang đăng ký..." : <>Sign Up<BtnArrow /></>}
             </button>
      </form>
   )
}

export default RegistrationForm
