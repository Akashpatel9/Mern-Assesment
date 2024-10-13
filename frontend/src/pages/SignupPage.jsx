import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data.confirmPassword , data.password);
    
    if (data.confirmPassword != data.password) {
      toast.error("Password and Confirm Password must be the same");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/user/signup", data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="h-full w-1/2 flex flex-col p-6">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 border-4 border-[#733CE4]"></div>{" "}
        <div className="text-3xl text-[#733CE4] font-bold">LOGO</div>
      </div>

      <div className="flex flex-col px-52 py-10 gap-10">
        <div className="text-4xl font-bold">Welcome to Dashboard</div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="Full Name" className="font-semibold text-xl">
            Full Name
            <input
              className="w-full border-2 border-zinc-400 p-4"
              type="text"
              id="Full Name"
              placeholder="Full Name"
              {...register("fullName")}
              required={true}
            />
          </label>

          <label htmlFor="email" className="font-semibold text-xl">
            Email Address
            <input
              className="w-full border-2 border-zinc-400 p-4"
              type="text"
              id="email"
              placeholder="Email Address"
              {...register("email")}
              required={true}
            />
          </label>

          <label htmlFor="password" className="font-semibold text-xl">
            Password
            <input
              className="w-full border-2 border-zinc-400 p-4"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
              required={true}
            />
          </label>

          <label htmlFor="conformPassword" className="font-semibold text-xl">
            Conform Password
            <input
              className="w-full border-2 border-zinc-400 p-4"
              type="password"
              id="conform password"
              placeholder="Conform Password"
              {...register("confirmPassword")}
              required={true}
            />
          </label>

          <input
            className="bg-[#733CE4] rounded-full px-32 text-xl py-4 text-white font-semibold w-fit cursor-pointer"
            type="submit"
            value="Register"
          />

          <div className="flex gap-3 text-zinc-400 font-semibold">
            Already have an account?{" "}
            <Link to={"/signin"} className="text-[#733CE4] cursor-pointer">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
