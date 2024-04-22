const borderColor = (status: string) => {
  return status === "all"
    ? "ring-1 ring-primary text-primary hover:bg-primary hover:text-white"
    : status === "pending"
      ? "ring-1 ring-[#fec400] text-[#fec400] hover:bg-[#fec400] hover:text-white"
      : status === "confirmed"
        ? "ring-1 ring-[#6BD3B0] text-[#6BD3B0] hover:bg-[#6BD3B0] hover:text-white"
        : status === "processing"
          ? "ring-1 ring-[#FA8232] text-[#FA8232] hover:bg-[#FA8232] hover:text-white"
          : status === "On courier"
            ? "ring-1 ring-[#4c84ff] text-[#4c84ff]"
            : status === "canceled"
              ? "ring-1 ring-[#fe5461] text-[#fe5461]  hover:text-white hover:bg-[#fe5461]"
              : status === "deleted"
                ? "ring-1 ring-[#C70000] text-[#C70000] hover:text-white hover:bg-[#C70000]"
                : status === "completed"
                  ? "ring-1 ring-[#2DB224] text-[#2DB224]"
                  : status === "returned"
                    ? "ring-1 ring-[#E38390] text-[#E38390]"
                    : status === "follow up"
                      ? "ring-1 ring-[#00C3C6] text-[#00C3C6] hover:text-white hover:bg-[#00C3C6]"
                      : "";
};

export default borderColor;
