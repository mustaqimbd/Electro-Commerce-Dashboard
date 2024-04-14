const backgroundColor = (status: string) => {
  return {
    backgroundColor:
      status === "pending"
        ? "#fec400"
        : status === "confirmed"
          ? "rgb(107 211 176)"
          : status === "processing"
            ? "#FA8232"
            : status === "On courier"
              ? "#4c84ff"
              : status === "canceled"
                ? "#fe5461"
                : status === "deleted"
                  ? "#C70000"
                  : status === "completed"
                    ? "#2DB224"
                    : status === "returned"
                      ? "rgb(227 131 144)"
                      : status === "follow up"
                        ? "#00C3C6"
                        : "",
  };
};

export default backgroundColor;
