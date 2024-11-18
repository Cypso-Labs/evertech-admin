"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store/store";
import { logout } from "../../app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut } from "lucide-react";

const DropdownUser = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const { employee, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    router.push("/");
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-gray-600">Please log in to view user details.</p>
      </div>
    );
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)}>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4 rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-100"
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500">
                Welcome back
              </span>
              <span className="group relative">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent">
                  {employee?.name || "User"}
                </span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
              </span>
            </div>
            <div className="flex animate-bounce items-center">
              <span className="text-xl">👋</span>
            </div>
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 z-50 mt-2 w-60 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">
                {employee?.name}
              </p>
              <p className="text-sm text-gray-500">{employee?.email}</p>
            </div>

            <div className="py-2">
            
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-4 w-4 text-red-400" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownUser;
