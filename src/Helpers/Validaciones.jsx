import $ from 'jquery';
import Swal from 'sweetalert2';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// Helper para DataTable y Validaciones
export const dataTableHelper = {
    initialize: (tableId) => {
        if ($.fn.DataTable.isDataTable(tableId)) {
            $(tableId).DataTable().destroy();
        }

        $(tableId).DataTable({
            responsive: true,
            lengthChange: false,
            autoWidth: false,
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis']
        });
    }
};


export const validationHelper = {
    validateField: (name, value) => {
        // Handle undefined or null values
        if (value === undefined || value === null) {
            switch (name) {
                case 'nombre':
                case 'email':
                case 'celular':
                case 'rol':
                    return 'Este campo es obligatorio';
                default:
                    return '';
            }
        }

        // Convert to string to ensure .trim() works
        const stringValue = String(value);

        switch (name) {
            case 'nombre':
                return stringValue.trim().length < 3 ? 'El nombre debe tener al menos 3 caracteres' : '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(stringValue) ? 'Ingrese un correo válido' : '';
            case 'contrasena':
                // Optional password validation for new users or when changing password
                if (stringValue) {
                    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
                    return !passwordRegex.test(stringValue)
                        ? 'La contraseña debe tener al menos 4 caracteres, incluyendo letras y números'
                        : '';
                }
                return '';
            case 'celular':
                const phoneRegex = /^\d{10}$/;
                return !phoneRegex.test(stringValue) ? 'Ingrese un número de celular válido (10 dígitos)' : '';
            case 'rol':
                return !stringValue ? 'Seleccione un rol' : '';
            default:
                return '';
        }
    },

    validateForm: (formData) => {
        const validations = {};

        // Validate each field
        validations.nombre = validationHelper.validateField('nombre', formData.nombre);
        validations.email = validationHelper.validateField('email', formData.email);
        validations.celular = validationHelper.validateField('celular', formData.celular);
        validations.rol = validationHelper.validateField('rol', formData.rol);

        // Special handling for password (only validate if provided or for new users)
        if (!formData.id) { // For new users
            validations.contrasena = validationHelper.validateField('contrasena', formData.contrasena);
        }

        return validations;
    }
};

export const notificarUsuario = (mensaje, esError = false, recargarPagina = false, callback = null) => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(mensaje)) {
            const listaErrores = mensaje.map((error, index) => `<li key=${index}>${error}</li>`).join('');
            Swal.fire({
                title: esError ? 'Errores' : 'Notificación',
                icon: esError ? 'error' : 'success',
                html: `<ul>${listaErrores}</ul>`,
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    if (recargarPagina) {
                        window.location.reload();
                    }
                    if (callback) callback();
                    resolve();
                } else {
                    reject();
                }
            });
        } else {
            Swal.fire({
                title: esError ? 'Error' : 'Éxito',
                text: mensaje,
                icon: esError ? 'error' : 'success',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    if (recargarPagina) {
                        window.location.reload();
                    }
                    if (callback) callback();
                    resolve();
                } else {
                    reject();
                }
            });
        }
    });
};
