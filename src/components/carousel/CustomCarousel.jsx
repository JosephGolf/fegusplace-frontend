import React from 'react';
import { Carousel } from 'react-bootstrap';

const CustomCarousel = ({ data }) => {
    return (
        <Carousel>
            {data.map((item, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={item.img}
                        alt={item.title}
                    />
                    <Carousel.Caption>
                        {item.title && <h3>{item.title}</h3>}
                        {item.description && <p>{item.description}</p>}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CustomCarousel;
