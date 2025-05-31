import { useEffect, useState } from "react";
import { VITE_API_URL } from "./Home";
import { Link } from "react-router-dom";

const Users = ({ filterUsers, setfilterUsers }: any) => {
  const [AllUsers, setAllUsers] = useState([]);
  const [search, setsearch] = useState("");

  const FetchUsers = async () => {
    try {
      const res = await fetch(VITE_API_URL);
      const data = await res.json();
      setAllUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const Collections = [
    { title: "Title" },
    { title: "surName" },
    { title: "FirstName" },
    { title: "OtheNames" },
    { title: "email" },
    { title: "phoneNumber" },
    { title: "Address" },
    { title: "L.G.A" },
    { title: "Years" },
    { title: "Actions" },
  ];
  const FilterHandler = () => {
    const filter = AllUsers.filter(
      (user: any) =>
        user.firstName.toLowerCase().includes(search) ||
        user.otherName.toLowerCase().includes(search)
    );
    setfilterUsers(filter && filter.reverse());
  };

  useEffect(() => {
    FetchUsers();
    FilterHandler();
  }, [search, AllUsers]);

  return (
    <div className="w-full justify-center flex items-center py-4 pb-5 overflow-hidden">
      <div className=" py-4 px-4 w-full h-auto overflow-auto">
        <h1 className=" uppercase font-semibold text-center mb-2">
          Table of the ANNUNCO OLD STUDENTS ASSOCIATION
        </h1>
        <div className="py-4 px-4 mb-4 w-full gap-2 flex items-center flex-row">
          <input
            type="text"
            value={search}
            className="w-full py-3 shadow-md drop-shadow-lg px-4 rounded-full outline outline-1 outline-gray-500 focus:shadow-2xl focus:drop-shadow-2xl"
            onChange={(e) => setsearch(e.target.value)}
          />
          <button className="py-3 px-4 hover:shadow-inner hover:drop-shadow-xl shadow-md drop-shadow cursor-pointer hover:bg-white hover:outline hover:outline-gray-500 rounded-full hover:text-black bg-black text-white">
            <p>Search</p>
          </button>
        </div>
        <div className="flex flex-col w-full py-4 h-auto overflow-auto">
          <table className="overflow-auto w-full">
            <tr className="w-full text-left px-2 mb-5 bg-white shadow drop-shadow rounded-2xl">
              {Collections.map((lsit: any) => (
                <th key={lsit.title} className="whitespace-nowrap py-4 pl-2">
                  {lsit.title}
                </th>
              ))}
            </tr>
            {filterUsers.map((user: any) => (
              <tr className="w-full py-3" key={user._id}>
                <td className="py-3 font-semibold capitalize">{user.title}</td>
                <td className="px-2 capitalize">{user.firstName}</td>
                <td className="px-2 capitalize">{user.surName}</td>
                <td className="px-2 capitalize">{user.otherName}</td>
                <td className="px-2">{user.email}</td>
                <td className="px-2">{user.phoneNumber}</td>
                <td className="whitespace-nowrap px-2 capitalize">
                  {user.address}
                </td>
                <td className="px-2 capitalize whitespace-nowrap">
                  {user.LGA}
                </td>
                <td className="px-2 capitalize whitespace-nowrap">
                  {user.year}
                </td>
                <td className="px-2.5 capitalize whitespace-nowrap pt-2">
                  <Link to={`/allusers/${user._id}`}>
                    <button
                      onClick={() => {
                        const path = "/allusers/" + user._id;
                        localStorage.setItem("path", JSON.stringify(path));
                      }}
                      className="bg-black hover:rounded-full text-white py-3.5 hover:shadow-md hover:drop-shadow px-4 font-medium hover:font-semibold rounded-lg"
                    >
                      <p>View Details</p>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </table>

          <div className="flex justify-center mt-[30%] items-center font-semibold">
            {filterUsers.length === 0 && <p>User {search} Not Found</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
