"use client";

import React from "react";
import { User, Mail, ChevronDown, Settings, LogOut } from "lucide-react";

interface UserProfileProps {
  collapsed?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  collapsed = false,
  userName = "Alex Johnson",
  userEmail = "alex@example.com",
  userAvatar,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <div className="relative border-t border-gray-200">
      {!collapsed ? (
        <div className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-10 w-10 rounded-full border-2 border-blue-100"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 flex justify-center">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="h-8 w-8 rounded-full border-2 border-blue-100"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      )}

      {dropdownOpen && !collapsed && (
        <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </button>
          <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
            <LogOut className="h-4 w-4 mr-3" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
