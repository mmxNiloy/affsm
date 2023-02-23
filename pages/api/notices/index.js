import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    if(req.method !== 'GET') {
        return res.status(405).send({message: 'Method not supported'})
    }

    var { limit } = req.query

    if(!Boolean(limit)) limit = 100

    const connection = mysql.createPool(DB_Credentials)

    const query = 
    `
    SELECT notice_id, title, message, time_stamp, first_name, last_name, department_name
    FROM Notices
    JOIN Users
    ON user_id = evaluator_id
    JOIN Departments
    USING (department_id)
    ORDER BY time_stamp DESC
    LIMIT ${limit}
    `
    const poolPromise = connection.promise()

    var rows = []
    var columns = []
    try {
        [rows, columns] = await poolPromise.execute(query)
    } catch (e) {
        return res
            .status(500)
            .json({
                message: 'SQL Error',
                error: e,
            })
    }

    return res.status(200).json({message: 'Successfully fetched notices', notices: rows})


}

export default handler