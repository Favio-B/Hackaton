import React from 'react';

interface Dataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  createdAt: string;
}

interface DatasetViewModalProps {
  dataset: Dataset | null;
  show: boolean;
  onHide: () => void;
}

const DatasetViewModal: React.FC<DatasetViewModalProps> = ({ dataset, show, onHide }) => {
  if (!dataset) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}
      <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="bi bi-eye me-2"></i>
              Visualizar Dataset
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-muted mb-2">
                  <i className="bi bi-tag me-1"></i>
                  Nombre
                </h6>
                <p className="fw-bold mb-3">{dataset.name}</p>
              </div>
              <div className="col-md-6">
                <h6 className="text-muted mb-2">
                  <i className="bi bi-calendar me-1"></i>
                  Fecha de Creación
                </h6>
                <p className="mb-3">{formatDate(dataset.createdAt)}</p>
              </div>
            </div>

            <div className="mb-3">
              <h6 className="text-muted mb-2">
                <i className="bi bi-file-text me-1"></i>
                Descripción
              </h6>
              <p className="mb-0">{dataset.description}</p>
            </div>

            <div className="mb-3">
              <h6 className="text-muted mb-2">
                <i className="bi bi-bookmark me-1"></i>
                Etiquetas
              </h6>
              <div className="d-flex flex-wrap gap-1">
                {dataset.tags.length > 0 ? (
                  dataset.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-muted">Sin etiquetas</span>
                )}
              </div>
            </div>

            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Información del Dataset:</strong>
              <ul className="mb-0 mt-2">
                <li>ID del Dataset: <code>{dataset.id}</code></li>
                <li>Total de etiquetas: {dataset.tags.length}</li>
                <li>Estado: Activo</li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              <i className="bi bi-x-circle me-1"></i>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DatasetViewModal;
