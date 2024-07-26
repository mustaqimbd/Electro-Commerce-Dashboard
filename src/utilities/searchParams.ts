const searchParams = (
  args: { [key: string]: unknown } | ArrayLike<unknown>
) => {
  const params = new URLSearchParams();
  if (args) {
    Object.entries(args).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.append(key, value.toString());
      }
    });
  }
  return params;
};

export default searchParams;
