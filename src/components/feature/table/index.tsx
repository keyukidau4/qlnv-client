import React from "react";
import { UserType } from "../../../redux/store/user/type";

export type Props = {
  users: Array<UserType>;
  handleModal: (user: UserType) => void;
};

const TableComponent: ({ users, handleModal }: Props) => JSX.Element = ({
  users,
  handleModal,
}: Props): JSX.Element => {
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
  return (
    <div>
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
                  <span onClick={() => handleModal(user)}>&#9997;</span>
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
  );
};

export default TableComponent;
