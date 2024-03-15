const jwt = require('jsonwebtoken');

// Función para obtener el nombre de usuario a partir del token
function obtenerNombreDeUsuario(token) {
    try {
        const payload = jwt.decode(token);
        const username = payload.Nombre; 
        return username;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

module.exports = { obtenerNombreDeUsuario };