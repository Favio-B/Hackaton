import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

interface Dataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  createdAt: string;
}

interface DatasetEditModalProps {
  dataset: Dataset | null;
  show: boolean;
  onHide: () => void;
  onUpdate: (updatedDataset: Dataset) => void;
}

const DatasetEditModal: React.FC<DatasetEditModalProps> = ({ 
  dataset, 
  show, 
  onHide, 
  onUpdate 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (dataset) {
      setFormData({
        name: dataset.name,
        description: dataset.description,
        tags: dataset.tags.join(', ')
      });
    }
  }, [dataset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataset) return;

    setLoading(true);
    setError('');

    try {
      // Validaciones
      if (!formData.name.trim()) {
        setError('El nombre es requerido');
        setLoading(false);
        return;
      }

      if (!formData.description.trim()) {
        setError('La descripción es requerida');
        setLoading(false);
        return;
      }

      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const response = await apiClient.updateDataset(
        dataset.id,
        formData.name,
        formData.description,
        tags
      );
      
      if (response.error) {
        setError(response.error.message);
        return;
      }

      if (response.data?.dataset) {
        onUpdate(response.data.dataset);
        onHide();
      }
    } catch (err) {
      setError('Error al actualizar el dataset');
    } finally {
      setLoading(false);
    }
  };

  if (!dataset) return null;

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}
      <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title">
              <i className="bi bi-pencil me-2"></i>
              Editar Dataset
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="editName" className="form-label">
                  <i className="bi bi-tag me-1"></i>
                  Nombre del Dataset *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="editDescription" className="form-label">
                  <i className="bi bi-file-text me-1"></i>
                  Descripción *
                </label>
                <textarea
                  className="form-control"
                  id="editDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  rows={3}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="editTags" className="form-label">
                  <i className="bi bi-bookmark me-1"></i>
                  Etiquetas
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editTags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="ventas, marketing, q4 (separadas por comas)"
                />
                <div className="form-text">
                  Separa las etiquetas con comas
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-warning"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner me-2"></span>
                      Actualizando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Actualizar Dataset
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onHide}
                  disabled={loading}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DatasetEditModal;
