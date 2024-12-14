import React, {useState, useEffect, useRef} from 'react';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import {FaUser, FaEnvelope, FaUserTag, FaLock, FaPhone, FaEdit, FaTrash} from 'react-icons/fa';
import Swal from 'sweetalert2';
import requestApi from '../../Helpers/RequestApi';
import {dataTableHelper, notificarUsuario} from '../../Helpers/Validaciones';
import verificarTokenRol from "../../Helpers/VerificarTokenRol";

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [tableInitialized, setTableInitialized] = useState(false);
    const tableRef = useRef(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contrasena: '',
        celular: '',
        rol: ''
    });


    // Cargar usuarios y roles desde la API
    useEffect(() => {
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('rol');
        if (token && rol) {
            const verificarUsuario = verificarTokenRol()
            if (!verificarUsuario || rol !== 'admin') {
                window.location.href = '/';
                return
            }
        } else {
            window.location.href = '/';
            return
        }

        const fetchData = async () => {
            try {
                const usersData = await requestApi('usuarios/listar', 'GET');
                setUsers(usersData.data.usuarios);
                setRoles(usersData.data.roles);

            } catch (error) {
                console.error('Error al cargar datos:', error.message);
            }
        };
        fetchData();
    }, []);

    // Configurar DataTable

    useEffect(() => {
        if (users.length > 0 && !tableInitialized) {
            dataTableHelper.initialize(tableRef.current);
            setTableInitialized(true);
        }
    }, [users, tableInitialized]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditUser = (user) => {
        setIsEditing(true);
        setEditingUserId(user.id);
        setFormData({
            nombre: user.nombre,
            email: user.email,
            contrasena: '', // Opcional
            celular: user.celular,
            rol: user.id_rol
        });
    };

    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "No podrá revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await requestApi(`usuarios/eliminar/${userId}`, 'DELETE');
                    notificarUsuario("Usuario Eliminado correctamente", false, true)
                } catch (error) {
                    notificarUsuario("No se pudo eliminar el usuario", true)
                }
            }
        });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            const actualizarRequest = await requestApi(`usuarios/crear/${editingUserId}`, 'POST', {
                ...formData,
                contrasena: formData.contrasena || ''
            });

            if (actualizarRequest.error === 1) {
                notificarUsuario(actualizarRequest.mensaje, true)
                return;
            }
        } else {
            const registrarRequest = await requestApi('usuarios/crear', 'POST', formData);

            if (registrarRequest.error === 1) {
                notificarUsuario(registrarRequest.mensaje, true)
                return;
            }
        }
        notificarUsuario(isEditing ? 'Usuario actualizado correctamente' : 'Usuario registrado correctamente', false, true)
    };

    return (
        <div className="row align-items-center justify-content-center mb-md-0 "
             style={{height: '100vh', margin: '0 auto', width: '95%', padding: '90px 0', maxHeight: '100vh', overflowY: 'auto'}}>
            {/* Formulario */}
            <div className="col-12 col-md-4 mb-3 mb-md-0">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">
                            {isEditing ? 'Actualizar Usuario' : 'Agregar Usuario'}
                        </h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Campos del formulario */}
                            <div className="form-group">
                                <div className="input-group border-bottom-input">
                                    <div className="input-group-prepend border-0">
                                        <span className="input-group-text bg-transparent border-0 pl-0 fs-4">
                                            <FaUser/>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-0 border-bottom"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese nombre"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group border-bottom-input">
                                    <div className="input-group-prepend border-0">
                                        <span className="input-group-text bg-transparent border-0 pl-0 fs-4">
                                            <FaEnvelope/>
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg border-0 border-bottom"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese correo"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group border-bottom-input">
                                    <div className="input-group-prepend border-0">
                                        <span className="input-group-text bg-transparent border-0 pl-0 fs-4">
                                            <FaLock/>
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg border-0 border-bottom"
                                        id="contrasena"
                                        name="contrasena"
                                        value={formData.contrasena}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese contraseña"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group border-bottom-input">
                                    <div className="input-group-prepend border-0">
                                        <span className="input-group-text bg-transparent border-0 pl-0 fs-4">
                                            <FaPhone/>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-0 border-bottom"
                                        id="celular"
                                        name="celular"
                                        value={formData.celular}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese número de celular"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group border-bottom-input">
                                    <div className="input-group-prepend border-0">
                                        <span className="input-group-text bg-transparent border-0 pl-0 fs-4">
                                            <FaUserTag/>
                                        </span>
                                    </div>
                                    <select
                                        className="form-control form-control-lg border-0 border-bottom"
                                        id="rol"
                                        name="rol"
                                        value={formData.rol}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un rol</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn-principal mt-2 ms-2">
                                {isEditing ? 'Actualizar' : 'Registrar'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Tabla de usuarios */}
            <div className="col-12 col-md-8">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Lista de Usuarios</h3>
                    </div>
                    <div className="card-body table-responsive">
                        <table ref={tableRef} className="table table-striped table-bordered" style={{width: '100%'}}>
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.nombre}</td>
                                    <td>{user.email}</td>
                                    <td>{user.celular}</td>
                                    <td>{user.nombre_rol}</td>
                                    <td>
                                        <div className="d-flex">
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <FaEdit/>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <FaTrash/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Usuarios;
