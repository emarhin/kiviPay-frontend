// "use client";
// import ThunderAnimation from "@/components/animation/thundar";

// export default function Loading() {
//   // Or a custom loading skeleton component
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white bg-[radial-gradient(rgba(0,0,0,0.03)_0.5px,_transparent_1px)] bg-[length:10px_10px] ">
//       <ThunderAnimation size={200} animated={true} speed={1} />
//     </div>
//   );
// }

// bg-gray-950
// bg-[radial-gradient(rgba(255,255,255,0.03)_0.5px,_transparent_1.5px)]
// bg-[length:12px_12px]

//   bg-white
//   bg-[radial-gradient(rgba(0,0,0,0.03)_0.5px,_transparent_1px)]
//   bg-[length:10px_10px]
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";

export default function Page() {
  return (
    <>
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
