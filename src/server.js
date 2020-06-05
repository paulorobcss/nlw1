const express = require("express")
const server = express()

// Configurar pasta pública para os arquivos aparecerem como se estivessem fora dela
server.use(express.static("public"))

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
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

// Ligar o servidor
server.listen(3000)