const useWebsiteRouter = (
  url: string,
  target: string = "_blank",
  features: string = "noopener noreferrer"
) => {
  const handleClick = () => {
    window.addEventListener(
      "click",
      () => {
        window.open(url, target, features);
      },
      { once: true }
    );
  };

  return handleClick;
};
export { useWebsiteRouter };
