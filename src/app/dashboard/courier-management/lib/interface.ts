export type TProduct = {
  _id: string;
  product: {
    _id: string;
    id: string;
    title: string;
    slug: string;
    image: {
      thumbnail: {
        src: string;
        alt: string;
      };
      gallery: string[];
    };
  };
  unitPrice: number;
  quantity: number;
  total: number;
};
