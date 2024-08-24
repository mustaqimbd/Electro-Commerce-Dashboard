import config from "@/config/config";
import { setVariationThumbnail } from "@/redux/features/addProduct/variation/variationSlice";
import {
  setGallery,
  setThumbnail,
} from "@/redux/features/imageSelector/imageSelectorSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { PagePagination } from "../pagination/PagePagination";
import { useGetImagesQuery } from "@/redux/features/imageSelector/imageApi";

type TImage = { _id: string; src: string; alt: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MediaLibrary = ({ click, index }: { click?: string; index?: number }) => {
  const dispatch = useAppDispatch();
  const { thumbnail, gallery } = useAppSelector(
    ({ imageSelector }) => imageSelector
  );

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
      } else if (gallery.length === 5) {
        alert("You can select maximum 5 gallery images");
      } else {
        dispatch(setGallery([...gallery, imageId]));
      }
    }
  };

  const { page, limit } = useAppSelector(({ pagination }) => pagination);

  const { data } = useGetImagesQuery({
    page,
    limit,
    sort: "-createdAt",
  });

  return (
    <>
      <div className="flex flex-wrap gap-4 p-2">
        {click === "thumbnail" || click === "variation"
          ? data?.data?.map((image: TImage) => (
              <div
                key={image._id}
                onClick={() => selectImage(image._id)}
                className={`w-[140px] h-[140px] relative cursor-pointer rounded-sm ${thumbnail === image._id && "border-2 border-blue-600"}`}
              >
                <Image
                  src={`${config.base_url}/${image.src}`}
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
          : data?.data?.map((image: TImage) => (
              <div
                key={image._id}
                onClick={() => selectImage(image._id)}
                className={`w-[140px] h-[140px] relative cursor-pointer rounded-sm ${gallery.includes(image._id) && "border-2 border-blue-600"}`}
              >
                <Image
                  src={`${config.base_url}/${image.src}`}
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
      <div className="flex items-center justify-end space-x-2 py-4 h-40">
        {data?.meta?.totalPage > 1 && <PagePagination />}
      </div>
    </>
  );
};

export default MediaLibrary;
