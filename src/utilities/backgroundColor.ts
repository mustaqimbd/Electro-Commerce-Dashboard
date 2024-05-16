const backgroundColor = (status: string) => {
  return status === "all"
    ? "bg-primary"
    : status === "pending"
      ? "bg-[#fec400]"
      : status === "confirmed"
        ? "bg-[#6BD3B0]"
        : status === "processing"
          ? "bg-[#FA8232]"
          : status === "warranty processing"
            ? "bg-[#ca8b68]"
            : status === "warranty added"
              ? "bg-[#00C3C6]"
              : status === "processing done"
                ? "bg-[#6BD3B0]"
                : status === "On courier"
                  ? "bg-[#4c84ff]"
                  : status === "canceled"
                    ? "bg-[#fe5461]"
                    : status === "deleted"
                      ? "bg-[#C70000]"
                      : status === "completed"
                        ? "bg-[#2DB224]"
                        : status === "returned"
                          ? "bg-[#E38390]"
                          : status === "follow up"
                            ? "bg-[#00C3C6]"
                            : "";
};

export default backgroundColor;
