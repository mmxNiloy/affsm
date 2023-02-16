import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    const { id, semester, limit } = req.query

    if(!Boolean(id)) return res.status(500).json({message: 'Invalid student ID'})

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    var query = 
    `
    SELECT form_id, student_id, time_stamp, clearance_level, semester
    FROM Forms
    WHERE student_id = ${id}
    `

    if(Boolean(semester)) query += ` AND semester = ${semester}`
    if(Boolean(limit)) query += ` LIMIT ${limit}`
    query += ';'


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

    return res.status(200).json({message: 'Successfully fetched forms', forms: rows})
}

export default handler