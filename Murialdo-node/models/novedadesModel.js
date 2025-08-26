var pool = require('./bd');

//listar novedades
async function getNovedades() {
    try {
        var query = 'select * from novedades';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function insertNovedad(obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//borrar novedades
async function deleteNovedadesById(id) {
    try {
        var query = 'delete from novedades where id=?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

//modificar novedades
async function getNovedadById(id) {
    try {
        var query = 'select * from novedades where id=?';
        var rows = await pool.query(query, [id]);
        return rows[0]; // La corrección es aquí: devolver el primer elemento del array
    } catch (error) {
        throw error;
    }
}

// Función para modificar una novedad por su ID
async function modificarNovedadById(obj, id) {
    try {
        console.log('Objeto recibido en el modelo:', obj);
        console.log('ID recibido en el modelo:', id);
        var query = 'UPDATE novedades SET ? WHERE id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getNovedades, deleteNovedadesById, insertNovedad, getNovedadById, modificarNovedadById }