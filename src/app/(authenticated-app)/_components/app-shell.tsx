"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  MenuIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
  HeadphonesIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Spinner from "@/components/ui/spinner";

type SidebarItem = {
  type: "link" | "dropdown";
  icon: React.ElementType;
  path?: string;
  label: string;
  children?: {
    icon: React.ElementType;
    path: string;
    label: string;
  }[];
};

type AppShellProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function AppShell({
  children,
  className,
  style,
}: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState<
    Record<string, boolean>
  >({});

  const NAVIGATION_ITEMS: SidebarItem[] = [
    {
      type: "link",
      icon: HomeIcon,
      path: "/dashboard",
      label: "Dashboard",
    },
    {
      type: "link",
      icon: CalendarIcon,
      path: "/calendar",
      label: "Calendar",
    },
    {
      type: "link",
      icon: ClockIcon,
      path: "/time-off",
      label: "Time Off",
    },
    {
      type: "link",
      icon: FolderIcon,
      path: "/projects",
      label: "Projects",
    },
    {
      type: "link",
      icon: UsersIcon,
      path: "/teams",
      label: "Teams",
    },
    {
      type: "link",
      icon: LayersIcon,
      path: "/integrations",
      label: "Integrations",
    },
    {
      type: "link",
      icon: StarIcon,
      path: "/benefits",
      label: "Benefits",
    },
    {
      type: "link",
      icon: FileTextIcon,
      path: "/documents",
      label: "Documents",
    },
  ];

  const FAVORITE_ITEMS = [
    {
      icon: LayersIcon,
      label: "Loom Mobile App",
      key: "1",
      color: "text-primary",
    },
    {
      icon: LayersIcon,
      label: "Monday Redesign",
      key: "2",
      color: "text-destructive",
    },
    {
      icon: LayersIcon,
      label: "Udemy Courses",
      key: "3",
      color: "text-secondary",
    },
  ];

  const isPathActive = (path?: string) => {
    if (!path) return false;
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  const toggleDropdown = (itemLabel: string) => {
    setExpandedDropdowns((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel],
    }));
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const renderNavItem = (item: SidebarItem) => {
    if (item.type === "link") {
      return (
        <Link
          href={item.path || "/"}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isPathActive(item.path)
              ? "bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary"
              : "hover:bg-accent dark:hover:bg-accent"
          )}
        >
          <item.icon className="h-5 w-5" />
          {!collapsed && <span>{item.label}</span>}
          {isPathActive(item.path) && !collapsed && (
            <div className="ml-auto h-2 w-2 rounded-full bg-primary dark:bg-primary"></div>
          )}
        </Link>
      );
    }

    const isExpanded = expandedDropdowns[item.label] || false;

    return (
      <div>
        <button
          onClick={() => toggleDropdown(item.label)}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isExpanded
              ? "bg-accent dark:bg-accent"
              : "hover:bg-accent dark:hover:bg-accent"
          )}
        >
          <item.icon className="h-5 w-5" />
          {!collapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              <ChevronDownIcon
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded ? "rotate-180" : ""
                )}
              />
            </>
          )}
        </button>

        {isExpanded && !collapsed && (
          <div className="mt-1 ml-4 space-y-1">
            {item.children?.map((child) => (
              <Link
                key={child.path}
                href={child.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isPathActive(child.path)
                    ? "bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary"
                    : "hover:bg-accent dark:hover:bg-accent"
                )}
              >
                <child.icon className="h-4 w-4" />
                <span>{child.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex h-screen bg-background dark:bg-background",
        className
      )}
      style={style}
    >
      <div
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all duration-300 dark:border-border dark:bg-card",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-4 dark:border-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold">Synergy</span>
              <span className="text-xs text-muted-foreground">
                HR Management
              </span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="ml-auto rounded-full p-1 hover:bg-accent dark:hover:bg-accent"
          >
            <ChevronRightIcon
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed ? "rotate-180" : ""
              )}
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {!collapsed && (
            <div className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
              MAIN
            </div>
          )}
          <div className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.label}>{renderNavItem(item)}</div>
            ))}
          </div>

          {!collapsed && (
            <div className="mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground">
              FAVS
            </div>
          )}
          <div className="space-y-1">
            {FAVORITE_ITEMS.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent dark:hover:bg-accent"
              >
                <div className={cn("h-2 w-2 rounded-full", item.color)} />
                {!collapsed && (
                  <>
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      ⌘ {item.key}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="border-border p-3 dark:border-border">
            <div className="space-y-1">
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent dark:hover:bg-accent"
              >
                <SettingsIcon className="h-5 w-5" />
                {!collapsed && <span>Settings</span>}
              </Link>
              <Link
                href="/support"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent dark:hover:bg-accent"
              >
                <HeadphonesIcon className="h-5 w-5" />
                {!collapsed && <span>Support</span>}
              </Link>
            </div>
          </div>
          <div className="border-border p-3 dark:border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent dark:hover:bg-accent">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src=""
                      alt="User avatar"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500 dark:border-background" />
                  </div>
                  {!collapsed && (
                    <div className="flex flex-1 flex-col items-start text-left">
                      <span className="font-medium">Sophia Williams</span>
                      <span className="text-xs text-muted-foreground">
                        sophia@example.com
                      </span>
                    </div>
                  )}
                  {!collapsed && <ChevronRightIcon className="h-4 w-4" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-end border-b border-border bg-card px-4 dark:border-border dark:bg-card">
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent dark:hover:bg-accent md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full p-2 text-muted-foreground hover:bg-accent dark:hover:bg-accent">
                  <SearchIcon className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-auto p-2">
                  <div className="space-y-2">
                    <div className="rounded-md p-2 hover:bg-accent dark:hover:bg-accent">
                      <div className="font-medium">New meeting scheduled</div>
                      <div className="text-xs text-muted-foreground">
                        10 minutes ago
                      </div>
                    </div>
                    <div className="rounded-md p-2 hover:bg-accent dark:hover:bg-accent">
                      <div className="font-medium">
                        Time off request approved
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1 hour ago
                      </div>
                    </div>
                    <div className="rounded-md p-2 hover:bg-accent dark:hover:bg-accent">
                      <div className="font-medium">
                        Project deadline updated
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative rounded-full p-2 text-muted-foreground hover:bg-accent dark:hover:bg-accent">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-auto p-2">
                  <div className="space-y-2">
                    <div className="rounded-md p-2 hover:bg-accent dark:hover:bg-accent">
                      <div className="font-medium">New meeting scheduled</div>
                      <div className="text-xs text-muted-foreground">
                        10 minutes ago
                      </div>
                    </div>
                    <div className="rounded-md p-2 hover:bg-accent dark:hover:bg-accent">
                      <div className="font-medium">
                        Time off request approved
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1 hour ago
                      </div>
                    </div>
                    <div className="rounded-md p-2 hover:bg-accent dark:hover:bg-accent">
                      <div className="font-medium">
                        Project deadline updated
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              className="hidden items-center gap-2 md:flex"
              onClick={() => router.push("/schedule")}
              icon={<CalendarIcon className="h-4 w-4" />}
            >
              Schedule
            </Button>

            <Button
              className="hidden items-center gap-2 md:flex"
              icon={<PlusIcon className="h-4 w-4" />}
            >
              Create Request
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative flex items-center gap-2 rounded-full text-left text-sm hover:bg-accent dark:hover:bg-accent">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src=""
                      alt="User avatar"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500 dark:border-background" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">Sophia Williams</div>
                  <div className="text-xs text-muted-foreground">
                    sophia@example.com
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
