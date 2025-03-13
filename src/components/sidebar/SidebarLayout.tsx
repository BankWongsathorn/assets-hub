"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider as SidebarProv,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import SidebarItem from "@/utils/SidebarItem";
import SignOut from "./SignOut";
import { useMyContext } from "@/context/AuthContext";
import { ModeToggle } from "../mode/ModeToggle";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useMyContext();

  return (
    <SidebarProv>
      <Sidebar className="shadow-2xl bg-background">
        <SidebarHeader className="text-2xl font-semibold select-none">
          <Link href="/">Assets Hub</Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {SidebarItem.map(
                  (item) =>
                    item.dept.includes(user!.dept) && (
                      <SidebarMenuItem key={item.title} className="mt-2">
                        {item.url ? (
                          <Link href={item.url}>
                            <SidebarMenuButton className="hover:bg-primary hover:text-white">
                              <item.icon />
                              {item.title}
                            </SidebarMenuButton>
                          </Link>
                        ) : (
                          <SidebarMenuButton className="cursor-default">
                            <item.icon />
                            {item.title}
                          </SidebarMenuButton>
                        )}
                        {item.sub && (
                          <SidebarMenuSub>
                            {item.sub.map(
                              (sub) =>
                                sub.dept.includes(user!.dept) && (
                                  <SidebarMenuSubItem
                                    key={sub.title}
                                    className="mt-2"
                                  >
                                    <SidebarMenuSubButton
                                      asChild
                                      className="hover:bg-primary hover:text-white"
                                    >
                                      <Link href={sub.url}>{sub.title}</Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                            )}
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                    )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SignOut />
        </SidebarFooter>
      </Sidebar>
      <main className="flex flex-col w-full h-full">
        <div className="flex justify-between items-center py-4 px-8">
          <SidebarTrigger />
          <div className="flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
        <div className="mx-8">{children}</div>
      </main>
    </SidebarProv>
  );
}
