import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployee, logout } from "@/app/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";

const DropdownUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); 


  const employee = useSelector(selectEmployee);

 
  useEffect(() => {
    setIsHydrated(true); 
  }, []);

  
  if (!isHydrated || !employee) {
    return null; 
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <User className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {employee?.name}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg border bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="space-y-3">
            <div className="border-b pb-3">
              <p className="text-sm font-semibold text-gray-900">
                {employee?.name}
              </p>
              <p className="text-sm text-gray-500">{employee?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
