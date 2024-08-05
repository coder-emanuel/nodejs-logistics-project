import { pool } from "../../config/db.js";

// Función para ver toda la información de los almacenes
export async function viewAllInformation() {
    try {
        let warehousesInfo = await pool.query('SELECT * FROM warehouses');
        warehousesInfo = warehousesInfo[0];
        return warehousesInfo;
    } catch (err) {
        throw new Error(`Error al obtener toda la información de los almacenes: ${err}`);
    }
}

// Función para insertar nuevos datos en la tabla de almacenes
export async function InsertNewDataModel(name, location, vehicleId) {
    try {
        const [result] = await pool.query('INSERT INTO warehouses(name, location, vehicle_id) VALUES(?, ?, ?)', [name, location, vehicleId]);
        const [[newWarehouse]] = await pool.query('SELECT * FROM warehouses WHERE id = ?', [result.insertId]);
        return newWarehouse;
    } catch (err) {
        throw new Error(`No fue posible insertar nuevos datos: ${err}`);
    }
}

// Función para actualizar datos en la tabla de almacenes
export async function modelsOfUpdate(name, location, vehicleId, id) {
    try {
        // Actualiza los datos del almacén
        await pool.query(
            'UPDATE warehouses SET name = ?, location = ?, vehicle_id = ? WHERE id = ?',
            [name, location, vehicleId, id]
        );

        // Obtén los datos actualizados
        const [rows] = await pool.query('SELECT * FROM warehouses WHERE id = ?', [id]);

        // Asegurar de que 'rows' contiene al menos un registro
        if (rows.length > 0) {
            return rows[0]; // Devuelve el primer registro actualizado
        } else {
            throw new Error('No se encontraron datos para el ID proporcionado');
        }
    } catch (err) {
        throw new Error(`Error al actualizar los datos del almacén: ${err.message}`);
    }
}

// Función para eliminar un almacén por ID
export async function modelDelete(id) {
    try {
        const [[objectToDelete]] = await pool.query('SELECT * FROM warehouses WHERE id = ?', [id]);
        await pool.query('DELETE FROM warehouses WHERE id = ?', [id]);
        return objectToDelete;
    } catch (err) {
        throw new Error(`Error al eliminar el almacén: ${err}`);
    }
}

// Función para obtener información de un almacén por ID
export async function modelByGetId(id) {
    try {
        const [[data]] = await pool.query('SELECT * FROM warehouses WHERE id = ?', [id]);
        return data;
    } catch (err) {
        throw new Error(`Error al obtener el almacén por ID: ${err}`);
    }
}
