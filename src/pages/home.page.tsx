import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/store";
import { logout } from "../redux/store/user";
import Navbar from "../components/navbar";
import LoadingComponent from "../common/common-jsx/loading";
import EventsComponent from "../components/events";
import events from "../test/event";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //logout start
  const handlerLogout = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.code === 200) {
          toast.success(response.data.message, {
            position: "top-left",
          });
          dispatch(logout());
          setIsLoading(false);
          navigate("/login");
        } else {
          toast.error("Logout Error");
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  //logout end

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="container">
      <Navbar handlerLogout={handlerLogout} />
      <h1>Home Page</h1>
      <EventsComponent events={events} />
    </div>
  );
};

export default HomePage;
