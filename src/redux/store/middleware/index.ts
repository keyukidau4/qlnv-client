import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { logout } from "../user";

// const authMiddleware: Middleware<{}, RootState> =
//   (store) => (next) => (action) => {
//     if (action.type === "auth/logout") {
//       localStorage.setItem("user-info", "");
//     } else {
//         const isLoggedIn = //kiem tra login
//         if(!isLoggedIn) {
//             store.dispatch(logout())
//         }
//     }

//     return next(action)
//   };

//   export default authMiddleware
