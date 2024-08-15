export type TProduct = {
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

export type TProductsInitialState = {
  products: TProduct[];
  selectedStatus: string;
  bulkProducts: {
    productsIds: string[];
  };
  search: boolean;
  searchQuery: string;
  searchedProducts: TProduct[];
  productDataErrors: string[];
};
