"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAdvanced } from "@/redux/features/addProduct/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { SubmitHandler, useForm } from "react-hook-form";
// import * as yup from "yup";

// const schema = yup.object().shape({
//   review: yup.boolean().default(false),
//   featured: yup.boolean().default(false),
// });

// type TFormInput = yup.InferType<typeof schema>;

const Advanced = () => {
  const dispatch = useAppDispatch();
  const { review, featured } = useAppSelector(({ addProduct }) => addProduct);

  const handleChange = (event: {
    target: { name: string; checked: boolean };
  }) => {
    const { name, checked } = event.target;
    dispatch(setAdvanced({ [name]: checked }));
  };

  return (
    <form>
      <div className="flex items-center gap-3 mb-3">
        <Label className="flex gap-3 w-40" htmlFor="review">
          Enable reviews
        </Label>
        <div className="space-y-2">
          <Input
            type="checkbox"
            checked={review}
            onChange={handleChange}
            name="review"
            id="review"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <Label className="flex gap-3 w-40" htmlFor="featured">
          Featured
        </Label>
        <div className="space-y-2">
          <Input
            type="checkbox"
            checked={featured}
            onChange={handleChange}
            name="featured"
            id="featured"
          />
        </div>
      </div>
    </form>
  );
};

export default Advanced;
