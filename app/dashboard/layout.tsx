// import Sidebar from "@/components/sidebar/Sidebar";

// export const metadata = {
//   title: "Dashboard - Next.js Sidebar Layout",
//   description: "Dashboard with modern sidebar navigation",
// };

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="min-h-screen ">
//       <div className="flex">
//         <Sidebar />

//         {/* Main Content */}
//         <main className="flex-1 min-h-screen overflow-hidden">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 min-h-screen overflow-hidden ">{children}</main>
    </SidebarProvider>
  );
}
