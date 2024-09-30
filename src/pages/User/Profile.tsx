"use client";
import { useAppSelector } from "@/redux/hook";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Profile = () => {
  const { isLoading, user } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  if (!user) {
    return (
      <div className="text-center text-gray-500">No user data available.</div>
    );
  }

  return (
    <div
      className="w-full grid grid-cols-1 md:grid-cols-3 mt-12"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(0, 0, 0, 0.7))",
      }}
    >
      <div className="col-span-1 md:col-span-2 border-r md:border-r-0 border-primaryMat p-6 md:p-10 flex flex-col justify-center space-y-4 pl-4">
        <h3 className="text-lg font-semibold py-2 border-b border-primaryMat">
          {user?.firstName} {user?.lastName}
        </h3>

        <p className="text-slate-300">
          <span className="font-semibold">Email: </span> {user?.email}
        </p>

        <p className="text-slate-300">
          <span className="font-semibold">Address: </span>{" "}
          {user?.address || "N/A"}
        </p>

        <p className="text-slate-300">
          <span className="font-semibold">Phone: </span> {user?.phone || "N/A"}
        </p>

        <div className="flex space-x-4 mt-4">
          {/* Social Media Icons */}
          <Link
            to="#"
            className="transition duration-200 hover:text-primaryMat"
          >
            <FaFacebook className="text-2xl" />
          </Link>

          <Link
            to="#"
            className="transition duration-200 hover:text-primaryMat"
          >
            <FaInstagramSquare className="text-2xl" />
          </Link>

          <Link
            to="#"
            className="transition duration-200 hover:text-primaryMat"
          >
            <FaGithub className="text-2xl" />
          </Link>

          <Link
            to="#"
            className="transition duration-200 hover:text-primaryMat"
          >
            <FaLinkedin className="text-2xl" />
          </Link>

          <Link
            to="#"
            className="transition duration-200 hover:text-primaryMat"
          >
            <FaTwitter className="text-2xl" />
          </Link>
        </div>
      </div>

      <div className="border-l md:border-l-0 border-primaryMat p-6 md:p-10 flex justify-center items-center ">
        <Link to={"/dashboard/user/update-info"} className="relative group">
          <img
            src={
              user?.image || "https://cdn.imgchest.com/files/k739cnwmdo7.png"
            }
            width={200}
            height={200}
            alt="avatar"
            className="rounded-full border-4 border-primaryMat transition-transform duration-300 ease-in-out transform hover:scale-105  shadow-2xl shadow-primaryMat"
          />
        </Link>
      </div>
    </div>
  );
};

export default Profile;
