import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { testimonialData } from './testimonialData';

const StarIcon = ({ filled }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={filled ? "#ff6b00" : "none"} 
    stroke={filled ? "#ff6b00" : "#ff6b00"} 
    strokeWidth="2"
    className="star-icon"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const RatingStars = ({ rating }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <StarIcon key={index} filled={index < rating} />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'business', label: 'Business' },
    { id: 'family', label: 'Family' },
    { id: 'leisure', label: 'Leisure' }
  ];

  const filteredTestimonials = testimonialData.filter(t => 
    activeCategory === 'all' || t.category === activeCategory
  );

  const handlePrevious = () => {
    setIsAnimating(true);
    setActiveIndex(current => 
      current === 0 ? filteredTestimonials.length - 1 : current - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    setIsAnimating(true);
    setActiveIndex(current => 
      current === filteredTestimonials.length - 1 ? 0 : current + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAnimating, filteredTestimonials.length]);

  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <h2>Customer Experiences</h2>
        <p>Discover what makes our car rental service stand out</p>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.id);
              setActiveIndex(0);
            }}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="testimonials-slider">
        <button className="nav-button prev" onClick={handlePrevious}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={`testimonial-card ${isAnimating ? 'animating' : ''}`}>
          <div className="testimonial-content">
            <div className="testimonial-header">
              <img 
                src={filteredTestimonials[activeIndex].image}
                alt={filteredTestimonials[activeIndex].name}
                className="testimonial-image"
              />
              
              <div className="testimonial-info">
                <RatingStars rating={filteredTestimonials[activeIndex].rating} />
                <h3>{filteredTestimonials[activeIndex].name}</h3>
                <span className="role">{filteredTestimonials[activeIndex].role}</span>
              </div>
            </div>

            <div className="testimonial-text">
              <p>"{filteredTestimonials[activeIndex].text}"</p>
            </div>

            <div className="testimonial-footer">
              <span className="car-rented">
                Rented: {filteredTestimonials[activeIndex].carRented}
              </span>
              <span className="date">{filteredTestimonials[activeIndex].date}</span>
            </div>
          </div>
        </div>

        <button className="nav-button next" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="navigation-dots">
        {filteredTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`dot ${index === activeIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;