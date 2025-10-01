import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/api';
import DatasetViewModal from '../components/DatasetViewModal';
import DatasetEditModal from '../components/DatasetEditModal';

interface Dataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  createdAt: string;
}

const Datasets: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getDatasets();
      
      if (response.error) {
        setError(response.error.message);
        return;
      }

      setDatasets(response.data?.datasets || []);
    } catch (err) {
      setError('Error al cargar los datasets');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setShowViewModal(true);
  };

  const handleEditDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setShowEditModal(true);
  };

  const handleUpdateDataset = (updatedDataset: Dataset) => {
    setDatasets(prev => 
      prev.map(dataset => 
        dataset.id === updatedDataset.id ? updatedDataset : dataset
      )
    );
    setShowEditModal(false);
    setSelectedDataset(null);
  };

  const handleDeleteDataset = async (dataset: Dataset) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el dataset "${dataset.name}"?`)) {
      return;
    }

    setDeleteLoading(dataset.id);
    try {
      const response = await apiClient.deleteDataset(dataset.id);
      
      if (response.error) {
        alert(`Error: ${response.error.message}`);
        return;
      }

      setDatasets(prev => prev.filter(d => d.id !== dataset.id));
    } catch (err) {
      alert('Error al eliminar el dataset');
    } finally {
      setDeleteLoading(null);
    }
  };

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedDataset(null);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <span className="loading-spinner me-2"></span>
          Cargando datasets...
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="bi bi-database me-2"></i>
            Mis Datasets
          </h2>
          <p className="text-muted">Gestiona tus conjuntos de datos</p>
        </div>
        <Link to="/datasets/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Dataset
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={loadDatasets}
          >
            Reintentar
          </button>
        </div>
      )}

      {datasets.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-database text-muted" style={{ fontSize: '4rem' }}></i>
          <h4 className="mt-3 text-muted">No tienes datasets</h4>
          <p className="text-muted">Comienza creando tu primer dataset</p>
          <Link to="/datasets/new" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Crear Primer Dataset
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>
                  <i className="bi bi-tag me-1"></i>
                  Nombre
                </th>
                <th>
                  <i className="bi bi-file-text me-1"></i>
                  Descripción
                </th>
                <th>
                  <i className="bi bi-bookmark me-1"></i>
                  Etiquetas
                </th>
                <th>
                  <i className="bi bi-calendar me-1"></i>
                  Fecha de Creación
                </th>
                <th>
                  <i className="bi bi-gear me-1"></i>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((dataset) => (
                <tr key={dataset.id}>
                  <td>
                    <strong>{dataset.name}</strong>
                  </td>
                  <td>
                    <span className="text-muted">
                      {dataset.description.length > 50
                        ? `${dataset.description.substring(0, 50)}...`
                        : dataset.description}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      {dataset.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                      {dataset.tags.length > 3 && (
                        <span className="badge bg-light text-dark">
                          +{dataset.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <small className="text-muted">
                      {formatDate(dataset.createdAt)}
                    </small>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => handleViewDataset(dataset)}
                        title="Visualizar"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => handleEditDataset(dataset)}
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteDataset(dataset)}
                        disabled={deleteLoading === dataset.id}
                        title="Eliminar"
                      >
                        {deleteLoading === dataset.id ? (
                          <span className="loading-spinner"></span>
                        ) : (
                          <i className="bi bi-trash"></i>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modales */}
      <DatasetViewModal
        dataset={selectedDataset}
        show={showViewModal}
        onHide={closeModals}
      />
      
      <DatasetEditModal
        dataset={selectedDataset}
        show={showEditModal}
        onHide={closeModals}
        onUpdate={handleUpdateDataset}
      />
    </div>
  );
};

export default Datasets;
