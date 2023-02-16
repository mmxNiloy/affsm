import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Action not allowed'})
    }

    const {
        student_id,
        semester,
        contact,
        current_address,
        permanent_address,
        selectedCourses,
    } = req.body

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()

    const query =
    `
    INSERT INTO Forms(student_id, permanent_address, current_address, contact, semester)
    VALUES
    (${student_id}, '${permanent_address}', '${current_address}', '${contact}', ${semester});
    `

    var rows = []
    var columns = []
    try {
        [rows, columns] = await poolPromise.execute(query);
        console.log('Data', rows)
    } catch (e) {
        return res
            .status(500)
            .json({
                message: 'SQL Error',
                error: e,
            })
    }

    var sql = 
    `
    INSERT INTO FormCourses
    VALUES
    (${rows.insertId}, '${selectedCourses[0].curse_code}')
    `

    for(let i = 1 ; i < selectedCourses.length ; i++) {
        sql += `,\n(${rows.insertId}, '${selectedCourses[i].course_code}')`
    }

    sql += ';'

    try {
        [rows, columns] = await poolPromise.execute(sql);
        console.log('Data', rows)
    } catch (e) {
        console.log('database error', e)
        return res
            .status(500)
            .json({
                message: 'SQL Error',
                error: e,
            })
    }

    return res.status(200).json({message: 'Successfully inserted form information'})
}

export default handler