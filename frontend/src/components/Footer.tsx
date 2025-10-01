import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Data Science Platform</h5>
            <p className="mb-0">
              Una plataforma moderna para el análisis y gestión de datos científicos.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              <i className="bi bi-code-slash me-1"></i>
              Desarrollado con React + TypeScript + Node.js
            </p>
            <small className="text-muted">
              © 2024 Data Science Platform. Todos los derechos reservados.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
