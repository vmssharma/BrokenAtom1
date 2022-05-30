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
        CREATE TABLE brokenEmails (
            email STRING PRIMARY KEY,
            id INT8 REFERENCES brokenPeople(id)
        );
    `;
    await client.query(s, cb);
}

async function putData(client, cb) {
    const s = `
        INSERT INTO brokenEmails (email, id)
        VALUES ('oendrila@brokenatom.io', 8);
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
    ADD COLUMN age INT8 NOT NULL CHECK (AGE >= 20) DEFAULT 20
    `;
    await client.query(s, cb);
}

async function removeColumn(client, cb) {
    const s = `
    ALTER TABLE brokenPeople
    DROP COLUMN age;
    `;
    await client.query(s, cb);
}

async function relationalQuery(client, cb) {
    const s = `
    SELECT p.id, p.brokenname, p.brokenrole
    FROM brokenPeople AS p, brokenEMails as e
    WHERE e.email='ashish@brokenatom.io' AND p.id=e.id;
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

    // createTable(client, cb);

    // await putData(client, cb);

    // await getData(client, cb);

    // await updateData(client, cb);

    // await deleteData(client, cb);

    // await addColumn(client, cb);

    // await removeColumn(client, cb); 

    await relationalQuery(client, cb);

}



main();