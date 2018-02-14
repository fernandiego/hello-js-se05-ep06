
exports.up = knex => knex.schema
    .createTable("pessoas", tb => {
        tb.increments("pessoaid")
        tb.string("pessoanome")
        tb.string("pessoatelefone")
        tb.timestamp("pessoadtnasc")
    })

exports.down = knex => knex.schema
    .dropTable("pessoas")
