"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import user from "@/assets/images/user/user-03.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store/store";
import { logout } from "../../app/redux/slices/authSlice";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { employee, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <div>Please log in to view user details.</div>;
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={user}
            style={{ width: "auto", height: "auto" }}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">{employee?.name}</span>
        </span>
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark">
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="block">
              <span className="block font-medium text-dark dark:text-white">
                {employee?.username}
              </span>
              <span className="block font-medium text-dark-5 dark:text-dark-6">
                {employee?.email}
              </span>
            </span>
          </div>
          <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
            <li>
              <Link href="/profile" className="hover:bg-gray-2">
                View Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="hover:bg-gray-2">
                Account Settings
              </Link>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="w-full p-2 text-left hover:bg-gray-2"
          >
            Logout
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
