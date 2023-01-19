const mysql = require('mysql2')

const handler = async (req, res) => {
    // Get the student id and password from the query parameters
    const {id, password} = req.query

    const connection = mysql.createPool({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        ssl: {"rejectUnauthorized":true}
    })

    const poolPromise = connection.promise();
    const query = 
    `
    SELECT *
    FROM Students
    WHERE student_id = ${id} AND password = '${password}';
    `
    var rows = []
    var columns = []
    try {
        [rows, columns] = await poolPromise.execute(query)
    } catch (e) {
        res.status(500).json({message: 'Authentication failed. Invalid username or password.'})
        return;
    }

    if(rows.length === 0) {
        res.status(500).json({message: 'Authentication failed. Invalid username or password.'})
        return;
    }

    res.status(200).json({message: 'Authentication successful!', user: rows[0]})
}

export default handler;