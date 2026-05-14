"use client";

import { useState } from "react";
import { Post, PostType, PostSection, TabType } from "@/types";
import { initialPosts } from "@/lib/mockData";
import { generateId } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import BoardView from "@/components/BoardView";
import HomeTab from "@/components/HomeTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const likedPosts = posts.filter((p) => p.likedByMe);
  const experiencePosts = posts.filter((p) => p.type === 'experience');
  const attitudePosts = posts.filter((p) => p.type === 'attitude');

  function handleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id !== id
          ? p
          : { ...p, likedByMe: !p.likedByMe, likes: p.likedByMe ? p.likes - 1 : p.likes + 1 }
      )
    );
  }

  function handleCreate(type: PostType, sections: PostSection[], anonymous: boolean) {
    const newPost: Post = {
      id: generateId(),
      type,
      sections,
      anonymous,
      author: '나',
      likes: 0,
      likedByMe: false,
      createdAt: new Date().toISOString(),
      isOwn: true,
    };
    setPosts((prev) => [newPost, ...prev]);
  }

  function handleUpdate(id: string, sections: PostSection[], anonymous: boolean) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id !== id ? p : { ...p, sections, anonymous }
      )
    );
  }

  function handleDelete(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="flex flex-col h-dvh">
      <div className="flex-1 overflow-hidden">
        {activeTab === 'attitude' && (
          <BoardView
            type="attitude"
            posts={attitudePosts}
            onLike={handleLike}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
        {activeTab === 'home' && (
          <HomeTab posts={posts} onLike={handleLike} />
        )}
        {activeTab === 'experience' && (
          <BoardView
            type="experience"
            posts={experiencePosts}
            onLike={handleLike}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
