"use client"

import { useState, useRef, useEffect } from "react"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { useGetAllConnectsQuery } from "@/app/redux/features/ConnectApiSlice"

export interface Connect {
  _id: string;
  name: string;
  email: string;
  number: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

export default function NotificationDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch data using Redux query
  const { data: fetchedNotifications = [], refetch } = useGetAllConnectsQuery(undefined, {
    pollingInterval: 5000, // Refresh every 5 seconds
    refetchOnMountOrArgChange: true,
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Update notifications once the client-side is mounted
  useEffect(() => {
    if (fetchedNotifications.length > 0) {
      setNotifications(fetchedNotifications.map((connect: Connect) => ({
        id: connect._id,
        title: "New message received",
        description: connect.message,
        time: new Date(connect.createdAt || "").toLocaleString(),
        read: false,
      })));
    }
  }, [fetchedNotifications]); // Dependency on the fetched data

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md border border-gray-200 bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-600">
            <h3 className="font-medium dark:text-gray-200">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex cursor-pointer flex-col gap-1 border-b p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    !notification.read ? "bg-blue-50 dark:bg-gray-700" : "dark:bg-gray-800"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium dark:text-gray-200">{notification.title}</h4>
                    {!notification.read && <span className="flex h-2 w-2 rounded-full bg-blue-500" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{notification.description}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                </div>
              ))
            ) : (
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No notifications yet</p>
              </div>
            )}
          </div>

          <div className="border-t p-2 dark:border-gray-700">
            <button className="w-full rounded-md py-2 text-xs text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700" onClick={() => router.push("/contact")}>View all notifications</button>
          </div>
        </div>
      )}
    </div>
  );
}
