"use client";
import { TypographyH4 } from "@/components/ui/Typography";
import { SectionTitle } from "@/components/ui/sectionTitle";
import ImageSelectPopup from "@/components/uploader/ImageSelectPopup";
import config from "@/config/config";
import { useGetSingleImageQuery } from "@/redux/features/addProduct/media/mediaApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useState } from "react";

type TCategoryImage = {
  src: string;
};

const UpdateCategoryMedia = ({ image }: { image: TCategoryImage }) => {
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState<string>("");
  const handleOpen = () => {
    setOpen(!open);
  };

  const { thumbnail } = useAppSelector(({ imageSelector }) => imageSelector);

  const { data: thumbnailImage } = useGetSingleImageQuery(
    thumbnail || undefined
  );

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex flex-col justify-evenly">
          <SectionTitle className="text-left w-full">
            Add Thumbnail
          </SectionTitle>
          <div
            onClick={() => {
              handleOpen();
              setClick("thumbnail");
            }}
            className="flex flex-col items-center justify-center mx-auto mt-5 bg-gray-200 w-48 h-48 border border-dotted  border-blue-gray-200 cursor-pointer relative rounded-sm"
          >
            {thumbnailImage?.data ? (
              <Image
                src={`   ${config.base_url}/${thumbnailImage.data.src}`}
                alt={thumbnailImage.data.alt}
                fill={true}
                className="object-cover rounded-sm"
                sizes="(max-width: 208px) 100vw,"
              />
            ) : (
              <Image
                src={`   ${config.base_url}/${image?.src}`}
                alt={"image"}
                fill={true}
                className="object-cover rounded-sm"
                sizes="(max-width: 208px) 100vw,"
              />
            )}
            <TypographyH4 className="text-center">
              Recommended: 800 * 800
            </TypographyH4>
          </div>
        </div>

        {/* modal
         */}
        <ImageSelectPopup
          open={open}
          click={click}
          handleOpen={handleOpen}
          modalTitle={`Add image for ${click}`}
        />
      </div>
    </>
  );
};

export default UpdateCategoryMedia;
