import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PlantScroll = () => {
  const [images, setImages] = useState([]);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const frameCount = 1394; // Set to number of images you have

  // Preload image URLs
  useEffect(() => {
    const loaded = [];
    for (let i = 21; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/downloads/image-${i}.jpeg`; // make sure path is public
      loaded.push(img);
    }
    setImages(loaded);
  }, []);

//   useEffect(() => {
//   const handleResize = () => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     if (images.length > 0) {
//       render(Math.floor(frameCount * ScrollTrigger.scroll()));
//     }
//   };

//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, [images]);

  // Scroll Animation Setup
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // const render = (index) => {
    //   context.clearRect(0, 0, canvas.width, canvas.height);
    //   context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
    // };
    const render = (index) => {
        const img = images[index];
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Scale image to fit width of canvas, keep aspect ratio
        const scale = canvas.width / img.width;
        const scaledWidth = canvas.width;
        const scaledHeight = img.height * scale;

        const x = 0; // start at left
        const y = (canvas.height - scaledHeight) / 2; // center vertically

        context.drawImage(img, x, y, scaledWidth, scaledHeight);
    };

    const obj = { frame: 0 };

    gsap.to(obj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: true,
        start: "top top",
        end: "bottom+=3000 top",
        pin: true,
      },
        
        onUpdate: () => render(obj.frame),
    });

    // Draw first frame
    images[0].onload = () => render(0);
  }, [images]);

  return (
    <>
        {/* <div>
            <img src='/downloads/image-104.jpeg'></img>
        </div> */}
        <div ref={containerRef} className="h-[5000px] bg-black">
            <canvas ref={canvasRef} className="w-full fixed top-0 left-0" />
        </div>
    </>
  );
};

export default PlantScroll;
