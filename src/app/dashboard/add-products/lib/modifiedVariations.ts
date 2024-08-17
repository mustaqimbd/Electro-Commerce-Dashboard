import { TProduct } from "@/redux/features/addProduct/interface";
import { TVariation } from "@/redux/features/addProduct/variation/interface";

const modifiedVariations = (variations: TVariation[], product: TProduct) => {
  return [...variations].map(({ attributes, price, inventory }) => {
    const { regularPrice, salePrice, discountPercent } = product.price;
    const { hideStock, stockQuantity, stockStatus } = product.inventory;

    const modifiedPrice = { ...price };
    const modifiedInventory = { ...inventory };

    const save = regularPrice - (salePrice || 0);
    modifiedPrice.save = save === regularPrice ? 0 : save;

    if (!modifiedPrice.regularPrice) {
      modifiedPrice.regularPrice = regularPrice;
    }
    if (!modifiedPrice.salePrice) {
      modifiedPrice.salePrice = salePrice;
    }
    if (!modifiedPrice.discountPercent) {
      modifiedPrice.discountPercent = discountPercent;
    }

    // if (modifiedInventory.sku === "") {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     delete (modifiedInventory as any).sku;
    // }
    if (!modifiedInventory.stockStatus) {
      modifiedInventory.stockStatus = stockStatus;
    }
    if (!modifiedInventory.stockQuantity) {
      modifiedInventory.stockQuantity = stockQuantity;
    }
    if (!modifiedInventory.hideStock && hideStock) {
      modifiedInventory.hideStock = hideStock;
    }

    return { attributes, price: modifiedPrice, inventory: modifiedInventory };
  });
};

export default modifiedVariations;
