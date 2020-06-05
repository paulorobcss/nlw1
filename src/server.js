const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

// Configurar pasta pública para os arquivos aparecerem como se estivessem fora dela
server.use(express.static("public"))

// Habilitar o uso do req.body na página
server.use(express.urlencoded({extended: true}))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => { // render funciona apenas com o nunjucks, caso ainda não tenha instalado, usar sendFile(__dirname + "arquivo.html")
    return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    // Para pegar as informações da url, utilizar req.query, mas apenas as que aparecerem na url, do método get
    return res.render("create-point.html")
})
server.post("/savepoint", (req, res) => {
    // Inserir dados no banco de base
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData (err){
        if (err) {return console.log(err)}
        // console.log("Cadastrado com sucesso!")
        // console.log(this)
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
})
server.get("/search", (req, res) => {
    const search = req.query.search
    if (search == ""){
        return res.render("search-results.html", {total: 0})
    }

    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {return console.log(err)}
        const totalPlaces = rows.length
        // Mostrar a página com os dados do banco
        return res.render("search-results.html", {places: rows, total: totalPlaces})
    })
})

// Ligar o servidor
server.listen(3000)