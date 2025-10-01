import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Plataforma Analisis de datos</h5>
            <p className="mb-0">
              Una plataforma moderna para el análisis y gestión de datos.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              <i className="bi bi-code-slash me-1"></i>
              Desarrollado por Favio Bernal 
            </p>
            <small className="text-muted">
              © 2025 Plataforma de Análisis de Datos.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
