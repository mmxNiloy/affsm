import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    const { id, semester, limit } = req.query

    if(!Boolean(id)) return res.status(500).json({message: 'Invalid student ID'})

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    var query = 
    `
    SELECT form_id, student_id, time_stamp, clearance_level, semester, permanent_address, current_address, contact
    FROM Forms
    WHERE student_id = ${id}
    `

    if(Boolean(semester)) query += ` AND semester = ${semester}`
    query += ' ORDER BY time_stamp DESC'
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

    var courses = []
    for(let i = 0; i < rows.length; i++) {
        const sql =
            `
            SELECT course_code
            FROM FormCourses
            WHERE form_id = ${rows[i].form_id}
            `
        
        try {
            [courses, columns] = await poolPromise.execute(sql)

            for(let j = 0; j < courses.length; j++) {
                const crSQL = 
                `
                SELECT course_title, semester
                FROM Courses
                WHERE course_code = '${courses[j].course_code}';
                `
                
                var result = []
                [result, columns] = await poolPromise.execute(crSQL)
                const course = result[0][0]
                courses[j] = {...courses[j], ...course}
            }
        } catch(err) {
            return res
                .status(500)
                .json({
                    message: 'SQL Error',
                    error: e,
                })
        }

        rows[i] = {...rows[i], courses}
    }

    return res.status(200).json({message: 'Successfully fetched forms', forms: rows})
}

export default handler