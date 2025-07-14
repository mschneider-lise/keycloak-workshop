import { useCallback } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar.tsx";
import { Link, useLocation } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { ChevronUp, Eye, EyeOff, UserCircle2 } from "lucide-react";

interface AppSidebarProps {
  onLogout?: () => void;
  isAuthenticated: boolean;
  username?: string;
}

export function AppSidebar({
  onLogout,
  isAuthenticated,
  username,
}: AppSidebarProps) {
  const location = useLocation();
  const { open } = useSidebar();

  const isActive = useCallback(
    (regex: RegExp) => regex.test(location.pathname),
    [location.pathname],
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open && <span className="ml-2">Keycloak Workshop</span>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive(new RegExp("^(/public)?/?$"))}
              >
                <Link to={`/`}>
                  <Eye />
                  <span>Public</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive(new RegExp("^/secured/?$"))}
              >
                <Link to={`/secured`}>
                  <EyeOff />
                  <span>Secured</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {isAuthenticated && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <UserCircle2 />
                    {username}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top">
                  <DropdownMenuItem onClick={onLogout}>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
