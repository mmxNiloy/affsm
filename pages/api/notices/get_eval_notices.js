import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    const { id } = req.query

    if(!Boolean(id)) {
        return res.send(404)
            .json({
                message: 'Invalid ID.'
            })
    }

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    const sql = 
    `
    SELECT notice_id, title, message, time_stamp, first_name, last_name, department_name
    FROM Notices
    JOIN Users
    ON user_id = evaluator_id
    JOIN Departments
    USING (department_id)
    WHERE evaluator_id = ${id}
    ORDER BY time_stamp DESC;
    `

    var rows = []

    try {
        [rows] = await poolPromise.execute(sql)
    } catch (err) {
        console.log('Database error', err)
        return res.status(500)
            .json({
                message: 'Database error.'
            })
    }

    return res.status(200)
        .json({
            message: 'Successfully fetched notices.',
            notices: rows
        })
}

export default handler