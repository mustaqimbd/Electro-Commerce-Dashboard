import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TMediaImage = {
  _id: string;
  src: string;
  alt: string;
};

const initialState: TMediaImage[] = [];

const mediaSlice = createSlice({
  name: "productVariation",
  initialState,
  reducers: {
    setMediaImages: (state, payload: PayloadAction<TMediaImage[]>) => {
      state.push(payload);
      console.log(payload);
    },
  },
});

export const { setMediaImages } = mediaSlice.actions;

export default mediaSlice.reducer;
