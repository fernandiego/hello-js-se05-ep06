const pessoas = [
    {
        pessoaid: 1, pessoanome: "Joe", pessoatelefone: "123", pessoadtnasc: "1987-05-26"
    },
    {
        pessoaid: 2, pessoanome: "Mary", pessoatelefone: "456", pessoadtnasc: "1987-05-26"
    },
    {
        pessoaid: 3, pessoanome: "Joseph", pessoatelefone: "789", pessoadtnasc: "1987-05-26"
    },
    {
        pessoaid: 4, pessoanome: "Jose", pessoatelefone: "123456", pessoadtnasc: "1987-05-26"
    },
    {
        pessoaid: 5, pessoanome: "Lia", pessoatelefone: "123789", pessoadtnasc: "1987-05-26"
    }
]


exports.up = function (knex, Promise) {
    return knex("pessoas").insert(pessoas)
};

exports.down = function (knex, Promise) {
    return knex("pessoas").del().whereIn("pessoaid", pessoas.map(e => e.pessoaid))
};
