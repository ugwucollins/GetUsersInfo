import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const { VITE_API_URL } = import.meta.env;

const Home = ({ setuser, setemail }: any) => {
  const [formData, setformData] = useState({
    title: "",
    firstName: "",
    surName: "",
    otherName: "",
    email: "",
    phoneNumber: "",
    address: "",
    LGA: "",
    year: "",
  });

  const router = useNavigate();
  const letYear: any = localStorage.getItem("year");
  const [year, setyear] = useState((letYear && JSON.parse(letYear)) || []);

  function addOneYear() {
    const date = new Date();
    const ChecYear = date.getFullYear();
    const lastElement = year[year.length - 1];

    if (ChecYear > +lastElement.title) {
      const newDates = date.getFullYear() + 1;
      const title: any = { title: newDates.toLocaleString() };
      const newDate = [...year, title];
      localStorage.setItem("year", JSON.stringify(newDate));
      setyear(newDate);
    } else {
      const message = "Year is Over";
      console.log(message);
      localStorage.setItem("year", JSON.stringify(year));

      return false;
    }
  }
  useEffect(() => {
    addOneYear();
  }, []);

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      firstName: formData.firstName,
      surName: formData.surName,
      otherName: formData.otherName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      LGA: formData.LGA,
      year: formData.year,
    };
    try {
      const isVaild = vaildation(formData);
      console.log(isVaild);

      if (isVaild) {
        const res = await fetch(VITE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const datas = await res.json();
        console.log(datas);

        if (datas.success) {
          toast.success(datas.message);
          const UserInfo = {
            id: datas.users._id,
            firstName: datas.users.firstName,
            email: datas.users.email,
            role: datas.users.userRole,
          };
          setuser(UserInfo);
          localStorage.setItem("user", JSON.stringify(UserInfo));

          setformData({
            title: "",
            firstName: "",
            surName: "",
            otherName: "",
            email: "",
            phoneNumber: "",
            address: "",
            LGA: "",
            year: "",
          });
          localStorage.setItem("path", "/dashboard");
          router("/dashboard");
        } else {
          toast.error(datas.message);
        }
      } else {
        console.log("Please Fill In the Form");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const HandleChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full px-5 bg-white dark:bg-slate-500 min-h-screen flex justify-center items-center align-middle text-center">
      <div className="flex w-full shadow-2xl drop-shadow-lg max-md:max-w-3xl flex-col max-w-4xl justify-center items-center bg-white rounded-2xl px-3 py-6 max-md:px-2">
        <h1 className="font-bold my-4 capitalize text-black dark:text-white">
          ANNUNCO OLD STUDENTS ASSOCIATION
        </h1>
        <form className="w-full px-4" onSubmit={HandleSubmit}>
          <div className="w-full flex max-[600px]:flex-col flex-row gap-0 items-center">
            <div className="capitalize flex flex-col text-left mb-4 w-full items-center px-2">
              <label
                htmlFor="title"
                className="font-bold mb-1 py-0.5 text-left w-full"
              >
                title
              </label>

              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={HandleChange}
                placeholder="Mr/Mrs "
                className="w-full focus:rounded-3xl focus:shadow-xl transition-all outline-2 outline font-semibold outline-gray-400 py-2 px-4 rounded-xl"
                name="title"
              />
            </div>

            <div className="capitalize flex flex-col text-left mb-4 w-full items-center px-2">
              <label
                htmlFor="surName"
                className="font-bold mb-1 py-0.5 text-left w-full"
              >
                sur Name
              </label>

              <input
                type="text"
                id="surName"
                value={formData.surName}
                onChange={HandleChange}
                placeholder="Tony..."
                className="w-full focus:rounded-3xl focus:shadow-xl transition-all outline-2 outline font-semibold outline-gray-400 py-2 px-4 rounded-xl"
                name="surName"
              />
            </div>
          </div>

          <div className="w-full flex max-[600px]:flex-col flex-row gap-0 items-center">
            <div className="capitalize flex flex-col text-left mb-4 w-full items-center px-2">
              <label
                htmlFor="firstName"
                className="font-bold mb-1 py-0.5 text-left w-full"
              >
                first Name
              </label>

              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={HandleChange}
                placeholder="somtochukwu "
                className="w-full focus:rounded-3xl focus:shadow-xl transition-all outline-2 outline font-semibold outline-gray-400 py-2 px-4 rounded-xl"
                name="firstName"
              />
            </div>

            <div className="capitalize flex flex-col text-left mb-4 w-full items-center px-2">
              <label
                htmlFor="otherName"
                className="font-bold mb-1 py-0.5 text-left w-full"
              >
                other Names
              </label>

              <input
                type="text"
                id="otherName"
                value={formData.otherName}
                onChange={HandleChange}
                placeholder="Collins..."
                className="w-full focus:rounded-3xl focus:shadow-xl transition-all outline-2 outline font-semibold outline-gray-400 py-2 px-4 rounded-xl"
                name="otherName"
              />
            </div>
          </div>

          <div className="w-full flex max-[600px]:flex-col flex-row gap-0 items-center">
            <div className="capitalize flex flex-col text-left mb-4 w-full items-center px-2">
              <label
                htmlFor="email"
                className="font-bold mb-1 py-0.5 text-left w-full"
              >
                email
              </label>

              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={HandleChange}
                placeholder="example012@gmail.com"
                className="w-full focus:rounded-3xl focus:shadow-xl transition-all outline-2 outline font-semibold outline-gray-400 py-2 px-4 rounded-xl"
                name="email"
              />
            </div>

            <div className="capitalize flex flex-col text-left mb-4 w-full items-center px-2">
              <label
                htmlFor="phoneNumber"
                className="font-bold mb-1 py-0.5 text-left w-full"
              >
                phone Numbers
              </label>

              <input
                type="number"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={HandleChange}
                placeholder="0910002880"
                className="w-full focus:rounded-3xl focus:shadow-xl transition-all outline-2 outline font-semibold outline-gray-400 py-2 px-4 rounded-xl"
                name="phoneNumber"
              />
            </div>
          </div>

          <div className="w-full flex max-[600px]:flex-col flex-row gap-0 items-center">
            <div className="capitalize flex flex-col text-left mb-4 w-full items-center px-2">
              <label
                htmlFor="address"
                className="font-bold mb-1 py-0.5 text-left w-full"
              >
                Permanent Home Address
              </label>

              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={HandleChange}
                placeholder="no12 example street"
                className="w-full focus:rounded-3xl focus:shadow-xl transition-all outline-2 outline font-semibold outline-gray-400 py-2 px-4 rounded-xl"
                name="address"
              />
            </div>

            <div className="capitalize flex flex-col text-left mb-4 w-full items-center px-2">
              <label
                htmlFor="LGA"
                className="font-bold mb-1 py-0.5 text-left w-full"
              >
                L.G.A
              </label>

              <input
                type="text"
                id="LGA"
                value={formData.LGA}
                onChange={HandleChange}
                placeholder="east-ato..."
                className="w-full focus:rounded-3xl focus:shadow-xl transition-all outline-2 outline font-semibold outline-gray-400 py-2 px-4 rounded-xl"
                name="LGA"
              />
            </div>
          </div>

          <div className="w-full mb-5 text-left px-1.5 pb-2">
            <h1 className="font-semibold py-1 capitalize">
              Year of graduation
            </h1>
            <div className="flex w-full max-[350px]:outline-none items-center outline outline-2 outline-gray-400 rounded-lg p-2 justify-between">
              <select
                name="year"
                value={formData.year}
                id="year"
                className="w-full font-semibold max-[350px]:outline max-[350px]:outline-gray-500 max-[350px]:outline-2 max-[350px]:py-2 max-[350px]:px-2 outline-none max-[350px]:rounded-lg flex items-center"
                onChange={HandleChange}
              >
                <option value="">year</option>
                {year.map((lsit: any) => (
                  <option
                    className="capitalize font-semibold"
                    value={lsit.title}
                    key={lsit.title}
                  >
                    {lsit.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full mb-4">
            <button className="w-full cursor-pointer bg-black rounded-lg hover:rounded-full hover:shadow-2xl hover: drop-shadow-lg font-semibold hover:font-bold transition-all duration-300 text-white py-3 px-4">
              <p>Submit</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;

export const vaildation = (formData: any) => {
  let error = {
    title: "",
    firstName: "",
    surName: "",
    otherName: "",
    year: "",
    email: "",
    phoneNumber: "",
    address: "",
    LGA: "",
  };

  const emailVal = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  const numVal = /[^A-Za-z0-9 ]/;

  if (formData.title === "") {
    const message = "Title is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.firstName === "") {
    const message = "firstName is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.firstName === "") {
    const message = "firstName is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.surName === "") {
    const message = "SurName is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.otherName === "") {
    const message = "OtherName is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.email === "") {
    const message = "Email is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (!emailVal.test(formData.email)) {
    const message = "Invaild Email";
    error.title = message;
    toast.error(message);
    return false;
  } else if (!numVal.test(formData.email)) {
    const message = "Invaild phoneNumber";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.phoneNumber === "") {
    const message = "PhoneNumber is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.phoneNumber.length >= 12) {
    const message = "PhoneNumber must be Less Than 11 Numbers";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.phoneNumber.length <= 10) {
    const message = "PhoneNumber must be More Than 10 Numbers";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.phoneNumber !== Number) {
  } else if (formData.address === "") {
    const message = "Address is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.LGA === "") {
    const message = "LGA is Required";
    error.title = message;
    toast.error(message);
    return false;
  } else if (formData.year === "") {
    const message = "year is Required";
    error.year = message;
    toast.error(message);
    return false;
  }

  return true;
};
// write an array of years till 2025
export const Years = [
  {
    title: "1960",
  },
  {
    title: "1961",
  },
  {
    title: "1962",
  },
  {
    title: "1963",
  },
  {
    title: "1964",
  },
  {
    title: "1965",
  },
  {
    title: "1966",
  },
  {
    title: "1967",
  },
  {
    title: "1968",
  },
  {
    title: "1969",
  },
  {
    title: "1970",
  },
  {
    title: "1971",
  },
  {
    title: "1972",
  },
  {
    title: "1973",
  },
  {
    title: "1974",
  },
  {
    title: "1975",
  },
  {
    title: "1976",
  },
  {
    title: "1977",
  },
  {
    title: "1978",
  },
  {
    title: "1979",
  },
  {
    title: "1980",
  },
  {
    title: "1981",
  },
  {
    title: "1982",
  },
  {
    title: "1983",
  },
  {
    title: "1984",
  },
  {
    title: "1985",
  },
  {
    title: "1986",
  },
  {
    title: "1987",
  },
  {
    title: "1988",
  },
  {
    title: "1989",
  },
  {
    title: "1990",
  },
  {
    title: "1991",
  },
  {
    title: "1992",
  },
  { title: "1993" },
  {
    title: "1994",
  },
  { title: "1995" },
  {
    title: "1996",
  },
  { title: "1997" },
  {
    title: "1998",
  },
  {
    title: "1999",
  },
  {
    title: "2000",
  },

  { title: "2001" },

  {
    title: "2002",
  },
  { title: "2003" },
  {
    title: "2004",
  },
  { title: "2005" },
  {
    title: "2006",
  },
  { title: "2007" },
  {
    title: "2008",
  },
  { title: "2009" },
  {
    title: "2010",
  },
  { title: "2011" },
  {
    title: "2012",
  },
  { title: "2013" },
  {
    title: "2014",
  },
  { title: "2015" },
  {
    title: "2016",
  },
  { title: "2017" },
  {
    title: "2018",
  },
  { title: "2019" },
  {
    title: "2020",
  },
  { title: "2021" },
  { title: "2022" },
  {
    title: "2023",
  },
  { title: "2024" },
  { title: "2025" },
];
