const cfg = require("./knexfile")
const knex = require("knex")(cfg.development)
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const vue = require("vue")

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json()) // what's this? what's this?
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

const deuruim = res => error => {
    res.status(500).send(error)
    console.log(error)
}


app.get("/listpessoas", (req, res) => {
    knex("pessoas").select().then(ret => {
        res.send(ret)
    }).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })
})

app.get("/listpessoas/:id", (req, res) => {
    knex("pessoas").select().where("pessoaid", req.params.id).then(ret => {
        res.send(ret)
    }).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })
})

app.post("/addpessoa", (req, res) => {
    const pessoa = req.body
    knex("pessoas").insert(pessoa, "pessoaid").then(ret => {
        res.send(ret)
    }).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })
})

app.put("/save", (req, res) => {
    const pessoaid = req.body.pessoaid
    knex("pessoas").update(req.body).where({ pessoaid })
        .then(ret => res.send(ret)).catch(deuruim(res))
})
app.delete("/:pessoaid", (req, res) => {
    const pessoaid = req.params.pessoaid
    knex("pessoas").del().where({ pessoaid })
        .then(ret => res.send("Usuário eliminado")).catch(deuruim(res))
})


knex.migrate.latest().then(_ =>
    app.listen(3000, _ =>
        console.log("server online!")))
