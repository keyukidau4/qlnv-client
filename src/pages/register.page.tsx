import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/register.css";
import LoadingCss from "../common/common-jsx/loading-css";

export type RegisterInput = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    mode: "onChange",
  });

  useEffect(() => {
    if (!errors) {
      reset();
    }
  });

  // const [password, setPassword] = useState<string>("");
  const password = watch("password");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    console.log({ values });
    setIsLoading(true);

    const requestValue = {
      ...values,
      username: values.name,
      role: "development",
      department: "system solution",
    };

    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/register`,
        requestValue,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("response: ", response.data);
        if (response.data.code !== 200) {
          toast.error(response.data.error, { position: "top-right" });
        } else {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });

          navigate("/login");
        }
      });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  if (isLoading) {
    return <LoadingCss />;
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="content p-3">
        <div className="text-center my-3">
          <h1>Register Page</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              {...register("name", {
                required: "名前を入力してください！",
                max: { value: 20, message: "20字以下を入力してください！" },
              })}
            />
            <span className="text-danger">
              {errors.name && errors.name.message}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              {...register("email", {
                required: "メールを入力してください！",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "メールの形式が不正です。",
                },
              })}
            />
            <span className="text-danger">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              {...register("password", {
                required: "🔑パスワードを入力してください！",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,14}$/,
                  message:
                    "少なくとも 1 つの数字、1 つの大文字、1 つの小文字を含む ８ ～ 15 文字のパスワード",
                },
              })}
            />
            <span className="text-danger">
              {errors.password && errors.password.message}
            </span>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              {...register("confirmPassword", {
                required: "確認用パスワードを入力してください！",
                validate: (value) =>
                  value === password || "パスワードと一致しません！",
              })}
            />
            <span className="text-danger">
              {errors.confirmPassword && errors.confirmPassword.message}
            </span>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
