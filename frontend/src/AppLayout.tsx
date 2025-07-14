import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/AppSidebar.tsx";

type AppLayoutProps = {
  onLogout: () => void;
  isAuthenticated: boolean;
  username?: string;
};

export function AppLayout({
  onLogout,
  isAuthenticated,
  username,
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        username={username}
      />
      <main>
        <SidebarTrigger />
        <div className="my-4 mx-12">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
