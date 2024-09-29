"use client";

import { logout } from "@/redux/features/auth/auth.slice";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { CiLogout, CiUser } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { RiLockPasswordLine, RiUserSettingsLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const userProfileLinks = [
  {
    href: "/dashboard/user",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/dashboard/user/update-info",
    label: "Account Settings",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/dashboard/user/my-bookings",
    label: "My Bookings",
    Icon: RiLockPasswordLine,
  },
];

const UserDashboardSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(undefined));
    Cookies.remove("refreshToken");
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-fit">
      <button
        className="flex items-center justify-start gap-2 text-white"
        onClick={() => window.history.back()} // Handle go back
      >
        <FaArrowLeft /> Go Back
      </button>
      {user &&
        userProfileLinks.map(({ Icon, href, label }, i) => (
          <Link
            to={href}
            key={`profile-${i}`}
            className={`w-full md:w-[240px] border border-borderColor py-3 rounded-md flex items-center justify-start gap-2 font-medium pl-5 transition-colors duration-200 ${
              path === href
                ? "bg-primary/90 text-white"
                : "bg-white text-primaryTxt hover:bg-gray-100"
            }`}
          >
            <Icon /> {label}
          </Link>
        ))}
      <button
        className="w-[240px] border-2 border-borderColor py-3 rounded-md flex items-center justify-start gap-2 font-medium pl-5 bg-red-600 hover:bg-red-400 text-white mt-12 transition-colors duration-200"
        onClick={handleLogout}
      >
        <CiLogout /> Logout
      </button>
    </div>
  );
};

export default UserDashboardSidebar;
