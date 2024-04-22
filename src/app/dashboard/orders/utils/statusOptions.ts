const statusOptions = (status: string) => {
  const statusOptions =
    status === "pending"
      ? ["confirmed", "follow up", "canceled", "deleted"]
      : status === "confirmed"
        ? ["processing", "canceled"]
        : status === "processing"
          ? ["On courier", "canceled"]
          : status === "processing done"
            ? ["On courier", "canceled"]
            : status === "follow up"
              ? ["confirmed", "canceled", "deleted"]
              : status === "canceled"
                ? ["confirmed"]
                : [];

  return statusOptions;
};

export default statusOptions;
