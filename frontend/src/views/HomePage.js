import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './styles/HomePage.css';
import api from '../services/api';

function HomePage() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get("/")
            .then(response => {
                if (response.data.success) {
                    setMessage(response.data.message);
                } else {
                    console.error("Erreur lors de la récupération du message : ", response.data.message);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du message : ", error);
            });
    }, []);

    return (
        <div>
            <Carousel>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                    <Carousel.Item key={num}>
                        <img
                            className="d-block w-100 carousel-image"
                            src={`/assets/images/hero-${num}.jpg`}
                            alt={`Slide ${num}`}
                        />
                        <Carousel.Caption>
                            <span className="fw-semibold display-4 my-md-5 ms-3">{message}</span>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default HomePage;
