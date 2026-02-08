"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  icon: LucideIcon | IconType | any;
  label: string;
  href?: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  collapsed?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  href,
  active = false,
  badge,
  onClick,
  collapsed = false,
}) => {
  const content = (
    <div className="relative flex items-center p-3 rounded-lg group transition-all duration-200">
      <div
        className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} w-full`}
      >
        <Icon
          className={`h-4 w-4 ${active ? "text-gray-950" : "text-[#666666] group-hover:text-gray-950"}`}
        />

        {!collapsed && (
          <span
            className={`ml-3 font-medium ${active ? "text-black" : "group-hover:text-gray-950"} ${active ? "text-[#666666]" : "text-[#666666] group-hover:text-[#666666]"}`}
          >
            {label}
          </span>
        )}

        {!collapsed && badge && badge > 0 && (
          <span className="ml-auto bg-[#EBEBEB] text-[#666666] text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {collapsed && badge && badge > 0 && (
        <span className="absolute top-1 right-1 bg-[#EBEBEB] text-[#666666] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {badge}
        </span>
      )}
    </div>
  );

  const className = `block w-full text-left hover:bg-[#EBEBEB] hover:rounded-lg ${
    active ? "bg-[#EBEBEB] rounded-lg" : ""
  } ${collapsed ? "px-2" : "px-3"}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
};

export default MenuItem;
