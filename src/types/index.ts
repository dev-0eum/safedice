export type PostType = 'experience' | 'attitude';
export type TabType = 'attitude' | 'home' | 'experience';

export interface PostSection {
  label: string;
  emoji: string;
  content: string;
}

export interface Post {
  id: string;
  type: PostType;
  sections: PostSection[];
  anonymous: boolean;
  author: string;
  likes: number;
  likedByMe: boolean;
  createdAt: string;
  isOwn: boolean;
}
