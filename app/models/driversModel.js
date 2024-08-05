import { pool } from "../../config/db.js";

// Función para ver toda la información de los conductores
export async function viewAllInformation() {
    try {
        let driversInfo = await pool.query('SELECT * FROM drivers');
        driversInfo = driversInfo[0];
        return driversInfo;
    } catch (err) {
        throw new Error(`Error al obtener toda la información de los conductores: ${err}`);
    }
}

// Función para obtener información de un conductor por ID
export async function modelByGetId(id) {
    try {
        const [[data]] = await pool.query('SELECT * FROM drivers WHERE id = ?', [id]);
        return data;
    } catch (error) {
        throw new Error(`Error al obtener el conductor por ID: ${error}`);
    }
}

// Función para insertar nuevos datos en la tabla de conductores
export async function InsertNewDataModel(name, warehouseId) {
    try {
        const [result] = await pool.query('INSERT INTO drivers(name, warehouse_id) VALUES(?, ?)', [name, warehouseId]);
        const [[newDriver]] = await pool.query('SELECT * FROM drivers WHERE id = ?', [result.insertId]);
        return newDriver;
    } catch (err) {
        throw new Error(`No fue posible insertar nuevos datos: ${err}`);
    }
}

// Función para actualizar datos en la tabla de conductores
export async function modelsOfUpdate(name, warehouseId, id) {
    try {
        // Actualiza los datos del conductor
        await pool.query(
            'UPDATE drivers SET name = ?, warehouse_id = ? WHERE id = ?',
            [name, warehouseId, id]
        );

        // Obtén los datos actualizados del conductor
        const [rows] = await pool.query('SELECT * FROM drivers WHERE id = ?', [id]);

        // Asegurar de que 'rows' contiene al menos un registro
        if (rows.length > 0) {
            return rows[0]; // Devuelve el primer registro actualizado
        } else {
            throw new Error('No se encontraron datos para el ID proporcionado');
        }
    } catch (err) {
        throw new Error(`Error al actualizar los datos del conductor: ${err.message}`);
    }
}

// Función para eliminar un conductor por ID
export async function modelDelete(id) {
    try {
        const [[objectToDelete]] = await pool.query('SELECT * FROM drivers WHERE id = ?', [id]);
        await pool.query('DELETE FROM drivers WHERE id = ?', [id]);
        return objectToDelete;
    } catch (err) {
        throw new Error(`Error al eliminar el conductor: ${err}`);
    }
}
