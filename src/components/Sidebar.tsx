import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  Shuffle,
  Flame,
  Tv,
  User,
  Shield,
  Users,
  Layers,
  Network,
  Music,
  Tag,
  Home,
  List,
  Star,
  Mail,
  Bell,
  MessageSquare,
  ThumbsUp,
  Heart,
  FolderPlus,
  FileText,
  HelpCircle,
  Info,
  ScrollText,
  Upload,
  Download,
  Wrench,
  MessageCircle,
  CircleHelp,
  MessageSquareText,
  TriangleAlert,
  Terminal,
  BadgeCheck,
  CircleDollarSign,
  LogIn,
  UserPlus,
  ArrowRight,
} from "lucide-react";


export default function Sidebar() {
  const iconColor = "#3b5998";

  const sections = [
    {
      title: "MENU",
      items: [
        { label: "Search", href: "/search", icon: Search },
        { label: "Season Chart", href: "/season-chart", icon: Calendar },
        { label: "Schedule", href: "/schedule", icon: Clock },
        { label: "Random", href: "/random", icon: Shuffle },
      ],
    },
    {
      title: "CONTENT",
      items: [
        { label: "Latest", href: "/latest", icon: Flame },
        { label: "Anime", href: "/anime", icon: Tv },
        { label: "Characters", href: "/characters", icon: User },
        { label: "Clubs", href: "/clubs", icon: Shield },
        { label: "Creators", href: "/creators", icon: Users },
        { label: "Collections", href: "/collections", icon: Layers },
        { label: "Groups", href: "/groups", icon: Network },
        { label: "Songs", href: "/songs", icon: Music },
        { label: "Tags", href: "/tags", icon: Tag },
        { label: "Users", href: "/users", icon: Users },
      ],
    },
    {
      title: "USER DATA",
      items: [
        { label: "My Place", href: "/user/place", icon: Home },
        { label: "My List", href: "/user/list", icon: List },
        { label: "My Favourites", href: "/user/favourites", icon: Star },
        { label: "My Messages", href: "/user/messages", icon: Mail },
        { label: "My Notifies", href: "/user/notifies", icon: Bell },
        { label: "My Reviews", href: "/user/reviews", icon: MessageSquare },
        { label: "My Votes", href: "/user/votes", icon: ThumbsUp },
        { label: "My Wishlist", href: "/user/wishlist", icon: Heart },
        { label: "My Clubs", href: "/user/clubs", icon: FolderPlus },
        { label: "My Entries", href: "/user/entries", icon: FileText },
        { label: "My Hints", href: "/user/hints", icon: HelpCircle },
        { label: "My Reports", href: "/user/reports", icon: Info },
        { label: "My Signatures", href: "/user/signatures", icon: ScrollText },
        { label: "Import", href: "/import", icon: Upload },
        { label: "Export", href: "/export", icon: Download },
      ],
    },
    {
      title: "MODERATE",
      items: [
        { label: "Creas", href: "/moderate/creas", icon: Wrench },
        { label: "Mod Latest", href: "/moderate/latest", icon: Clock },
      ],
    },
    {
      title: "SUPPORT",
      items: [
        { label: "Forum", href: "/forum", icon: MessageCircle },
        { label: "Help", href: "/help", icon: CircleHelp },
        { label: "IRC", href: "/irc", icon: MessageSquareText },
        { label: "Report Error", href: "/report", icon: TriangleAlert },
        { label: "Software", href: "/software", icon: Terminal },
        { label: "Staff", href: "/staff", icon: BadgeCheck },
      ],
    },
    {
      title: "TERMS & POLICIES",
      items: [
        { label: "Donate", href: "/donate", icon: CircleDollarSign },
        { label: "Credits", href: "/credits", icon: Info },
        { label: "Policies", href: "/policies", icon: FileText },
      ],
    },
  ];

  return (
    <div className="w-[125px] h-[1300px] mt-8 bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] text-[11px] font-sans text-[#1a2536] shrink-0 leading-tight static top-0">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="bg-[#2e384d] w-[134px] text-[#ddd] font-bold uppercase tracking-wide px-2 py-[5px] border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] border-[#1f2635]">
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
      <div className="w-127">
        <div className="bg-[#2b2f3d] w-[130px] text-[#e1e5f0] font-bold uppercase tracking-wide px-2 py-[5px] border-b border-[#1f2635] text-[11px]">
          REGISTER OR LOGIN
        </div>
        <div className="bg-[#bdbfc3] w-[127px] p-2 flex flex-col gap-1.5">
          {/* Action Link Rows */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <LogIn size={11} color="#1f5da1" className="shrink-0" />
              <Link href="/login" className="text-[12px] text-black hover:underline font-normal">
                Login
              </Link>
            </div>
            <div className="flex items-center gap-1.5">
              <UserPlus size={11} color="#1f5da1" className="shrink-0" />
              <Link href="/register" className="text-[12px] text-black hover:underline font-normal">
                Register
              </Link>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-1 mt-0.5">
            <input
              type="text"
              defaultValue="Username or Email"
              className="w-full bg-[#f0f5ff] border border-[#999999] px-1 py-[2px] text-[11px] text-black outline-none focus:border-[#555]"
            />
            <input
              type="password"
              defaultValue="Password"
              className="w-full bg-[#f0f5ff] border border-[#999999] px-1 py-[2px] text-[11px] text-black outline-none focus:border-[#555]"
            />
          </div>

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
            className="w-full bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-[3px] flex items-center justify-center gap-1.5 transition-colors font-bold text-xs"
          >
            <ArrowRight size={12} color="#ffffff" className="shrink-0" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
