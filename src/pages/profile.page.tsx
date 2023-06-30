import React from "react";
import { useAppSelector } from "../redux/store";
import { userSelector } from "../redux/store/user";

const ProfilePage = () => {
  const user = useAppSelector(userSelector);
  console.log({ user });

  return (
    <div className="container">
      <h1>Profile</h1>
      {/* <h5>{user?._id}</h5>
      <h5>{user?.name}</h5>
      <h5>{user?.email}</h5> */}
    </div>
  );
};

export default ProfilePage;
