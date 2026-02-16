import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

function ModalEditarPropina({ isOpen, onClose, propinaAEditar, onUpdate }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (propinaAEditar) {
      setValue('monto', propinaAEditar.monto);
    }
  }, [propinaAEditar, setValue]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onUpdate(propinaAEditar._id, { monto: Number(data.monto) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Editar Monto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm text-gray-600 mb-1">Nuevo Monto</label>
          <input
            type="number"
            step="0.01"
            {...register('monto', { required: true, min: 0 })}
            className="w-full border p-2 rounded mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarPropina;