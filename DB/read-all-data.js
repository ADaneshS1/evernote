require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    try {

        const {rows} = await sql`
        SELECT * FROM note `
        console.log(rows)
    } catch (error) {
        console.log(error)
    }

}

execute()