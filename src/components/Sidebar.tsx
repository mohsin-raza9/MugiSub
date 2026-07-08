'use client';

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Search,
  Calendar,
  Clock,
  Shuffle,
  Flame,
  Tv,
  Film,
  MonitorPlay,
  Gamepad2,
  Clapperboard,
  ShieldCheck,
  Users,
  Mail,
  FileText,
  Info,
  TriangleAlert,
  CircleDollarSign,
  LogIn,
  ArrowRight,
  LogOut,
  X,
  LayoutDashboard,
  Home,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const iconColor = "#3b5998";
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSidebarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authClient.signIn.email({
        email,
        password,
      }, {
        onError: (ctx) => {
          setError(ctx.error.message);
        }
      });
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const sections = [
    {
      title: "MENU",
      items: [
        { label: "Home", href: "/", icon: Home },
        { label: "Search", href: "/search", icon: Search },
        { label: "Season Chart", href: "/season-chart", icon: Calendar },
        { label: "Schedule", href: "/schedule", icon: Clock },
        { label: "Random", href: "/random", icon: Shuffle },
      ],
    },
    {
      title: "BROWSE",
      items: [
        { label: "Latest", href: "/latest", icon: Flame },
        { label: "Anime", href: "/anime", icon: Tv },
        { label: "Movies", href: "/movies", icon: Film },
        { label: "TV Shows", href: "/tv-shows", icon: MonitorPlay },
        { label: "Games", href: "/games", icon: Gamepad2 },
        { label: "Series", href: "/series", icon: Clapperboard },
        { label: "Creators", href: "/creators", icon: Users },
        ...(session ? [{ label: "Admin", href: "/admin", icon: LayoutDashboard }] : []),
      ],
    },
    // {
    //   title: "USER DATA",
    //   items: [
           
    //     { label: "Profile", href: "/user/profile", icon: Users },
    //     { label: "My List", href: "/user/list", icon: List },
    //     { label: "My Favourites", href: "/user/favourites", icon: Star },
    //     { label: "My Messages", href: "/user/messages", icon: Mail },
    //     { label: "My Notifies", href: "/user/notifies", icon: Bell },
    //     { label: "My Clubs", href: "/user/clubs", icon: FolderPlus },
    //     { label: "Download", href: "/export", icon: Download },
    //   ],
    // },
    {
      title: "INFO",
      items: [
        { label: "About Us", href: "/about-us", icon: Info },
        { label: "Contact Us", href: "/contact-us", icon: Mail },
        { label: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
        { label: "Disclaimer", href: "/disclaimer", icon: TriangleAlert },
        { label: "Terms & Conditions", href: "/terms-and-conditions", icon: FileText },
      ],
    },
  ];

  return (
    <>
      {/* Desktop Sidebar: remains exactly as-is */}
      <div className="hidden lg:block w-[125px] h-[680px] mt-8.5 bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] text-[11px] font-sans text-[#1a2536] shrink-0 leading-tight static top-0">
        {sections
          .filter((section) => {
            if (
              !session &&
              (section.title === "USER DATA")
            ) {
              return false;
            }

            return true;
          })
          .map((section) => (
            <div key={section.title}>
              <div className="bg-[#2e384d] w-full max-w-[150px] text-[#ddd] font-bold uppercase tracking-wide px-2 py-[5px] border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] border-[#1f2635]">
                {section.title}
              </div>
              <ul className="flex flex-col m-0 py-2 text-[12px] shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] text-black list-none ">
                {section.items.map((item) => (
                  <li key={item.label} className="hover:bg-[#34394d] hover:text-white [&.is-active]:bg-[#34394d] [&.is-active]:text-white ">
                    <Link href={item.href} className="flex items-center px-2 py-1 gap-1.5">
                      <item.icon size={15} color={(item as any).color || iconColor} className="shrink-0 font-bold" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {/* REGISTER OR LOGIN CARD */}
        <div>
          {session ? (
            /* User Profile Logged-in View */
            <>
              <div className="bg-[#2e384d] w-full text-[#ddd] font-bold uppercase tracking-wide px-2 py-[5px] border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] border-[#1f2635]">
                LOGGED IN
              </div>
              <div className="bg-[#bdbfc3] w-full p-2 flex flex-col gap-1 text-[11px] text-black">
                <span className="font-bold truncate text-[#a11f1f]">{session.user.name}</span>
                <span className="text-[10px] truncate">{session.user.email}</span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full h-6 mt-2 bg-[#800] hover:bg-[#a00] text-white py-[3px] flex items-center justify-center gap-1.5 transition-colors font-bold text-[11px]"
                >
                  <LogOut size={14} color="#ffffff" className="shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            /* Standard Login Form Form View */
            <form onSubmit={handleSidebarLogin}>
              <div className="bg-[#2e384d] w-full text-[#ddd] font-bold uppercase tracking-wide px-2 py-[5px] border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] border-[#1f2635]">
                REGISTER/LOGIN
              </div>
              <div className="bg-[#bdbfc3] w-full p-2 flex flex-col gap-1.5">
                {/* Action Link Rows */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <LogIn size={14} color="#1f5da1" className="shrink-0" />
                    <Link href="/auth" className="text-[12px] text-black hover:underline font-normal">
                      Login / Register
                    </Link>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-1 mt-0.5">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#f0f5ff] border border-[#999999] px-1 py-[2px] text-[11px] text-black outline-none focus:border-[#555]"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#f0f5ff] border border-[#999999] px-1 py-[2px] text-[11px] text-black outline-none focus:border-[#555]"
                  />
                </div>

                {error && (
                  <div className="text-red-700 text-[9px] font-bold bg-red-100 p-1 border border-red-300 max-w-full break-words">
                    {error}
                  </div>
                )}

                {/* Remember Me / Stay Logged In */}
                <div className="flex items-center gap-1.5">
                  <label className="flex items-center gap-1 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-3 h-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-[10px] text-black">stay logged in</span>
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-[3px] flex items-center justify-center gap-1.5 transition-colors font-bold text-xs disabled:opacity-50"
                >
                  <ArrowRight size={12} color="#ffffff" className="shrink-0" />
                  <span>{loading ? "..." : "Login"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Mobile Drawer (visible only on mobile lg:hidden) */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[260px] bg-[#bdbfc3] shadow-2xl transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col font-sans text-[#1a2536]`}>
        <div className="flex items-center justify-between bg-[#2e384d] text-[#ddd] px-3 py-[7px] border-b border-[#1f2635]">
          <span className="font-bold uppercase tracking-wide text-[12px]">Navigation</span>
          <button onClick={onClose} className="text-[#ddd] hover:text-white p-1" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-6">
          {sections
            .filter((section) => {
              if (
                !session &&
                (section.title === "USER DATA")
              ) {
                return false;
              }

              return true;
            })
            .map((section) => (
              <div key={section.title}>
                <div className="bg-[#2e384d] w-full text-[#ddd] font-bold uppercase tracking-wide px-3 py-[7px] border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] border-[#1f2635] text-[11px]">
                  {section.title}
                </div>
                <ul className="flex flex-col m-0 py-2 text-[12px] shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] text-black list-none">
                  {section.items.map((item) => (
                    <li key={item.label} className="hover:bg-[#34394d] hover:text-white [&.is-active]:bg-[#34394d] [&.is-active]:text-white">
                      <Link href={item.href} onClick={onClose} className="flex items-center px-3 py-2 gap-2">
                        <item.icon size={16} color={(item as any).color || iconColor} className="shrink-0 font-bold" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {/* REGISTER OR LOGIN CARD (Mobile) */}
          <div>
            {session ? (
              <>
                <div className="bg-[#2e384d] w-full text-[#ddd] font-bold uppercase tracking-wide px-3 py-[7px] border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] border-[#1f2635] text-[11px]">
                  LOGGED IN
                </div>
                <div className="bg-[#bdbfc3] w-full p-3 flex flex-col gap-1.5 text-[11px] text-black">
                  <span className="font-bold truncate text-[#a11f1f] text-[12px]">{session.user.name}</span>
                  <span className="text-[10px] truncate">{session.user.email}</span>

                  <button
                    type="button"
                    onClick={() => { handleLogout(); onClose?.(); }}
                    className="w-full h-8 mt-2 bg-[#800] hover:bg-[#a00] text-white py-[3px] flex items-center justify-center gap-1.5 transition-colors font-bold text-[11px]"
                  >
                    <LogOut size={14} color="#ffffff" className="shrink-0" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={(e) => { handleSidebarLogin(e); onClose?.(); }}>
                <div className="bg-[#2e384d] w-full text-[#ddd] font-bold uppercase tracking-wide px-3 py-[7px] border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] border-[#1f2635] text-[11px]">
                  REGISTER OR LOGIN
                </div>
                <div className="bg-[#bdbfc3] w-full p-3 flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 py-1">
                      <LogIn size={14} color="#1f5da1" className="shrink-0" />
                      <Link href="/auth" onClick={onClose} className="text-[12px] text-black hover:underline font-normal">
                        Login / Register
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#f0f5ff] border border-[#999999] px-2 py-1.5 text-[12px] text-black outline-none focus:border-[#555]"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-[#f0f5ff] border border-[#999999] px-2 py-1.5 text-[12px] text-black outline-none focus:border-[#555]"
                    />
                  </div>

                  {error && (
                    <div className="text-red-700 text-[10px] font-bold bg-red-100 p-1.5 border border-red-300 max-w-full break-words">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <label className="flex items-center gap-1.5 select-none cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-[11px] text-black">stay logged in</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-8 bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-[3px] flex items-center justify-center gap-1.5 transition-colors font-bold text-xs disabled:opacity-50"
                  >
                    <ArrowRight size={12} color="#ffffff" className="shrink-0" />
                    <span>{loading ? "..." : "Login"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div onClick={onClose} className="lg:hidden fixed inset-0 z-40 bg-black/40" />
      )}
    </>
  );
}
