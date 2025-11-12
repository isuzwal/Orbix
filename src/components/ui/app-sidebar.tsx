import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LogOut, Loader2Icon, Brain } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./button";
import { useContext, useState } from "react";
import { UserContextProvider } from "@/context/user-content";
export function AppSidebar() {
  const [isActive, setActice] = useState("Dashbord");
  const context = useContext(UserContextProvider);
  if (!context) {
    throw new Error("useContext must be used inside a ContextProvider");
  }
  const { user, loading, logout } = context;
  if (!user) {
    return;
  }

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading <Loader2Icon className="animate-spin" />{" "}
      </div>
    );
  }
  interface SidebarProps {
    title: string;
    url: string;
    icons: React.ReactNode;
  }
  const items: SidebarProps[] = [
    {
      title: "Dashbord",
      url: "/dashbord",
      icons: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M2.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 1.04 2.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6A1.5 1.5 0 0 0 2.15 6.96c.174.04.37.04.6.04h2.5c.229 0 .426 0 .6-.041A1.5 1.5 0 0 0 6.96 5.85c.04-.174.04-.37.04-.6v-2.5c0-.229 0-.426-.041-.6A1.5 1.5 0 0 0 5.85 1.04C5.676 1 5.48 1 5.25 1H2.8Zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.003.374-.014.417a.5.5 0 0 1-.37.37C5.575 5.996 5.509 6 5.2 6H2.8c-.308 0-.374-.003-.417-.014a.5.5 0 0 1-.37-.37C2.004 5.575 2 5.509 2 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37ZM9.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 8.04 2.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6A1.5 1.5 0 0 0 9.15 6.96c.174.04.37.04.6.04h2.5c.229 0 .426 0 .6-.041a1.5 1.5 0 0 0 1.11-1.109c.04-.174.04-.37.04-.6v-2.5c0-.229 0-.426-.041-.6a1.5 1.5 0 0 0-1.109-1.11c-.174-.04-.37-.04-.6-.04H9.8Zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 0 1-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.003-.417-.014a.5.5 0 0 1-.37-.37C9.004 5.575 9 5.509 9 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37ZM2.75 8h2.5c.229 0 .426 0 .6.041A1.5 1.5 0 0 1 6.96 9.15c.04.174.04.37.04.6v2.5c0 .229 0 .426-.041.6a1.5 1.5 0 0 1-1.109 1.11c-.174.04-.37.04-.6.04h-2.5c-.229 0-.426 0-.6-.041a1.5 1.5 0 0 1-1.11-1.109c-.04-.174-.04-.37-.04-.6v-2.5c0-.229 0-.426.041-.6A1.5 1.5 0 0 1 2.15 8.04c.174-.04.37-.04.6-.04Zm.05 1c-.308 0-.374.003-.417.014a.5.5 0 0 0-.37.37C2.004 9.425 2 9.491 2 9.8v2.4c0 .308.003.374.014.417a.5.5 0 0 0 .37.37c.042.01.108.013.416.013h2.4c.308 0 .374-.004.417-.014a.5.5 0 0 0 .37-.37c.01-.042.013-.108.013-.416V9.8c0-.308-.003-.374-.014-.417a.5.5 0 0 0-.37-.37C5.575 9.004 5.509 9 5.2 9H2.8Zm7-1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 8.04 9.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6a1.5 1.5 0 0 0 1.109 1.11c.174.041.371.041.6.041h2.5c.229 0 .426 0 .6-.041a1.5 1.5 0 0 0 1.109-1.109c.041-.174.041-.371.041-.6V9.75c0-.229 0-.426-.041-.6a1.5 1.5 0 0 0-1.109-1.11c-.174-.04-.37-.04-.6-.04H9.8Zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 0 1-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.004-.417-.014a.5.5 0 0 1-.37-.37C9.004 12.575 9 12.509 9 12.2V9.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37Z"
            clip-rule="evenodd"
          />
        </svg>
      ),
    },
 
    {
      title: "Blogs",
      url: "blogs",
      icons: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
          <path
            fill="currentColor"
            d="M4 24h10v2H4zm0-6h10v2H4zm22-4H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2zM6 6v6h20V6zm20 22h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2zm-6-8v6h6v-6z"
          />
        </svg>
      ),
    },
    {
      title: "Twitter",
      url: "twitter",
      icons: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 12">
          <path
            fill="currentColor"
            d="M.076 0H3.61l3.145 4.498L10.53 0h1.129L7.185 5.114L12 12H8.468L5.183 7.303L1.128 12H0l4.753-5.312z"
          />
        </svg>
      ),
    },
    {
      title: "Youtube",
      url: "youtube",
      icons: (
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linejoin="round">
            <path d="M1.5 12c0-1.477.071-2.87.164-4.038c.14-1.764 1.538-3.12 3.303-3.243C6.663 4.6 8.98 4.5 12 4.5s5.337.1 7.033.219c1.765.123 3.163 1.48 3.303 3.243c.093 1.169.164 2.56.164 4.038c0 1.53-.076 2.969-.174 4.163a3.374 3.374 0 0 1-3.166 3.121c-1.713.117-4.11.216-7.16.216s-5.447-.099-7.16-.216a3.374 3.374 0 0 1-3.166-3.121A52 52 0 0 1 1.5 12Z" />
            <path d="M10 15V9l5.5 3z" />
          </g>
        </svg>
      ),
    },
    {
      title: "Spotify",
      url: "soptify",
      icons: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 7a6 6 0 1 0 12 0A6 6 0 1 0 1 7" />
            <path d="M4.055 4.837c2.382-.455 4.248-.202 6.51 1.002M4.98 8.875c1.152-.142 1.935.012 3.005.5M4.54 6.8c1.784-.355 3.031 0 4.914.909" />
          </g>
        </svg>
      ),
    },
    {
      title: "Notes",
      url: "notes",
      icons: (
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none">
            <path
              fill="#c77f67"
              d="M17.762 1H4.143c-.578 0-1.047.469-1.047 1.048v19.904c0 .579.469 1.048 1.047 1.048h13.62c.578 0 1.047-.469 1.047-1.048V2.048c0-.579-.469-1.048-1.048-1.048"
            />
            <path
              fill="#fff"
              d="M14.619 8.857a.524.524 0 0 1-.524.524H8.857a.524.524 0 0 1-.524-.524V5.714a.524.524 0 0 1 .524-.524h5.238a.524.524 0 0 1 .524.524z"
            />
            <path
              stroke="#191919"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.047 4.143H5.19M2.047 9.38H5.19m-3.143 5.24H5.19m-3.143 5.237H5.19"
            />
            <path
              fill="#66e1ff"
              d="M21.953 4.143v3.143H18.81v-4.19h2.095a1.05 1.05 0 0 1 1.048 1.047"
            />
            <path fill="#ffef5e" d="M21.953 7.286H18.81v4.19h3.143z" />
            <path fill="#ff808c" d="M21.953 11.476H18.81v4.19h3.143z" />
            <path
              fill="#b2ffc0"
              d="M21.953 15.667v3.143a1.05 1.05 0 0 1-1.048 1.047H18.81v-4.19z"
            />
            <path
              stroke="#191919"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.762 1H4.143c-.578 0-1.047.469-1.047 1.048v19.904c0 .579.469 1.048 1.047 1.048h13.62c.578 0 1.047-.469 1.047-1.048V2.048c0-.579-.469-1.048-1.048-1.048"
            />
            <path
              stroke="#191919"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.619 8.857a.524.524 0 0 1-.524.524H8.857a.524.524 0 0 1-.524-.524V5.714a.524.524 0 0 1 .524-.524h5.238a.524.524 0 0 1 .524.524zm7.334-4.714v3.143H18.81v-4.19h2.095a1.05 1.05 0 0 1 1.048 1.047m0 3.143H18.81v4.19h3.143zm0 4.19H18.81v4.19h3.143zm0 4.191v3.143a1.05 1.05 0 0 1-1.048 1.047H18.81v-4.19z"
            />
          </g>
        </svg>
      ),
    },
    // {
    //   title: "Images",
    //   url: "images",
    //   icons: (
    //     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    //       <path
    //         fill="none"
    //         stroke="currentColor"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //         stroke-width="2"
    //         d="M3 19v-9a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm0 0l4.293-4.293a1 1 0 0 1 1.414 0L14 20M7 6V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1m-7-4v.01"
    //       />
    //     </svg>
    //   ),
    // },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold  flex gap-1 items-center text-xl text-primary p-2 w-full">
            <Brain className="w-6 h-6" /> <span className=" text-xl">Orbix</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="m-2">
                  <SidebarMenuButton
                    asChild
                    onClick={() => setActice(item.title)}
                    className={`bg-transparent hover:border-primary border   border-transparent duration-300 cursor-pointer ease-in-out ${
                      item.title == isActive ? "bg-primary text-neutral-200" : "text-black"
                    }`}>
                    <Link to={item.url}>
                       <p className={`${item.title === isActive ? "text-neutral-900" :" text-neutral-800"}`}>{item.icons}</p>
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className=" rounded-xl border bg-neutral-100 border-neutral-200">
              <div className=" p-2">
                <h1 className="text-neutral-800 font-semibold text-[14px]">{user.username}</h1>
                <span className="text-neutral-600 font-medium text-[12px]">{user.email}</span>
              </div>
              <Button
                onClick={logout}
                variant="destructive"
                className="w-full flex items-center gap-2 cursor-pointer font-semibold rounded-lg">
                <LogOut className="size-5 text-base" /> Logo out
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
