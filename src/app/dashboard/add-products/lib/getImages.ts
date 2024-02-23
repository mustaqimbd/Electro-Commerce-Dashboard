const getImages = async () => {
  const res = await fetch("http://localhost:5000/api/v1/images");
  const images = await res.json();
  if (!res.ok) {
    throw new Error("Error when fetching post!");
  }
  console.log(images);
  return images;
};

export default getImages;
