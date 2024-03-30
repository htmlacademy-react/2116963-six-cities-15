import { memo } from 'react';

type GalleryProps = {
  images: string[];
  imagesLimit: number;
}

function Gallery_({ images, imagesLimit }: GalleryProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, imagesLimit).map((image) => (
          <div key={`image-${image}`} className="offer__image-wrapper">
            <img
              className="offer__image"
              src={image}
              alt="Photo studio"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const Gallery = memo(Gallery_);

export default Gallery;
