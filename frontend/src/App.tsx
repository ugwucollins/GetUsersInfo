import { Routes, Route, useNavigate } from "react-router-dom";
import Home, { VITE_API_URL } from "./component/Home";
import Users from "./component/Users";
import Dashboard, { NotAuth } from "./component/Dashboard";
import { useEffect, useState } from "react";
import UsersDetails from "./component/UsersDetails";

const App = () => {
  const userName: any = localStorage.getItem("user");
  const location: any = localStorage.getItem("path");
  const [user, setuser]: any = useState(JSON.parse(userName));
  const [filterUsers, setfilterUsers] = useState([]);

  const fetchUser = async () => {
    if (user) {
      const res = await fetch(
        `${VITE_API_URL}/${user && user.id}/${user && user.email}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      if (data.success) {
        const UserInfo = {
          id: data.user._id,
          firstName: data.user.firstName,
          email: data.user.email,
          role: data.user.userRole,
        };
        setuser(UserInfo);
      } else {
        console.log("error");
        return;
      }
    }
  };
  const router = useNavigate();
  useEffect(() => {
    if (!user) {
      router("/");
    } else {
      if (user.length && user) {
        router(location);
      }else{
                router(location);

      }
    }

    fetchUser();
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home setuser={setuser} />} />
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </>
        )}

        {user && user && user.role === "ADMIN" && (
          <>
            <Route
              path="/allusers"
              element={
                <Users
                  filterUsers={filterUsers}
                  setfilterUsers={setfilterUsers}
                />
              }
            />
            <Route
              path="/allusers/:_id"
              element={<UsersDetails filterUsers={filterUsers} />}
            />
          </>
        )}
        <Route path="*" element={<NotAuth />} />
      </Routes>
    </>
  );
};

export default App;
