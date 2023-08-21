export interface BookProduct {
  id: string,
  name: string,
  images: string[],
  created: number,
  description: string,

  metadata: {
    author: string,
    rating: number,
    originalPrice: number
  },
  default_price: {
    unit_amount: number,
    id: string
  },
  sku: string
}

export interface ReviewType {
  id: number,
  name: string,
  rating: number,
  product_id: string,
  review: string,
  date: number
}

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          name: string;
          rating: number;
          review: string;
          product_id: string;
          date: number
        };
        Insert: {
          id: string;
          name: string;
          rating: number;
          review: string;
          product_id: string;
          date: number
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}