import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    const { id } = req.query

    if(!Boolean(id)) {
        return res.status(404)
            .json({
                message: 'Invalid Student ID',
                sid: '' + id
            })
    }

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()

    const sql = 
    `
    SELECT first_name, last_name, semester, session, hall_name,
    student_id, name_of_father, name_of_mother, 
    name_of_guardian, religion, date_of_birth, ethnicity,
    nationality, allotted_hall, department_name
    FROM Students
    JOIN Users
    ON user_id = student_id
    JOIN Halls
    ON hall_id = allotted_hall
    JOIN Departments
    USING (department_id)
    WHERE student_id = ${id};
    `
    var rows = []
    var cols = []

    try {
        [rows, cols] = await poolPromise.execute(sql)
    } catch (err) {
        return res.status(500)
            .json({
                message: 'Database error.',
                error: err
            })
    }


    return res.status(200).json({
        message: 'Successfully fetched student data',
        student: rows[0]
    })
}

export default handler