// "use client";

// import React, { useState, useEffect } from "react";
// import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
// import SidebarMenu from "./SidebarMenu";
// import UserProfile from "./UserProfile";
// import ThunderAnimation from "../animation/thundar";

// interface SidebarProps {
//   className?: string;
//   onCollapse?: (collapsed: boolean) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ className = "", onCollapse }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => {
//       window.removeEventListener("resize", checkMobile);
//     };
//   }, []);

//   // Close sidebar on mobile when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const sidebar = document.getElementById("sidebar");
//       if (mobileOpen && sidebar && !sidebar.contains(event.target as Node)) {
//         setMobileOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [mobileOpen]);

//   const toggleCollapse = () => {
//     const newCollapsed = !collapsed;
//     setCollapsed(newCollapsed);
//     if (onCollapse) {
//       onCollapse(newCollapsed);
//     }
//   };

//   const toggleMobile = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   // Close mobile sidebar when clicking a link
//   const handleLinkClick = () => {
//     if (isMobile) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         onClick={toggleMobile}
//         className="md:hidden fixed top-4 left-4 z-50 bg-[#666666] border border-gray-300 rounded-lg p-2 shadow-lg"
//       >
//         {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </button>

//       {/* Sidebar Overlay for Mobile */}
//       {mobileOpen && isMobile && (
//         <div
//           className="fixed inset-0  z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         id="sidebar"
//         className={`
//           fixed md:relative
//           top-0 left-0 h-full
//           bg-[#FAFAFA]
//           flex flex-col
//           transition-all duration-300 ease-in-out
//           z-40
//           ${mobileOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}
//           ${collapsed ? "w-20" : "w-64"}
//           ${className}
//         `}
//       >
//         {/* Header */}
//         <div className="p-4 ">
//           <div className="flex items-center justify-between">
//             {!collapsed ? (
//               <div className="flex items-center">
//                 <div className="h-8 w-8  flex items-center justify-center">
//                   <ThunderAnimation size={60} animated={false} speed={1} />
//                 </div>
//                 <h1 className="ml-3 text-xl font-bold text-[#666666]">
//                   Dashboard
//                 </h1>
//               </div>
//             ) : (
//               <div className="w-full flex justify-center">
//                 <div className="h-8 w-8  flex items-center justify-center">
//                   <ThunderAnimation size={60} animated={false} speed={1} />
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={toggleCollapse}
//               className="hidden md:flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100"
//             >
//               {collapsed ? (
//                 <ChevronRight className="h-5 w-5 text-gray-500" />
//               ) : (
//                 <ChevronLeft className="h-5 w-5 text-gray-500" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Menu */}
//         <div className="flex-1 overflow-hidden">
//           <SidebarMenu collapsed={collapsed} />
//         </div>

//         {/* User Profile */}
//         <UserProfile collapsed={collapsed} />
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import UserProfile from "./UserProfile";
import ThunderAnimation from "../animation/thundar";

interface SidebarProps {
  className?: string;
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "", onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (mobileOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#666666] border border-gray-300 rounded-lg p-2 shadow-lg"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed md:relative
          top-0 left-0 h-screen
          bg-[#FAFAFA]
          flex flex-col
          transition-all duration-300 ease-in-out
          z-40
          ${mobileOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "w-20" : "w-64"}
          ${className}
        `}
      >
        {/* Header */}
        <div className="p-4 shrink-0">
          <div className="flex items-center justify-between">
            {!collapsed ? (
              <div className="flex items-center">
                <div className="h-8 w-8 flex items-center justify-center">
                  <ThunderAnimation size={60} animated={false} speed={1} />
                </div>
                <h1 className="ml-3 text-xl font-bold text-[#666666]">
                  Dashboard
                </h1>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <div className="h-8 w-8 flex items-center justify-center">
                  <ThunderAnimation size={60} animated={false} speed={1} />
                </div>
              </div>
            )}

            <button
              onClick={toggleCollapse}
              className="hidden md:flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto">
          <SidebarMenu collapsed={collapsed} />
        </div>

        {/* User Profile */}
        <div className="shrink-0">
          <UserProfile collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
