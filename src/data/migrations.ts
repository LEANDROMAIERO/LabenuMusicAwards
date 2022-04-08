// import { BaseDatabase } from "./BaseDatabase";


// const createTables = async () => {
//     await this.getConnection(
//         `
//     CREATE TABLE IF NOT EXISTS NOME_TABELA_BANDAS (
//         id VARCHAR(255) PRIMARY KEY,
//         name VARCHAR(255) UNIQUE NOT NULL,
//         music_genre VARCHAR(255) NOT NULL,
//         responsible VARCHAR(255) UNIQUE NOT NULL 
//       );
//       CREATE TABLE IF NOT EXISTS NOME_TABELA_SHOWS (
//         id VARCHAR(255) PRIMARY KEY,
//         week_day VARCHAR(255) NOT NULL,
//         start_time INT NOT NULL,
//         end_time INT NOT NULL,
//         band_id VARCHAR(255) NOT NULL,
//         FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
//       );
//       CREATE TABLE IF NOT EXISTS NOME_TABELAS_USUÁRIOS (
//         id VARCHAR(255) PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL UNIQUE,
//         password VARCHAR(255) NOT NULL,
//         role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
//       );
//     `
//     )
//         .then(() => {
//             console.log("Tabelas criadas com sucesso!")
//         })
//         .catch((error: { sqlMessage: any; }) => console.log(error.sqlMessage));
// }

// const closeConnection = () => {
//     BaseDatabase.destroyConnection()
// }

// createTables()
//     .finally(closeConnection)