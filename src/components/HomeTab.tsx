"use client";

import { useState } from "react";
import { Post } from "@/types";
import { formatRelativeDate } from "@/lib/utils";
import PostCard from "./PostCard";

const USER = {
  name: "김안전",
  handle: "@safe_dicer",
  bio: "실패에서 배우고, 태도로 성장하는 중 🎲\n작은 깨달음이 모여 큰 변화를 만든다고 믿어요.",
  initial: "김",
};

interface HomeTabProps {
  posts: Post[];
  onLike: (id: string) => void;
}

export default function HomeTab({ posts, onLike }: HomeTabProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const likedPosts = posts.filter((p) => p.likedByMe);
  const ownPosts = posts.filter((p) => p.isOwn);
  const receivedLikes = ownPosts.reduce((sum, p) => sum + p.likes, 0);

  const selectedPost = selectedPostId ? posts.find((p) => p.id === selectedPostId) ?? null : null;

  // ── Detail view ────────────────────────────────────────────
  if (selectedPost) {
    return (
      <div className="flex flex-col h-full bg-[#f0f6ff]">
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100 flex-shrink-0">
          <button
            onClick={() => setSelectedPostId(null)}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-base font-bold text-slate-800">좋아요한 글</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              selectedPost.type === "experience"
                ? "bg-indigo-50 text-indigo-600"
                : "bg-emerald-50 text-emerald-600"
            }`}>
              {selectedPost.type === "experience" ? "🎲 경험" : "💪 태도"}
            </span>
            <span className="text-xs text-slate-400">
              {selectedPost.anonymous ? "익명" : selectedPost.author} ·{" "}
              {formatRelativeDate(selectedPost.createdAt)}
            </span>
          </div>

          {selectedPost.sections.map((section) => (
            <div key={section.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{section.emoji}</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {section.label}
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{section.content}</p>
            </div>
          ))}

          <div className="flex justify-center pt-2 pb-6">
            <button
              onClick={() => onLike(selectedPost.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-all active:scale-95 ${
                selectedPost.likedByMe
                  ? "bg-rose-50 border-rose-200 text-rose-500"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-400"
              }`}
            >
              <svg className="w-5 h-5" fill={selectedPost.likedByMe ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {selectedPost.likes}명이 공감했어요
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-[#f0f6ff] overflow-y-auto">
      {/* Banner + Profile */}
      <div className="relative bg-white flex-shrink-0">
        {/* Avatar + Info */}
        <div className="px-4 pb-5 pt-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200 border-2 border-white flex-shrink-0">
                <span className="text-2xl font-bold text-white">{USER.initial}</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 leading-tight">{USER.name}</h2>
                <p className="text-xs text-slate-400">{USER.handle}</p>
              </div>
            </div>
            <button className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors self-start">
              프로필 편집
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{USER.bio}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-slate-100 border-t border-slate-100">
          {[
            { label: "작성한 글", value: ownPosts.length, icon: "✏️", color: "text-blue-600" },
            { label: "좋아요한 글", value: likedPosts.length, icon: "❤️", color: "text-rose-500" },
            { label: "받은 공감", value: receivedLikes, icon: "✨", color: "text-amber-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white flex flex-col items-center justify-center py-4 gap-0.5">
              <span className="text-base leading-none">{stat.icon}</span>
              <span className={`text-xl font-bold leading-tight ${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] text-slate-400 leading-none">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity summary */}
      <div className="px-4 pt-5 pb-2 flex-shrink-0">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-sm">💪</span>
              <span className="text-xs font-semibold text-slate-500">태도 (성공)</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">
              {ownPosts.filter((p) => p.type === "attitude").length}
              <span className="text-xs font-normal text-slate-400 ml-1">편</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">내가 공유한 성공 경험</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-sm">🎲</span>
              <span className="text-xs font-semibold text-slate-500">경험 (실패)</span>
            </div>
            <p className="text-2xl font-bold text-indigo-600">
              {ownPosts.filter((p) => p.type === "experience").length}
              <span className="text-xs font-normal text-slate-400 ml-1">편</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">내가 나눈 실패 경험</p>
          </div>
        </div>
      </div>

      {/* Liked posts section */}
      <div className="px-4 pt-4 pb-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-sm font-bold text-slate-700">좋아요한 이야기</h3>
          </div>
          <span className="text-xs text-slate-400">{likedPosts.length}개</span>
        </div>

        {likedPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 py-10 px-4 flex flex-col items-center text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">아직 좋아요한 글이 없어요</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              태도·경험 탭에서 마음에 드는 이야기에<br />공감 버튼을 눌러보세요
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {likedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onTap={() => setSelectedPostId(post.id)}
                onLike={() => onLike(post.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
