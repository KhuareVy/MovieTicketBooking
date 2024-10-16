/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined, PlayCircleOutlined } from '@ant-design/icons';
import TrailerModal from './TrailerModel';
import { Link } from 'react-router-dom';

export default function MovieCard ({ movie }) {
    const { Meta } = Card;

    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const extractVideoID = url => {
        return url.split("v=")[1];
      };
  
    const trailerEmbedUrl = `https://www.youtube.com/embed/${extractVideoID(movie.trailerURL)}`;
  
    return (
      <>
        <Card
        hoverable
        style={{ width: '400',height: '300' , position: 'relative', alignItems:'center' }}
        cover={<img alt={movie.title} src={movie.posterURL} />}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <Meta
            title={movie.title}
            />
            <div
            style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: '#ff4d4f',
                color: 'white',
                padding: '2px 8px',
                borderRadius: 4,
            }}
            >
            {movie.duration} Phút
            </div>
            {isHovered && (
            <div
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                }}
            >
                <button
                style={{
                    background: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                }}
                >
                <ShoppingCartOutlined />
                <Link to={`/phim-dang-chieu/${movie.id}`}>Mua vé</Link>
                </button>
                <button
                style={{
                    background: '#1890ff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                }}
                onClick={() => setIsModalOpen(true)}
                >
                <PlayCircleOutlined /> Trailer
                </button>
            </div>
            )}
        </Card>
        {isModalOpen && (
            <TrailerModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            trailerUrl={trailerEmbedUrl}
            />
        )}
      </>
    );
  };