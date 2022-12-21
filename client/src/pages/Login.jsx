import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(login());
    navigate("/tasks");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-light-blue">
      <div className="bg-white p-6 rounded-[50px] w-4/5 flex flex-col max-w-[500px] z-50">
        <h1 className="text-4xl font-bold text-center mb-6">Log in</h1>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            name="E-mail"
            placeholder="Enter your email"
            type="email"
            {...register("Email", {
              required: "Email is required!",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
            errors={errors}
          />
          <Input
            name="Password"
            placeholder="Enter your password"
            type="password"
            {...register("Password", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long!",
              },
            })}
            errors={errors}
          />
          <Button className="w-fit m-auto mt-8" big text="Login" submit />
          <p className="text-center mt-4">
            Don't have an account ? Sign up{" "}
            <Link className="text-blue-600 z-50" to="/signup">
              here!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
