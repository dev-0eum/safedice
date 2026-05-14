"use client";

import { Post } from "@/types";
import { formatRelativeDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  onTap: () => void;
  onLike: () => void;
}

export default function PostCard({ post, onTap, onLike }: PostCardProps) {
  const isExperience = post.type === 'experience';
  const firstSection = post.sections[0];

  return (
    <div
      onClick={onTap}
      className={`bg-white rounded-2xl border border-slate-100 p-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer border-l-4 ${
        isExperience ? 'border-l-indigo-400' : 'border-l-emerald-400'
      }`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          isExperience
            ? 'bg-indigo-50 text-indigo-600'
            : 'bg-emerald-50 text-emerald-600'
        }`}>
          {firstSection.emoji} {firstSection.label}
        </span>
        {post.isOwn && (
          <span className="ml-auto text-[10px] text-blue-400 font-medium">내 글</span>
        )}
      </div>

      <p className="text-sm text-slate-700 leading-relaxed line-clamp-2 mb-3">
        {firstSection.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>{post.anonymous ? '익명' : post.author}</span>
          <span className="text-slate-200">·</span>
          <span>{formatRelativeDate(post.createdAt)}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onLike(); }}
          className={`flex items-center gap-1 text-xs font-medium transition-colors px-2 py-1 rounded-full ${
            post.likedByMe
              ? 'text-rose-500 bg-rose-50'
              : 'text-slate-400 hover:text-rose-400 hover:bg-rose-50'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill={post.likedByMe ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {post.likes}
        </button>
      </div>
    </div>
  );
}
