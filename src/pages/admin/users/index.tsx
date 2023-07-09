import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import "../../../styles/common/table.css";
import { UserType } from "../../../redux/store/user/type";
import axios from "../../../utils/axios";
import LoadingCss from "../../../common/common-jsx/loading-css";
import { AxiosResponse } from "axios";
import ModalComponent from "../../../components/feature/modal";

const UsersDashboard: () => JSX.Element = (): JSX.Element => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<UserType>();
  // const [showModal,setShowModal] =

  //get data function
  const getListUsers: () => Promise<
    AxiosResponse<any, any>
  > = async (): Promise<AxiosResponse<any, any>> => {
    return await axios.get("admin/users", { withCredentials: true });
  };

  //get users data
  // useEffect((): (() => void) => {
  //   setIsLoading(true);
  //   const response: () => Promise<void> = async (): Promise<void> => {
  //     const res: AxiosResponse<any, any> = await getListUsers();
  //     console.log({ res });
  //     setUsers(res.data.users);
  //   };
  //   response();
  //   const timer: NodeJS.Timeout = setTimeout((): void => {
  //     setIsLoading(false);
  //   }, 2000);
  //   return (): void => clearTimeout(timer);
  // }, []);

  //loading page
  if (isLoading) {
    return <LoadingCss />;
  }

  const userForTest = {
    _id: "sds",
    username: "Mark",
    email: "Otto@gmail.com",
    role: "@develop",
    department: "System Develop",
  };
  const userForTest1 = {
    _id: "sds",
    username: "Jean",
    email: "jean@gmail.com",
    role: "@develop",
    department: "System Develop",
  };

  const handleModal = (user: UserType) => {
    setUserModal(user);
  };

  const handleCloseModal: () => void = (): void => {
    setUserModal(undefined);
  };

  const handleEditSubmit: (
    name?: string,
    email?: string,
    role?: string,
    department?: string
  ) => void = (
    name?: string,
    email?: string,
    role?: string,
    department?: string
  ): void => {
    console.log(`${name! + email + role + department}`);
  };

  return (
    <div className="container">
      <Navbar home={"/admin-dashboard"} list={["users"]} />
      <h1>User Dashboard</h1>
      <div className="row p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Department</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, id) => (
              <tr key={id}>
                <th scope="row">{id + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.department}</td>
                <td>
                  <div className="d-flex">
                    {/* <button className="btn btn-outline-primary">info</button> */}
                    <span
                      data-bs-toggle="modal"
                      // data-bs-target={`#editUser${id}Modal`}
                      // data-bs-whatever="@getbootstrap"
                      onClick={() => {}}
                    >
                      &#9997;
                    </span>
                    {/* <ModalComponent index={1} user={userForTest} /> */}
                    <span
                      style={{
                        marginLeft: "15px",
                      }}
                      onClick={() => alert("Clicked")}
                    >
                      &#128465;
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto@gmail.com</td>
              <td>@develop</td>
              <td>System Develop</td>
              <td>
                <div className="d-flex">
                  {/* <button className="btn btn-outline-primary">info</button> */}
                  <span onClick={() => handleModal(userForTest)}>&#9997;</span>
                  <span
                    style={{
                      marginLeft: "15px",
                    }}
                    onClick={() => alert("Clicked")}
                  >
                    &#128465;
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Jean</td>
              <td>Jean@gmail.com</td>
              <td>@develop</td>
              <td>System Develop</td>
              <td>
                <div className="d-flex">
                  <span onClick={() => handleModal(userForTest1)}>&#9997;</span>
                  <span
                    style={{
                      marginLeft: "15px",
                    }}
                    onClick={() => alert("Clicked")}
                  >
                    &#128465;
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {userModal && (
        <ModalComponent
          user={userModal}
          handleCloseModal={handleCloseModal}
          handleEditSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default UsersDashboard;
