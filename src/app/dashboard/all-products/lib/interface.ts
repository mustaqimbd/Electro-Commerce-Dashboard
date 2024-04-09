export type TAllProducts = {
  _id: string;
  title: string;
  image: {
    _id: string;
    src: string;
    alt: string;
  };
  category: {
    _id: string;
    name: string;
  };
  price: number;
  sku: string;
  sales: number;
  stock: string;
  stockAvailable: number;
  totalReview: number;
  averageRating: number | null;
  published: string;
};
