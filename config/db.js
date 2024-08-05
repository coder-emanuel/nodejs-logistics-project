import mysql from 'mysql2/promise';

let pool;

try {
    pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        database: 'logistica',
        port: 3306,
        password: '1234',
      })
      console.log("data base is conecting") 

} catch (err) {
    console.log(`Error data base is not conection ${err}`)
}

export {pool};