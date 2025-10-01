import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api';

const DatasetNew: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: ''
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar extensión
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Solo se permiten archivos CSV');
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo no puede ser mayor a 5MB');
      return;
    }

    setCsvFile(file);
    setError('');

    // Previsualizar CSV
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').slice(0, 11); // Primeras 10 filas + header
      const preview = lines.map(line => line.split(','));
      setCsvPreview(preview);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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

    if (!csvFile) {
      setError('Debes seleccionar un archivo CSV');
      setLoading(false);
      return;
    }

    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const response = await apiClient.createDataset(
        formData.name,
        formData.description,
        tags
      );
      
      if (response.error) {
        setError(response.error.message);
        return;
      }

      // En una aplicación real, aquí subirías el archivo CSV
      // Por ahora solo mostramos éxito
      navigate('/datasets');
    } catch (err) {
      setError('Error al crear el dataset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Nuevo Dataset
              </h4>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <i className="bi bi-tag me-1"></i>
                    Nombre del Dataset *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="Ej: Ventas Q4 2024"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <i className="bi bi-file-text me-1"></i>
                    Descripción *
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    rows={3}
                    placeholder="Describe el contenido y propósito de este dataset..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">
                    <i className="bi bi-bookmark me-1"></i>
                    Etiquetas
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tags"
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

                <div className="mb-4">
                  <label htmlFor="csvFile" className="form-label">
                    <i className="bi bi-file-earmark-spreadsheet me-1"></i>
                    Archivo CSV *
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="csvFile"
                    accept=".csv"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                  <div className="form-text">
                    Solo archivos CSV, máximo 5MB
                  </div>
                </div>

                {csvPreview.length > 0 && (
                  <div className="mb-4">
                    <h6>
                      <i className="bi bi-eye me-1"></i>
                      Previsualización (primeras 10 filas)
                    </h6>
                    <div className="csv-preview">
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            {csvPreview[0]?.map((header, index) => (
                              <th key={index} className="text-nowrap">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {csvPreview.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="text-nowrap">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner me-2"></span>
                        Creando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Crear Dataset
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/datasets')}
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
    </div>
  );
};

export default DatasetNew;
