// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { _get } from '../config/axiosConfig';
import { useParams } from 'react-router-dom';
import styles from '../components/Slider/Slider.module.css';
import { Card, Carousel, Row, Typography, Col } from 'antd';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

export default function Cinemas() {
    const [cinema, setCinema] = useState({});
    const {cinemaid} = useParams();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const response = await _get(`/cinemas/${cinemaid}`);
                console.log('response cinema: ', response.data);
                const cinema = await response.data;
                setCinema(cinema);
                setImages(cinema.imageURLs);
            } catch (error) {
                console.error('Error fetching cinemas:', error);
            }
        };

        fetchCinemas();
    }, [cinemaid]);

    console.log('cinema: ', cinema);

    const { name, location, description } = cinema || {};
    
    const { isLoaded } = useLoadScript({ googleMapsApiKey: 'YOUR_API_KEY' });
    const mapCenter = { lat: 10.7769, lng: 106.7009 };

    return (
        <>
            <div className={styles.sliderContainer}>
                <Carousel
                infinite={true}
                speed={500}
                autoplay={true}
                >
                    {images.map((cinema, index) => (
                    <div key={index} className={styles.sliderItem}>
                        <img src={cinema} alt={cinema} className={styles.sliderImage} />
                    </div>
                    ))}
                </Carousel>
            </div>
            <Card style={{ margin: '20px' }}>
                <Typography.Title level={2}>{name}</Typography.Title>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                    <Typography.Text strong>Địa chỉ:</Typography.Text>
                    <Typography.Paragraph>{location}</Typography.Paragraph>
                    {isLoaded && (
                        <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '300px' }}
                        center={mapCenter}
                        zoom={15}
                        >
                        <Marker position={mapCenter} />
                        </GoogleMap>
                    )}
                    </Col>
                    <Col span={12}>
                    <Typography.Text strong>Mô tả:</Typography.Text>
                    <Typography.Paragraph>{description}</Typography.Paragraph>
                    </Col>
                </Row>
            </Card>
        </>
    )
}