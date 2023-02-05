import React, { FC, useState } from "react";
import { Space, Image } from "antd";
import "./grid.scss";

type GridProps = {
  images: string[];
  imageSize?: number;
  className?: string;
  loadByOrder?: boolean;
};

const Grid: FC<GridProps> = ({ className, images, imageSize, loadByOrder }) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const addToLoadedImages = () =>
    setTimeout(() => setLoadedImages(loadedImages + 1), 100);

  return (
    <Space
      wrap
      size={[16, 16]}
      className={`the-grid ${className}`.trim()}
      style={{ "--image-size": imageSize ? `${imageSize}px` : "200px" } as any}
    >
      {images.map((image, index) =>
        !loadByOrder || (loadByOrder && index <= loadedImages) ? (
          <Image
            key={image}
            src={image}
            onLoad={addToLoadedImages}
            onError={addToLoadedImages}
          />
        ) : null
      )}
    </Space>
  );
};

export { Grid };
