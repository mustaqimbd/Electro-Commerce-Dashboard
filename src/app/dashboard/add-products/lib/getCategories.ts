const getCategories = async () => {
  const res = await fetch("http://localhost:5000/api/v1/categories");
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error when fetching category!");
  }
  return data.data;
};

export default getCategories;
