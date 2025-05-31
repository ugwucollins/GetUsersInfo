import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const userName: any = localStorage.getItem("user");
  const [user, setuser]: any = useState(JSON.parse(userName));
  setuser;
  return (
    <>
      <div className="w-full min-h-screen bg-black/10 flex justify-center items-center">
        <div className="w-auto px-14 rounded-2xl transition-all shadow-lg hover:shadow-2xl drop-shadow hover:drop-shadow-2xl py-14 bg-white flex flex-col gap-2">
          <span className="font-semibold">
            Welcome, {user && user.firstName}
          </span>
          <p>Your Information Has been Recoreded</p>
          <button className="w-full mt-3 rounded-full hover:shadow-lg hover:drop-shadow font-semibold hover:font-bold bg-black text-white py-2 px-4 transition-all duration-200">
            <p>Thank You</p>
          </button>

          {user && user.role === "ADMIN" && (
            <Link to={"/allusers"}>
              <button
                onClick={() => {
                  const path = "/allusers";
                  localStorage.setItem("path", JSON.stringify(path));
                }}
                className="w-full mt-3 rounded-full hover:shadow-lg hover:drop-shadow font-semibold hover:font-bold bg-black text-white py-2 px-4 transition-all duration-200"
              >
                <p>View All Users</p>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

export const NotAuth = () => {
  return (
    <div className="w-full min-h-screen bg-black/10 flex justify-center items-center">
      <div className="w-auto px-12 rounded-2xl transition-all shadow-lg hover:shadow-2xl drop-shadow hover:drop-shadow-2xl py-12 bg-white flex flex-col gap-3">
        <p>Page Not Found 404</p>
        <p>Please Go back and Fill the Form</p>
        <Link to={"/"} className="text-blue-700 cursor-pointer font-semibold">
          GO Back
        </Link>
      </div>
    </div>
  );
};
