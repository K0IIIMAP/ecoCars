export type User = {
  avatar_url: string | null;
  created_at: string;
  email: string;
  id: string;
  name: string | null;
  phone: string | null;
  posts_left: number;
};

export type Car = {
  created_at: string;
  description: string;
  featured: boolean;
  id: string;
  location: string;
  phone: string;
  photos: string[];
  price: number;
  title: string;
  user_id: string;
  username: string;
  views: number;
};
