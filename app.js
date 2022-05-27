const { Pool } = require("pg");


function cb(err, res) {
    if (err) throw err;

    console.log("NO errors", JSON.stringify(res));

    if (res.rows.length > 0) {
        res.rows.forEach((row) => {
            console.log(row);
        });
    }
}

async function createTable(client, cb) {
    const s = `
        CREATE TABLE broken_people (
            id INT8 PRIMARY KEY,
            brokenName STRING,
            collegeName STRING,
            fresher BOOL,
            brokenRole STRING
        );
    `;
    await client.query(s, cb);
}

async function putData(client, cb) {
    const s = `
        INSERT INTO brokenPeople (id, brokenName, collegeName, fresher, brokenRole, age)
        VALUES (9, 'Some Name', 'Who cares', FALSE, 'Some Role', 19);
    `;
    await client.query(s, cb);
}

async function getData(client, cb) {
    const s = `
        SELECT brokenName, brokenRole
        FROM brokenPeople;
    `;
    await client.query(s, cb);
}

async function updateData(client, cb) {
    const s = `
        UPDATE brokenPeople
        SET brokenName= 'Jeeval Lal'
        WHERE id = 2;
    `;
    await client.query(s, cb);
}

async function deleteData(client, cb) {
    const s = `
        DELETE FROM brokenPeople WHERE id= 9;
    `;
    await client.query(s, cb);
}

async function addColumn(client, cb) {
    const s = `
    ALTER TABLE brokenPeople
    ADD COLUMN age INT8 CHECK (AGE >= 20);
    `;
    await client.query(s, cb);
}

const main = async () => {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({
        connectionString,
    });
    // connecting to database
    const client = await pool.connect().catch(console.warn);

    // if(client) console.log("connected to CRDB")
    // createTable(client, cb);

    // await putData(client, cb);

    // await getData(client, cb);

    // await updateData(client, cb);

    // await deleteData(client, cb);

    // await addColumn(client, cb);

}



main();