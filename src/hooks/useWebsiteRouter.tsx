const useWebsiteRouter = (url: string) => {
  const handleClick = () => {
    window.addEventListener(
      "focus",
      () => {
        window.location.href = url;
      },
      { once: true }
    );
  };

  return handleClick;
};
export { useWebsiteRouter };
