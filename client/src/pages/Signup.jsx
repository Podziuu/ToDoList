import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/auth-slice";
import axios from "axios";

import Button from "../components/Button";
import Input from "../components/Input";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );
      console.log(response);
      console.log(data);
      dispatch(
        login({ userId: response.data.userId, token: response.data.token })
      );
      navigate("/tasks");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-light-blue">
      <div className="bg-white p-6 rounded-[50px] w-4/5 flex flex-col max-w-[500px]">
        <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            name="Name"
            placeholder="Enter your name"
            type="text"
            errors={errors}
            {...register("name", {
              required: "Name is required!",
            })}
          />
          <Input
            name="E-mail"
            placeholder="Enter your email"
            type="email"
            errors={errors}
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            name="Password"
            placeholder="Enter your password"
            type="password"
            errors={errors}
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters long!",
              },
            })}
          />
          {/* <Input
            name="Confirm Password"
            placeholder="Enter your password"
            type="password"
            errors={errors}
            {...register("CPassword", {
              required: "Please repeat your password!",
            })}
          /> */}
          <Button className="w-fit m-auto mt-8" big text="Sign Up" submit />
        </form>
        <p className="text-center mt-4">
          Have an account ? Log in{" "}
          <Link className="text-blue-600" to="/login">
            here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
