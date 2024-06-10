import { ShimmerSimpleGallery } from "react-shimmer-effects";

const ShimmerCard = () => {
  return <ShimmerSimpleGallery card imageHeight={200} caption />;
};

export const ShimmerButton = ({ size = "md" }) => {
  return <ShimmerButton size={size} />;
};

export default ShimmerCard;
