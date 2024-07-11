import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TInitialState = {
  thumbnail: string;
  gallery: string[];
};

const initialState: TInitialState = {
  thumbnail: "",
  gallery: [],
};

const imageSelectorSlice = createSlice({
  name: "imageSelector",
  initialState,
  reducers: {
    setThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    setGallery: (state, action: PayloadAction<string[]>) => {
      state.gallery = [];
      state.gallery.push(...action.payload);
    },
  },
});

export const { setThumbnail, setGallery } = imageSelectorSlice.actions;
export default imageSelectorSlice.reducer;
