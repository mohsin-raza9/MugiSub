import React from 'react';
import Link from 'next/link';
import {
  Tv,
  Play,
  User,
  Users,
  Download,
  FileText,
  MessageCircle,
  Wrench,
  AlertTriangle,
  Building,
  Star,
  Mic
} from 'lucide-react';

interface QuickActionProps {
  href: string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  borderColorClass: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ href, label, icon: Icon, iconColor, borderColorClass }) => {
  return (
    <Link
      href={href}
      className={`bg-[#0d111a] border border-[#1d2433] ${borderColorClass} p-2.5 flex flex-col items-center justify-center gap-2 transition-all duration-300 text-center cursor-pointer group rounded-sm`}
    >
      <Icon className={`w-5 h-5 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
      <span className="text-[10px] text-slate-400 font-mono font-bold leading-none select-none tracking-wide">
        {label}
      </span>
    </Link>
  );
};

export default function QuickActions() {
  const actions = [
    {
      href: "/admin/anime/add",
      label: "Add Anime",
      icon: Tv,
      iconColor: "text-purple-400",
      borderColorClass: "hover:border-purple-500/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    },
    {
      href: "/admin/episodes/add",
      label: "Add Episode",
      icon: Play,
      iconColor: "text-cyan-400",
      borderColorClass: "hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]",
    },
    {
      href: "/admin/releases/add",
      label: "Add Release",
      icon: Download,
      iconColor: "text-amber-400",
      borderColorClass: "hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(251,191,36,0.2)]",
    },
    {
      href: "/admin/characters/add",
      label: "Add Character",
      icon: User,
      iconColor: "text-emerald-400",
      borderColorClass: "hover:border-emerald-500/50 hover:shadow-[0_0_10px_rgba(52,211,153,0.2)]",
    },
    {
      href: "/admin/creators/add",
      label: "Add Creator",
      icon: Mic,
      iconColor: "text-lime-400",
      borderColorClass: "hover:border-lime-500/50 hover:shadow-[0_0_10px_rgba(163,230,53,0.2)]",
    },
    {
      href: "/admin/studios/add",
      label: "Add Studio",
      icon: Building,
      iconColor: "text-indigo-400",
      borderColorClass: "hover:border-indigo-500/50 hover:shadow-[0_0_10px_rgba(129,140,248,0.2)]",
    },
    {
      href: "/admin/news/add",
      label: "News Post",
      icon: FileText,
      iconColor: "text-pink-400",
      borderColorClass: "hover:border-pink-500/50 hover:shadow-[0_0_10px_rgba(244,114,182,0.2)]",
    },
    {
      href: "/admin/forums/moderate",
      label: "Forums",
      icon: MessageCircle,
      iconColor: "text-teal-400",
      borderColorClass: "hover:border-teal-500/50 hover:shadow-[0_0_10px_rgba(45,212,191,0.2)]",
    },
    {
      href: "/admin/reviews/moderate",
      label: "Reviews",
      icon: Star,
      iconColor: "text-orange-400",
      borderColorClass: "hover:border-orange-500/50 hover:shadow-[0_0_10px_rgba(251,146,60,0.2)]",
    },
    {
      href: "/admin/requests",
      label: "Edit Req",
      icon: Wrench,
      iconColor: "text-yellow-400",
      borderColorClass: "hover:border-yellow-500/50 hover:shadow-[0_0_10px_rgba(250,204,21,0.2)]",
    },
    {
      href: "/admin/reports",
      label: "Reports",
      icon: AlertTriangle,
      iconColor: "text-rose-400",
      borderColorClass: "hover:border-rose-500/50 hover:shadow-[0_0_10px_rgba(244,63,94,0.2)]",
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: Users,
      iconColor: "text-violet-400",
      borderColorClass: "hover:border-violet-500/50 hover:shadow-[0_0_10px_rgba(139,92,246,0.2)]",
    },
  ];

  return (
    <div className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col gap-4 rounded-sm">
      <div className="border-b border-[#1d2433] pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
          <span className="inline-block w-1 h-3.5 bg-cyan-400"></span>
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {actions.map((action, idx) => (
          <QuickAction key={idx} {...action} />
        ))}
      </div>
    </div>
  );
}
