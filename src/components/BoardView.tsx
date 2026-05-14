"use client";

import { useState } from "react";
import { Post, PostType, PostSection } from "@/types";
import { formatRelativeDate } from "@/lib/utils";
import PostCard from "./PostCard";
import StepForm from "./StepForm";

type BoardMode = 'list' | 'detail' | 'create' | 'edit';

interface BoardViewProps {
  type: PostType;
  posts: Post[];
  onLike: (id: string) => void;
  onCreate: (type: PostType, sections: PostSection[], anonymous: boolean) => void;
  onUpdate: (id: string, sections: PostSection[], anonymous: boolean) => void;
  onDelete: (id: string) => void;
}

export default function BoardView({ type, posts, onLike, onCreate, onUpdate, onDelete }: BoardViewProps) {
  const [mode, setMode] = useState<BoardMode>('list');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const isExp = type === 'experience';
  const boardTitle = isExp ? '경험' : '태도';
  const boardSub = isExp ? '실패에서 배우다' : '성공을 나누다';
  const boardEmoji = isExp ? '🎲' : '💪';
  const selectedPost = posts.find((p) => p.id === selectedPostId) ?? null;
  const filteredPosts = filter === 'mine' ? posts.filter((p) => p.isOwn) : posts;

  const primaryColor = isExp
    ? { fab: 'bg-indigo-600 shadow-indigo-200', chip: 'bg-indigo-600', badge: 'bg-indigo-50 text-indigo-600', likeActive: 'bg-rose-50 border-rose-200 text-rose-500', likeDot: 'text-rose-500' }
    : { fab: 'bg-emerald-600 shadow-emerald-200', chip: 'bg-emerald-600', badge: 'bg-emerald-50 text-emerald-600', likeActive: 'bg-rose-50 border-rose-200 text-rose-500', likeDot: 'text-rose-500' };

  function handleCreate(sections: PostSection[], anonymous: boolean) {
    onCreate(type, sections, anonymous);
    setMode('list');
  }

  function handleUpdate(sections: PostSection[], anonymous: boolean) {
    if (!selectedPostId) return;
    onUpdate(selectedPostId, sections, anonymous);
    setMode('detail');
  }

  function handleDelete() {
    if (!selectedPostId) return;
    onDelete(selectedPostId);
    setDeleteConfirm(false);
    setSelectedPostId(null);
    setMode('list');
  }

  // ── Create / Edit ──────────────────────────────────────────
  if (mode === 'create' || mode === 'edit') {
    return (
      <div className="h-full">
        <StepForm
          type={type}
          initialSections={mode === 'edit' ? selectedPost?.sections : undefined}
          initialAnonymous={mode === 'edit' ? selectedPost?.anonymous : true}
          isEditing={mode === 'edit'}
          onSubmit={mode === 'create' ? handleCreate : handleUpdate}
          onCancel={() => setMode(mode === 'edit' ? 'detail' : 'list')}
        />
      </div>
    );
  }

  // ── Detail ─────────────────────────────────────────────────
  if (mode === 'detail' && selectedPost) {
    const post = selectedPost;
    return (
      <div className="flex flex-col h-full bg-[#f0f6ff]">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-slate-100 flex-shrink-0">
          <button
            onClick={() => { setMode('list'); setDeleteConfirm(false); }}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1" />
          {post.isOwn && !deleteConfirm && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMode('edit')}
                className="text-sm text-blue-500 font-semibold hover:text-blue-700"
              >
                수정
              </button>
              <button
                onClick={() => setDeleteConfirm(true)}
                className="text-sm text-slate-400 font-semibold hover:text-rose-500"
              >
                삭제
              </button>
            </div>
          )}
          {deleteConfirm && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">정말 삭제할까요?</span>
              <button
                onClick={handleDelete}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700"
              >
                삭제
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="text-xs font-semibold text-slate-400"
              >
                취소
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {/* Meta */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${primaryColor.badge}`}>
              {boardEmoji} {boardTitle}
            </span>
            <span className="text-xs text-slate-400">
              {post.anonymous ? '익명' : post.author} · {formatRelativeDate(post.createdAt)}
            </span>
          </div>

          {/* Sections */}
          {post.sections.map((section) => (
            <div key={section.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{section.emoji}</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{section.label}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{section.content}</p>
            </div>
          ))}

          {/* Like button */}
          <div className="flex justify-center pt-2 pb-4">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-all active:scale-95 ${
                post.likedByMe
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-400'
              }`}
            >
              <svg className="w-5 h-5" fill={post.likedByMe ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes}명이 공감했어요
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── List ───────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-[#f0f6ff]">
      {/* Board header */}
      <div className="px-4 pt-5 pb-4 bg-white border-b border-slate-100 flex-shrink-0">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs text-slate-400 font-medium">{boardSub}</p>
            <h2 className="text-xl font-bold text-slate-800">{boardEmoji} {boardTitle}</h2>
          </div>
          <span className="text-xs text-slate-400">{posts.length}개</span>
        </div>
        <div className="flex gap-2">
          {(['all', 'mine'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                filter === f
                  ? `${primaryColor.chip} text-white`
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? '전체' : '내 글'}
            </button>
          ))}
        </div>
      </div>

      {/* Post list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <span className="text-4xl mb-3">{boardEmoji}</span>
            <p className="text-sm text-slate-400">
              {filter === 'mine' ? '아직 작성한 글이 없어요.' : '첫 번째 이야기를 나눠주세요.'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onTap={() => { setSelectedPostId(post.id); setMode('detail'); }}
              onLike={() => onLike(post.id)}
            />
          ))
        )}
        <div className="h-16" />
      </div>

      {/* FAB */}
      <button
        onClick={() => setMode('create')}
        className={`fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl font-light transition-all active:scale-95 z-40 ${primaryColor.fab}`}
        aria-label="새 글 작성"
      >
        +
      </button>
    </div>
  );
}
