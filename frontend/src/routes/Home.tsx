import React from 'react';
import Slider from '../components/Slider';

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card h-100 card-hover">
              <div className="card-body text-center">
                <i className="bi bi-graph-up text-primary" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title mt-3">Análisis Predictivo</h5>
                <p className="card-text">
                  Utiliza algoritmos de machine learning para predecir tendencias y patrones en tus datos.
                </p>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-arrow-right me-1"></i>
                  Explorar
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 mb-4">
            <div className="card h-100 card-hover">
              <div className="card-body text-center">
                <i className="bi bi-pie-chart text-success" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title mt-3">Visualización</h5>
                <p className="card-text">
                  Crea gráficos interactivos y dashboards para comunicar insights de manera efectiva.
                </p>
                <button className="btn btn-outline-success">
                  <i className="bi bi-arrow-right me-1"></i>
                  Explorar
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 mb-4">
            <div className="card h-100 card-hover">
              <div className="card-body text-center">
                <i className="bi bi-gear text-warning" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title mt-3">Automatización</h5>
                <p className="card-text">
                  Automatiza procesos de análisis y genera reportes de manera programática.
                </p>
                <button className="btn btn-outline-warning">
                  <i className="bi bi-arrow-right me-1"></i>
                  Explorar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h2 className="mb-4">¿Por qué elegir nuestra plataforma?</h2>
            <div className="row">
              <div className="col-md-3 mb-3">
                <i className="bi bi-lightning-charge text-primary" style={{ fontSize: '2rem' }}></i>
                <h6 className="mt-2">Rápido</h6>
                <small className="text-muted">Procesamiento optimizado</small>
              </div>
              <div className="col-md-3 mb-3">
                <i className="bi bi-shield-check text-success" style={{ fontSize: '2rem' }}></i>
                <h6 className="mt-2">Seguro</h6>
                <small className="text-muted">Datos protegidos</small>
              </div>
              <div className="col-md-3 mb-3">
                <i className="bi bi-people text-info" style={{ fontSize: '2rem' }}></i>
                <h6 className="mt-2">Colaborativo</h6>
                <small className="text-muted">Trabajo en equipo</small>
              </div>
              <div className="col-md-3 mb-3">
                <i className="bi bi-graph-up text-warning" style={{ fontSize: '2rem' }}></i>
                <h6 className="mt-2">Escalable</h6>
                <small className="text-muted">Crece con tu negocio</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
