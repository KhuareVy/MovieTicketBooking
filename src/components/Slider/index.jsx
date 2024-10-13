// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Carousel } from 'antd';
import slider1 from '../../assets/images/slider1.jpg';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.jpg'; 
import styles from './Slider.module.css';

const images = [
  { src: slider1, alt: 'poster-1' },
  { src: slider2, alt: 'poster-2' },
  { src: slider3, alt: 'poster-3' },
];


const Slider = () => {
  return (
    <div className={styles.sliderContainer}>
      <Carousel
       infinite={true}
       speed={500}
      autoplay={true}
       >
        {images.map((image, index) => (
          <div key={index} className={styles.sliderItem}>
            <img src={image.src} alt={image.alt} className={styles.sliderImage} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;