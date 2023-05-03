import useAuth from "@/hooks/useAuth";
import { TvIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signUpUser, logInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
    firstName,
    lastName,
  }) => {
    if (isLogin) {
      await logInUser(email, password);
    } else {
      await signUpUser(email, password, firstName, lastName);
    }
  };

  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center justify-center
    bg-gradient-to-b from-gray-900/10 to-[#222222]"
    >
      <Head>
        <title>Boku Login</title>
        <link rel="icon" href="/boku-logo.png" />
      </Head>
      <Image
        src="/boku-bg.jpeg"
        fill
        className="-z-10"
        objectFit="cover"
        alt="Boku Stream Background"
      />
      <div
        className="absolute top-3 left-4 lg:left-10 lg:top-6 flex gap-x-1 
      items-center font-semibold cursor-pointer transition-all"
      >
        <TvIcon className="w-6 h-6 text-[#cae962]" />
        boku.stream
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full px-6 py-10 gap-y-10 bg-black/50
        md:max-w-md md:px-14 md:rounded-lg"
      >
        <h1 className="text-center font-bold text-4xl">
          {isLogin ? "Welcome back!" : "Create an Account"}
        </h1>
        <div className="flex flex-col gap-y-5">
          {!isLogin && (
            <div className="flex flex-col gap-y-1">
              <label className="text-sm text-[#939393]">First Name</label>
              <input
                {...register("firstName", { required: true })}
                type="text"
                placeholder="John"
                className="input"
              />
            </div>
          )}
          {!isLogin && (
            <div className="flex flex-col gap-y-1">
              <label className="text-sm text-[#939393]">Last Name</label>
              <input
                {...register("lastName", { required: true })}
                type="text"
                placeholder="Doe"
                className="input"
              />
            </div>
          )}
          <div className="flex flex-col gap-y-1">
            <label className="text-sm text-[#939393]">Email Address</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="example@gmail.com"
              className="input"
            />
          </div>
          <div>
            <label className="text-sm text-[#939393]">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="input"
            />
          </div>
          {isLogin && (
            <div className="flex justify-between">
              <div className="flex gap-x-2">
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label>Remember Me</label>
              </div>
              <button className="text-[#cae962]">Forgot password?</button>
            </div>
          )}
          <button className="w-full bg-[#cae962] text-black font-light py-2 rounded-md">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className="text-center mt-6">
            {isLogin ? "New to boku.stream? " : "Already have an account? "}
            <a
              className="text-[#cae962] cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create an account" : "Log in"}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
