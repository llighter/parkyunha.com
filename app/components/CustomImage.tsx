import Image, { StaticImageData } from "next/image";

interface CustomImageProps {
  src: StaticImageData;
  alt: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt }) => {
  return (
    <Image
      className="rounded-none phone:rounded-xl mx-auto"
      src={src}
      alt={alt}
      layout="responsive"
    />
  );
};

export default CustomImage;
