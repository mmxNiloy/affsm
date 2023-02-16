import Cookies from 'cookies/'
const jwt = require('jsonwebtoken')
import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    var { semester, department } = req.query

    if(!Boolean(semester) || !Boolean(department)) {
        return res.status(500).json({ message: 'Invalid semester or department' })
    }

    semester = Number.parseInt(semester)

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()

    var query = 
    `
    SELECT course_code, course_title, semester
    FROM Courses
    WHERE department_id = '${department}' AND semester IN (${semester}
    `

    if(semester > 3) query += `, ${semester - 2}`
    query += ')\nORDER BY semester DESC, course_code ASC;'

    

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

    return res.status(200).json({message: 'Successfully fetched courses', courses: rows})
}

export default handler