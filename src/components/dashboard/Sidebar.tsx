"use client";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth/auth.slice";
import { adminLinks } from "@/types/navlinks";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import { SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DashboardNav } from "./DashboardNav";
import { useAppDispatch } from "@/redux/hook";

type SidebarProps = {
  className?: string;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function Sidebar({
  className,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const dispatch = useAppDispatch();

  // Handle outside click to hide the sidebar
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const screenWidth = window.screen.width;

      // Return if screen width is larger than 1024px
      if (screenWidth > 1024) return;

      // Return if user clicked on the sidebar or menu button
      if (target.closest(".sidebar") || target.closest(".menuBTn")) return;

      setIsOpen(false);
    };

    // Add event listener when sidebar is open
    if (isOpen) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  const handleLogout = () => {
    Cookies.remove("refreshToken");
    dispatch(logout());
  };

  const handleCloseBar = () => {
    if (window.screen.width <= 767) {
      setIsOpen(false);
    }
  };

  return (
    <aside
      style={{
        transition: "0.3s",
        width: isOpen ? "287px" : "0px",
        display: "flex",
      }}
      className={cn(
        `md:relative fixed top-0 left-0 h-screen border-r bg-black transition-width duration-500 md:block
        w-72 shrink-0 overflow-hidden z-[9999] sidebar flex flex-col gap-5 justify-between pb-5`,
        className
      )}
    >
      <div className="w-full">
        <div className="hidden p-5 pt-10 lg:block">
          <Link to="/">
            <h3 className="font-bold text-2xl text-primaryMat">AutoLimpio</h3>
          </Link>
        </div>

        <ChevronLeft
          className={cn(
            "fixed z-20 top-1/2 cursor-pointer rounded-full border bg-primaryMat text-3xl text-foreground md:flex hidden",
            {
              "rotate-0": isOpen,
              "rotate-180": !isOpen,
            }
          )}
          onClick={() => setIsOpen(!isOpen)}
        />

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1" onClick={handleCloseBar}>
              <DashboardNav items={adminLinks} />
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        className="w-11/12 mx-auto"
        variant="destructive"
      >
        Logout
      </Button>
    </aside>
  );
}
