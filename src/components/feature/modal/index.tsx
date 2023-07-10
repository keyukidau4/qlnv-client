import React, { useState } from "react";
import { UserType } from "../../../redux/store/user/type";

export type Props = {
  user?: UserType;
  addUser?: boolean;
  handleCloseModal: () => void;
  handleEditSubmit?: (
    _id: string,
    name: string,
    email: string,
    role: string,
    department: string
  ) => void;
  handleAddNewUser?: (
    name: string,
    email: string,
    role: string,
    department: string
  ) => void;
};

const ModalComponent: ({
  user,
  addUser,
  handleCloseModal,
  handleEditSubmit,
  handleAddNewUser,
}: Props) => JSX.Element = ({
  user,
  addUser,
  handleCloseModal,
  handleEditSubmit,
  handleAddNewUser,
}: Props): JSX.Element => {
  const [name, setName] = useState<string | "">(user?.username || "");
  const [userEmail, setUserEmail] = useState<string | "">(user?.email || "");
  const [userRole, setUserRole] = useState<string | "">(user?.role || "");
  const [userDepartment, setUserDepartment] = useState<string | "">(
    user?.department || ""
  );

  const handleClick = () => {
    console.log(`${name} ${userEmail} ${userRole} ${userDepartment}`);
    if (user && handleEditSubmit) {
      handleEditSubmit(user._id, name, userEmail, userRole, userDepartment);
    }
    if (addUser && handleAddNewUser) {
      handleAddNewUser(name, userEmail, userRole, userDepartment);
    }
    handleCloseModal();
  };

  return (
    <div
      className={`modal fade ${user?.username || addUser ? "show " : ""}`}
      tabIndex={-1}
      style={{
        display: user?.username || addUser ? "block" : "none",
        backgroundColor: "rgba(0,0,0,.4)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{name}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="col-form-label">
                User Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete={`${name}`}
                className="form-control"
                value={`${name}`}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userEmail" className="col-form-label">
                Email:
              </label>
              <input
                type="text"
                id="userEmail"
                name="userEmail"
                className="form-control"
                value={`${userEmail}`}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userRole" className="col-form-label">
                Role:
              </label>
              <input
                type="text"
                id="userRole"
                name="userRole"
                className="form-control"
                value={`${userRole}`}
                onChange={(e) => setUserRole(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userDepartment" className="col-form-label">
                Department:
              </label>
              <input
                type="text"
                id="userDepartment"
                name="userDepartment"
                className="form-control"
                value={`${userDepartment}`}
                onChange={(e) => setUserDepartment(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleClick}
              className="btn btn-primary"
            >
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
