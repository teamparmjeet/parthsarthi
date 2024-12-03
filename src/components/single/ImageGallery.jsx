"use client";
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Image from 'next/image';
import Link from 'next/link';

const MyImageGallery = ({ images }) => {
    // Ensure the images are in the format expected by ImageGallery
    const galleryItems = images.map(image => ({
        original: image, // Full image URL
        thumbnail: image, // Thumbnail image URL (using the same URL for simplicity)
    }));

    return (
        <div className="my-gallery">
            <ImageGallery
                items={galleryItems}
                showThumbnails={true}
                showFullscreenButton={true}
                showBullets={false}
                showIndex={true}
                autoPlay={false}
                infinite={true}
                thumbnailPosition="bottom" // Adjust thumbnail position (top, right, bottom, left)
                slideDuration={450}
                slideInterval={3000}
                onSlide={(currentIndex) => console.log('Slide to:', currentIndex)} // Handle slide event
            />
        </div>
    );
};

export default MyImageGallery;
