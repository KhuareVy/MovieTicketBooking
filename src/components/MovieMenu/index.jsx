import React, { useState } from 'react';
import './MovieMenu.css';

export default function MovieMenu() {
  const [activeItem, setActiveItem] = useState('dangchieu');

  const menuItems = [
    { id: 'phim', label: 'PHIM', isTitle: true },
    { id: 'dangchieu', label: 'Đang chiếu' },
    { id: 'sapchieu', label: 'Sắp chiếu' },
  ];

  return (
    <nav className="movie-menu">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`${item.isTitle ? 'title' : ''} ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => !item.isTitle && setActiveItem(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}