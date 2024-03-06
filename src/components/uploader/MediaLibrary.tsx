import {
  setGallery,
  setThumbnail,
} from "@/redux/features/addProduct/addProductSlice";
import { useGetMediaImagesQuery } from "@/redux/features/addProduct/media/mediaApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { PagePagination } from "../pagination/PagePagination";
import { useState } from "react";
import { setVariationThumbnail } from "@/redux/features/addProduct/variation/variationSlice";

type TImage = { _id: string; src: string; alt: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MediaLibrary = ({ click, index }: { click?: string; index?: number }) => {
  const dispatch = useAppDispatch();
  const { thumbnail, gallery } = useAppSelector(
    ({ addProduct }) => addProduct.image
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const image = useAppSelector(
  //   ({ productVariation }) =>
  //     productVariation.variations[index || 0]?.image || {}
  // );

  const selectImage = (imageId: string) => {
    if (click === "thumbnail") {
      if (thumbnail === imageId) {
        dispatch(setThumbnail(""));
      } else {
        dispatch(setThumbnail(imageId));
      }
    }
    if (click === "variation") {
      if (thumbnail === imageId) {
        dispatch(setVariationThumbnail({ index: 0, image: "" }));
      } else {
        dispatch(setVariationThumbnail({ index: 0, image: imageId }));
      }
    }
    if (click === "gallery") {
      if (gallery.includes(imageId)) {
        const restItem = gallery.filter((item: string) => item !== imageId);
        dispatch(setGallery(restItem));
      } else {
        dispatch(setGallery([...gallery, imageId]));
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetMediaImagesQuery({
    page: currentPage,
    limit: 2,
    sort: "-createdAt",
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {click === "thumbnail" || click === "variation"
          ? data?.data?.map((image: TImage) => (
              <div
                key={image._id}
                onClick={() => selectImage(image._id)}
                className={`w-[140px] h-[140px] relative cursor-pointer rounded-sm ${thumbnail === image._id && "border-2 border-blue-600"}`}
              >
                <Image
                  src={`http://localhost:5000/${image.src}`}
                  alt={image.alt}
                  fill={true}
                  className="object-cover rounded-sm"
                  sizes="(max-width: 208px) 100vw,"
                />
                {thumbnail === image._id && (
                  <button className="bg-white text-green-500 absolute right-1 bottom-1 p-1 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
                    {/* <Cross2Icon className="h-5 w-5" /> */}
                    <CheckIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))
          : data?.data.map((image: TImage) => (
              <div
                key={image._id}
                onClick={() => selectImage(image._id)}
                className={`w-[140px] h-[140px] relative cursor-pointer rounded-sm ${gallery.includes(image._id) && "border-2 border-blue-600"}`}
              >
                <Image
                  src={`http://localhost:5000/${image.src}`}
                  alt={image.alt}
                  fill={true}
                  className="object-cover rounded-sm"
                  sizes="(max-width: 208px) 100vw,"
                />
                {gallery.includes(image._id) && (
                  <button className="bg-white text-green-500 absolute right-1 bottom-1 p-1 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
                    {/* <Cross2Icon className="h-5 w-5" /> */}
                    <CheckIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
      </div>
      {data?.meta?.totalPage > 1 && (
        <PagePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={data?.meta?.totalPage}
          className="mt-2"
        />
      )}
    </div>
  );
};

export default MediaLibrary;
