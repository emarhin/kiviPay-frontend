"use client";

import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Briefcase,
  Calendar,
  Mail,
  Bell,
  Users,
  Settings,
  Shield,
  HelpCircle,
  Folder,
  FileText,
  Database,
  CreditCard,
} from "lucide-react";
import MenuItem from "./MenuItem";
import { usePathname } from "next/navigation";

interface MenuSection {
  title: string;
  items: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    badge?: number;
  }>;
}

interface SidebarMenuProps {
  collapsed?: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed = false }) => {
  const pathname = usePathname();

  const menuSections: MenuSection[] = [
    {
      title: "Main",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/dashboard",
          badge: 0,
        },
        { icon: BarChart3, label: "Analytics", href: "/analytics", badge: 3 },
        { icon: Briefcase, label: "Projects", href: "/projects", badge: 5 },
        { icon: Calendar, label: "Calendar", href: "/calendar", badge: 0 },
      ],
    },
    {
      title: "Content",
      items: [
        { icon: Folder, label: "Files", href: "/files", badge: 0 },
        { icon: FileText, label: "Documents", href: "/documents", badge: 2 },
        { icon: Database, label: "Database", href: "/database", badge: 0 },
      ],
    },
    {
      title: "Communication",
      items: [
        { icon: Mail, label: "Messages", href: "/messages", badge: 12 },
        {
          icon: Bell,
          label: "Notifications",
          href: "/notifications",
          badge: 0,
        },
        { icon: Users, label: "Team", href: "/team", badge: 0 },
      ],
    },
    {
      title: "Billing",
      items: [
        { icon: CreditCard, label: "Billing", href: "/billing", badge: 0 },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: Settings, label: "Settings", href: "/settings", badge: 0 },
        { icon: Shield, label: "Security", href: "/security", badge: 0 },
        { icon: HelpCircle, label: "Help & Support", href: "/help", badge: 0 },
      ],
    },
  ];

  return (
    <nav className="flex-1 overflow-y-auto py-4">
      {menuSections.map((section, index) => (
        <div key={index} className="mb-8">
          {!collapsed && (
            <h3 className="px-4 text-xs font-semibold text-[#666666] uppercase tracking-wider mb-2">
              {section.title}
            </h3>
          )}
          <ul className="space-y-1">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <MenuItem
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={pathname === item.href}
                  badge={item.badge}
                  collapsed={collapsed}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default SidebarMenu;
