// Custom hook for rebrand loading and state logic

import { useState } from "react";

type UseRebrandLoadingProps = {
  generateImage: (prompt: string, isLogo?: boolean) => string;
};

export function useRebrandLoading({ generateImage }: UseRebrandLoadingProps) {
  const [isRebranded, setIsRebranded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [logoImage, setLogoImage] = useState("");

  const handleRebrand = () => {
    setIsLoading(true);

    if (isRebranded) {
      setCurrentImage(generateImage("futuristic digital garden with glowing blue elements, cyberpunk aesthetic, high detail, 8k"));
      setLogoImage(generateImage("minimalist letter R logo with blue gradient, modern tech aesthetic", true));
    } else {
      setCurrentImage(generateImage("vibrant surreal landscape with pink and purple elements, dreamlike, magical, 8k"));
      setLogoImage(generateImage("stylized letter R+ logo with pink to purple gradient, artistic, modern", true));
    }

    setTimeout(() => {
      setIsRebranded((prev) => !prev);
      setIsLoading(false);
    }, 2000);
  };

  return {
    isRebranded,
    isLoading,
    currentImage,
    logoImage,
    setCurrentImage,
    setLogoImage,
    handleRebrand,
  };
}