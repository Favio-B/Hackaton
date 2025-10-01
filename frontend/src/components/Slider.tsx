import React from 'react';

const Slider: React.FC = () => {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="2"
        ></button>
      </div>
      
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="hero-section text-center">
            <div className="container">
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-graph-up-arrow me-3"></i>
                Análisis de Datos Avanzado
              </h1>
              <p className="lead mb-4">
                Descubre patrones ocultos en tus datos con nuestras herramientas de machine learning
              </p>
              <p className="lead">
                Herramientas avanzadas de machine learning para descubrir patrones ocultos en tus datos
              </p>
            </div>
          </div>
        </div>
        
        <div className="carousel-item">
          <div className="hero-section text-center">
            <div className="container">
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-database-check me-3"></i>
                Gestión de Datasets
              </h1>
              <p className="lead mb-4">
                Organiza, categoriza y comparte tus datasets de manera eficiente
              </p>
              <p className="lead">
                Organiza y categoriza tus datos de manera eficiente para un mejor análisis
              </p>
            </div>
          </div>
        </div>
        
        <div className="carousel-item">
          <div className="hero-section text-center">
            <div className="container">
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-shield-check me-3"></i>
                Seguridad y Privacidad
              </h1>
              <p className="lead mb-4">
                Tus datos están protegidos con los más altos estándares de seguridad
              </p>
              <p className="lead">
                Protección de datos con los más altos estándares de seguridad y privacidad
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
