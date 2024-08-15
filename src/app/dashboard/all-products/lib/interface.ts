export type TAllProducts = {
  _id: string;
  title: string;
  thumbnail: {
    _id: string;
    src: string;
    alt: string;
  };
  category: {
    _id: string;
    name: string;
  };
  regularPrice: number;
  salePrice: number;
  sku: string;
  sales: number;
  stockStatus: string;
  stockAvailable: number;
  totalReview: number;
  averageRating: number | null;
  published: string;
};
