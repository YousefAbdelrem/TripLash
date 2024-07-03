import { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Nav Bar/NavBar";

import { AuthContext } from "./components/Authentication/AuthContext";
import AdminNavBar from "./components/Admin Dashboard/adminNavBar";

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { isAdmin } = authContext;
  return (
    <>
      {!isAdmin ? <NavBar /> : <AdminNavBar />}

      <Outlet />
    </>
  );
}

// const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
//   const authContext = useContext(AuthContext);

//   if (!authContext) {
//     return null;
//   }

//   const { token } = authContext;

//   return token ? children : <Navigate to="/Login" />;
// };

export default App;
