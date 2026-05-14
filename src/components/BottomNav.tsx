"use client";

import { TabType } from "@/types";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string; sub: string; icon: React.ReactNode; activeColor: string }[] = [
  {
    id: 'attitude',
    label: '태도',
    sub: '성공',
    activeColor: 'text-emerald-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        <path d="M9.5 14.5v-5c0-.83-.67-1.5-1.5-1.5S6.5 8.67 6.5 9.5v5" />
        <path d="M3.5 14.5H5V13c0-.83-.67-1.5-1.5-1.5S2 12.17 2 13s.67 1.5 1.5 1.5z" />
        <path d="M20 18.5c0 2.49-2.01 4.5-4.5 4.5h-7C6.01 23 4 20.99 4 18.5V14h16v4.5z" />
      </svg>
    ),
  },
  {
    id: 'home',
    label: '홈',
    sub: '',
    activeColor: 'text-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: '경험',
    sub: '실패',
    activeColor: 'text-indigo-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="h-16 bg-white border-t border-slate-100 flex items-stretch flex-shrink-0 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive ? tab.activeColor : 'text-slate-400'
            }`}
          >
            <span className={`transition-transform ${isActive ? 'scale-110' : 'scale-100'}`}>
              {tab.icon}
            </span>
            <span className="text-[10px] font-semibold leading-none">{tab.label}</span>
            {tab.sub && (
              <span className={`text-[9px] leading-none ${isActive ? 'opacity-60' : 'opacity-0'}`}>
                {tab.sub}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
