import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_API_URL } from "./Home";

const UsersDetails = ({ filterUsers }: any) => {
  const { _id } = useParams();
  const router = useNavigate();
  const userDeatils = filterUsers.filter(
    (user: any) => user._id === _id && _id
  );
  const [user, setUsers] = useState(userDeatils && userDeatils);
  const [role, setrole] = useState("");

  useEffect(() => {
    if (!user.length) {
      router("/allusers");
      localStorage.setItem("path", `/allusers`);
    }
    setUsers;
  }, [user]);

  const submitHandle = async () => {
    const data = {
      email: user[0] && user[0].email,
      userRole: role,
    };

    try {
      const res = await fetch(`${VITE_API_URL}/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const datas = await res.json();
      if (datas.success) {
        toast.success(`${user[0] && user[0].firstName} ${datas.message}`);

        // router("/allusers");
        localStorage.setItem("path", `/allusers`);
      } else {
        toast.error(datas.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex min-h-screen px-4 justify-center items-center">
      <div className="w-full py-5 rounded-xl max-w-4xl bg-white shadow-xl drop-shadow-2xl px-4">
        <div className="w-full justify-center text-center flex items-center flex-col">
          <div className="size-32 rounded-full relative p-1 mb-2 bg-black">
            <img
              src="/user.png"
              className="w-full h-full rounded-full"
              alt="User Logo"
            />
          </div>

          <div className="w-full max-lg:max-w-2xl flex mt-5 py-2 flex-col justify-center items-center text-center align-middle max-sm:max-w-xl">
            <div className="w-full flex flex-row  max-sm:flex-col gap-4 justify-between px-5">
              <div className="flex gap-1 flex-wrap">
                <p className="font-semibold">Name:</p>
                <p className="font-bold underline capitalize">
                  {user[0] && user[0].title}, {user[0] && user[0].surName}{" "}
                  {user[0] && user[0].firstName} {user[0] && user[0].otherName}
                </p>
              </div>
              <div className="flex gap-1 flex-wrap">
                <p className="font-semibold">Email:</p>
                <p className="font-bold underline">
                  {user[0] && user[0].email}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-row mt-3 max-sm:flex-col gap-4 justify-between px-5">
              <div className="flex flex-wrap gap-1">
                <p className="font-semibold">PhoneNumber: </p>
                <p className="font-bold underline">
                  {user[0] && user[0].phoneNumber}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                <p className="font-semibold">Address:</p>
                <p className="font-bold underline">
                  {user[0] && user[0].address}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-row mt-3 max-sm:flex-col gap-4 justify-between px-5">
              <div className="flex flex-wrap gap-1">
                <p className="font-semibold">L.G.A: </p>
                <p className="font-bold underline">{user[0] && user[0].LGA}</p>
              </div>
              <div className="flex gap-1 flex-wrap">
                <p className="font-semibold">User:</p>
                <p className="font-bold underline">{user[0] && "Active"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-8 py-4">
          <label htmlFor="user" className="font-semibold flex justify-between">
            <p>UserRole:</p>
            <p>{role ? role : user[0] && user[0].userRole}</p>
          </label>
          <select
            name="user"
            id="user"
            value={role}
            onChange={(e) => setrole(e.target.value)}
            className="px-4 py-2.5 mt-2 rounded-lg w-full outline"
          >
            <option value="">Select</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            disabled={!role.length}
            onClick={submitHandle}
            className="w-full bg-black disabled:opacity-80 text-white py-3 rounded-xl mt-6 font-semibold hover:shadow-lg hover:drop-shadow-xl hover:rounded-full transition-all px-4 capitalize"
          >
            <p>{role.length ? "save" : "update"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersDetails;
