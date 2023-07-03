import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import LoadingComponent from "../common/common-jsx/loading";
import LoadingCss from "../common/common-jsx/loading-css";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setUser } from "../redux/store/user";

export type LoginInput = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //redirect
  const navigator = useNavigate();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInput>({
    mode: "onChange",
  });

  useEffect(() => {
    if (!errors) {
      reset();
    }
  });

  const dispatch = useAppDispatch();

  //submit to Login start
  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    setIsLoading(true);

    await axios
      .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/auth/login`, values, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response: ", response.data);
        if (response.data.code !== 200) {
          toast.error(response.data.error, { position: "top-right" });
          setIsLoading(false);
          navigator("/login");
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

          const responseData = response.data.user;

          dispatch(
            setUser({
              _id: responseData._id,
              email: responseData.email,
              name: responseData.username,
              role: responseData.role,
              department: responseData.department,
            })
          );

          navigator("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log({ error });

        toast.error("🔑パスワードかメールが間違っています！", {
          position: "top-right",
        });
        navigator("/login");
      });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  };
  //submit to Login end

  if (isLoading) {
    return <LoadingCss />;
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="content border border-success p-4"
        style={{ height: "80%" }}
      >
        <div className="text-center">
          <img
            alt="login"
            src={`${process.env.PUBLIC_URL}/login.jpeg`}
            style={{ width: "150px", height: "150px", borderRadius: "16px" }}
          />
          <h1 className="my-2">Login Page</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                required: "メールを入力してください。",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "ユーザーEmailの形式が不正です。",
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
                required: "パスワードを入力してください！",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,14}$/,
                  message:
                    "少なくとも 1 つの数字、1 つの大文字、1 つの小文字を含む 8 ～ 15 文字のパスワード",
                },
              })}
            />
            <span className="text-danger">
              {errors.password && errors.password.message}
            </span>
          </div>
          {/* {isLoading ? (
            // <div
            //   className="spinner-border text-info me-1"
            //   role="status"
            //   style={{
            //     width: "20px",
            //     height: "20px",
            //   }}
            // >
            //   <span className="visually-hidden">Loading...</span>
            // </div>
            <LoadingComponent />
          ) : (
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          )} */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <Link to={"/register"}>
            <p className="link-opacity-75">新登録？</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
