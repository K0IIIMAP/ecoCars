export type User = {
  avatar_url: string;
  created_at: string;
  email: string;
  favourites: string[] | null;
  id: string;
  name: string | null;
  phone: string | null;
  post_tokens: number;
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
