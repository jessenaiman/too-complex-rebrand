import Image from 'next/image';
import { useState } from 'react';

interface ImageHandlerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  className?: string;
}

export default function ImageHandler({
  src,
  alt,
  width,
  height,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  className,
}: ImageHandlerProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={className} role="img" aria-label={`Error loading image: ${alt}`}>
        <p>Image failed to load</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}