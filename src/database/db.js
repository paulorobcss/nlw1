// Importar o sqlite3 -- o verbose faz com que ele retorne no terminal o que está acontecendo
const sqlite3 = require("sqlite3").verbose()
// Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Exportando o arquivo para utilizá-lo através do outro
module.exports = db
// db.serialize(() => {
//     // Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             name,
//             image,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "Papersider",
//         "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Guilherme Gembala, Jardim América",
//         "N° 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData (err){
//         if (err) {return console.log(err)}
//         console.log("Cadastrado com sucesso!")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     // Consultar os dados da Tabela
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if (err) {return console.log(err)}
    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })

//     // Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [5], function(err) {
    //     if (err) {return console.log(err)}
    //     console.log("Registro deletado com sucesso!")
    // })
// })