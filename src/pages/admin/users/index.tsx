import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import "../../../styles/common/table.css";
import { UserType } from "../../../redux/store/user/type";
import axios from "../../../utils/axios";
import LoadingCss from "../../../common/common-jsx/loading-css";
import ModalComponent from "../../../components/feature/modal";
import { useAppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/store/user";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableComponent from "../../../components/feature/table";

const UsersDashboard: () => JSX.Element = (): JSX.Element => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<UserType>();
  const [addUser, setAddUser] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  //get data function
  const getListUsers: () => Promise<void> = async (): Promise<void> => {
    return await axios
      .get("admin/users", { withCredentials: true })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log({ error });
        if (error.response && error.response.status === 404) {
          dispatch(logout());
          toast.error("セッション切れ！", {
            position: "top-left",
          });
          navigate("/login");
          return;
        }
        if (error.response && error.response.status === 400) {
          toast.error("Update Failed", {
            position: "top-left",
          });
          return;
        }
      });
  };

  // get users data
  useEffect((): (() => void) => {
    setIsLoading(true);
    const response: () => Promise<void> = async (): Promise<void> => {
      await getListUsers();
    };
    response();
    const timer: NodeJS.Timeout = setTimeout((): void => {
      setIsLoading(false);
    }, 2000);
    return (): void => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //add new user
  const handleChange = () => {
    setAddUser(true);
  };
  const handleAddNewUser: (
    name: string,
    email: string,
    role: string,
    department: string
  ) => void = (
    name: string,
    email: string,
    role: string,
    department: string
  ): void => {
    console.log(`${name! + email + role + department}`);
  };

  //loading page
  if (isLoading) {
    return <LoadingCss />;
  }

  const handleModal: (user: UserType) => void = (user: UserType): void => {
    setUserModal(user);
  };

  const handleCloseModal: () => void = (): void => {
    setUserModal(undefined);
    setAddUser(false);
  };

  const handleEditSubmit: (
    _id: string,
    name: string,
    email: string,
    role: string,
    department: string
  ) => Promise<void> = async (
    _id: string,
    name: string,
    email: string,
    role: string,
    department: string
  ): Promise<void> => {
    setIsLoading(true);
    const user = {
      username: name,
      email,
      role,
      department,
    };

    await axios
      .put(
        "admin/update-user",
        { _id, user },
        {
          withCredentials: true,
        }
      )
      .then(async (response): Promise<void> => {
        toast.success("Update Successfully!", {
          position: "top-right",
        });
        setIsLoading(false);
        await getListUsers();
        return;
      })
      .catch((error): void => {
        setIsLoading(false);
        if (error.response && error.response.status === 404) {
          dispatch(logout());
          toast.error("セッション切れ！", {
            position: "top-left",
          });
          navigate("/login");
          return;
        }
        if (error.response && error.response.status === 400) {
          toast.error("Update Failed", {
            position: "top-left",
          });
          return;
        }
      });

    const timer: NodeJS.Timer = setTimeout((): void => {
      setIsLoading(false);
    }, 2000);
    return clearTimeout(timer);
  };

  return (
    <div className="container">
      <Navbar home={"/admin-dashboard"} list={["users"]} />
      <div className="d-flex justify-content-between my-3">
        <h1>User Dashboard</h1>
        <button
          className="btn btn-outline-primary p-2"
          onClick={() => handleChange()}
        >
          Add New
        </button>
      </div>
      <div className="row p-3">
        <TableComponent users={users} handleModal={handleModal} />
      </div>
      {userModal && (
        <ModalComponent
          user={userModal}
          handleCloseModal={handleCloseModal}
          handleEditSubmit={handleEditSubmit}
        />
      )}
      {addUser && (
        <ModalComponent
          addUser={addUser}
          handleCloseModal={handleCloseModal}
          handleAddNewUser={handleAddNewUser}
        />
      )}
    </div>
  );
};

export default UsersDashboard;
