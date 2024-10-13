import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/usercontext";

function LoginPage() {
  const { auth, saveUser } = useAuth();
  const navigate = useNavigate();

  // Effect to redirect if the user is already authenticated
  useEffect(() => {
    if (auth !== null) {
      navigate('/');
    }
  }, [auth, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/user/signin', data);
      toast.success(res.data.message);

      // Save user token in local storage
      localStorage.setItem('authToken', res.data.token); // Save token in local storage
      saveUser(res.data.token); // Save user in context
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    }
  };

  return (
    <div className="h-full w-1/2 flex flex-col p-6">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 border-4 border-[#733CE4]"></div>
        <div className="text-3xl text-[#733CE4] font-bold">LOGO</div>
      </div>

      <div className="flex flex-col px-40 py-20 gap-10">
        <div className="text-4xl font-bold">Welcome to Dashboard</div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="font-semibold text-xl">
            Email Address
            <input
              className="w-full border-2 border-zinc-400 p-4"
              type="text"
              id="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </label>

          <label htmlFor="password" className="font-semibold text-xl">
            Password
            <input
              className="w-full border-2 border-zinc-400 p-4"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </label>

          <div className="text-zinc-400 font-semibold cursor-pointer">Forgot Password?</div>

          <input
            className="bg-[#733CE4] rounded-full px-32 text-xl py-4 text-white font-semibold w-fit cursor-pointer"
            type="submit"
            value="Log In"
          />

          <div className="flex gap-3 text-zinc-400 font-semibold">
            Don't have an account?{" "}
            <Link to={"/"} className="text-[#733CE4] cursor-pointer">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
