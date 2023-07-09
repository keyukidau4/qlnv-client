import axios from "axios";
import { useAppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { logout } from "../../redux/store/user";
import { useNavigate } from "react-router-dom";

const AuthService = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerLogout = async () => {
    const values: string = "";
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/logout`,
        { values },
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
          navigate("/login");
        } else {
          toast.error("Logout Error");
        }
      })
      .catch((error) => {
        console.log({ error });

        toast.error(error.message);
      });
  };
  return { handlerLogout };
};

export default AuthService;
