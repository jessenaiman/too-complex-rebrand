// app/components/useRebrandState.ts

import { useState, useRef } from "react";

type RebrandState = {
  isRebranded: boolean;
  currentImage: string;
  logoImage: string;
  marketingText: string;
  theme: string;
};

type UseRebrandStateProps = {
  initialState: RebrandState;
  generateImage: (prompt: string, isLogo?: boolean) => string;
  getRandomMarketingText: () => string;
  getRandomTheme: () => string;
};

export function useRebrandState({
  initialState,
  generateImage,
  getRandomMarketingText,
  getRandomTheme,
}: UseRebrandStateProps) {
  const [state, setState] = useState<RebrandState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const prevState = useRef<RebrandState | null>(null);

  const rebrand = () => {
    setIsLoading(true);
    prevState.current = state;
    setTimeout(() => {
      setState({
        isRebranded: true,
        currentImage: generateImage("vibrant surreal landscape with pink and purple elements, dreamlike, magical, 8k"),
        logoImage: generateImage("stylized letter R+ logo with pink to purple gradient, artistic, modern", true),
        marketingText: getRandomMarketingText(),
        theme: getRandomTheme(),
      });
      setIsLoading(false);
    }, 2000);
  };

  const switchBack = () => {
    if (prevState.current) {
      setIsLoading(true);
      setTimeout(() => {
        setState(prevState.current as RebrandState);
        setIsLoading(false);
        prevState.current = null;
      }, 2000);
    }
  };

  return {
    ...state,
    isLoading,
    rebrand,
    switchBack,
  };
}