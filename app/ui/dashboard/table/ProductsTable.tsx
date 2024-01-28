// ProductsTable.js
"use client";

import React from "react";
import { PagePagination } from "../../utilities/pagination/PagePagination";

interface DynamicPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (pageNumber: number) => void;
}

const ProductsTable = () => {
  const productsData = [
    {
      id: 1,
      image: "product1.jpg",
      title: "Product One",
      sku: "SKU001",
      stock: 50,
      price: 29.99,
      sales: 200,
      rating: 4.5,
      published: true,
    },
    {
      id: 2,
      image: "product2.jpg",
      title: "Product Two",
      sku: "SKU002",
      stock: 30,
      price: 39.99,
      sales: 150,
      rating: 4.2,
      published: false,
    },
    {
      id: 3,
      image: "product3.jpg",
      title: "Product Three",
      sku: "SKU003",
      stock: 20,
      price: 49.99,
      sales: 100,
      rating: 4.8,
      published: true,
    },
    {
      id: 4,
      image: "product4.jpg",
      title: "Product Forun",
      sku: "SKU004",
      stock: 25,
      price: 449.99,
      sales: 110,
      rating: 5,
      published: true,
    },
    {
      id: 5,
      image: "product5.jpg",
      title: "Product Five",
      sku: "SKU004",
      stock: 30,
      price: 89.99,
      sales: 250,
      rating: 5,
      published: true,
    },
  ];

  // Checkbox functionality for checking all
  const checkAll = (e) => {
    const checkboxes = document.querySelectorAll(".form-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  //pagination

  const [active, setActive] = React.useState(1);
  const productsPerPage = 3;
  const toltalPage = Math.ceil(productsData.length / productsPerPage);
  const startIndex = (active - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productsData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto bg-white mt-4 ">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={checkAll}
                />
              </th>
              <th className="p-2">Image</th>
              <th className="p-2">Product Title</th>
              <th className="p-2">SKU</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Price</th>
              <th className="p-2">Sales</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Published</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="p-2">
                  <img
                    src={product.image}
                    alt="Product Image"
                    className="w-12 h-12"
                  />
                </td>
                <td className="p-2">{product.title}</td>
                <td className="p-2">{product.sku}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">${product.price.toFixed(2)}</td>
                <td className="p-2">{product.sales}</td>
                <td className="p-2">{product.rating}</td>
                <td className="p-2">{product.published ? "Yes" : "No"}</td>
                <td className="p-2">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    {/* View Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
                  <button className="text-green-500 hover:text-green-700 mr-2">
                    {/* Edit Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    {/* Delete Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" flex justify-end p-4">
          <PagePagination
            active={active}
            setActive={setActive}
            toltalPage={toltalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
