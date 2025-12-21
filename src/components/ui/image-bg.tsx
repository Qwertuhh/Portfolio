import clsx from "clsx";

function ImageBg({
  children,
  imageSrc,
  className,
  imageClass,
}: {
  children: React.ReactNode;
  imageSrc: string;
  className?: string;
  imageClass?: string;
}) {
  return (
    <div className={clsx("relative", className)}>
      {/* Background image */}
      <img
        alt="Image background"
        className={clsx(
          "absolute inset-0 w-full h-full object-cover",
          imageClass
        )}
        src={imageSrc}
      />

      {/* Content on top of image */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ImageBg;
