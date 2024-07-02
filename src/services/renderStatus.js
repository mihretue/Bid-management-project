const renderer = (status, classname) => {
  const statusColoring =
    status == "active"
      ? " bg-primary text-white"
      : status == "banned"
      ? " bg-danger text-white"
      : status == "not-approved"
      ? " bg-secondary text-white"
      : status == "cancelled" || status == "closed"
      ? " bg-danger text-white"
      : "";

  return <span className={`${classname}${statusColoring}`}>{status}</span>;
};
const renderStatus = (status) => {
  return status && renderer(status, "rounded border p-2");
};

export { renderStatus };
