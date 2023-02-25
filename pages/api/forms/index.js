import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    const { id, semester, limit } = req.query

    if(!Boolean(id)) return res.status(500).json({message: 'Invalid student ID'})

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    var query = 
    `
    SELECT Forms.semester, 
        course_code, form_id, student_id, 
        time_stamp, clearance_level, permanent_address, 
        current_address, contact, course_title, 
        department_id, allotted_hall, hall_name
    FROM Forms
    JOIN FormCourses
    USING (form_id)
    JOIN Courses
    USING (course_code)
    JOIN Students
    USING (student_id)
    JOIN Halls
    ON allotted_hall = hall_id
    WHERE student_id = ${id}
    `

    if(Boolean(semester)) query += ` AND Forms.semester = ${semester}`
    query += ' ORDER BY time_stamp DESC;'

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
    const forms = new Map()
    for(let i = 0; i < rows.length; i++) {
        const id = rows[i].form_id
        if(!Boolean(forms.get(id)))
            forms.set(id, [rows[i]])
        else forms.set(id, [...forms.get(id), rows[i]])
    }

    var result = Array.from(forms, 
        ([key, value]) => ({
            courses: value,
            form_id: key,
        })
    )

    if(Boolean(limit)) result = result.slice(0, Math.min(limit, result.length))

    return res
        .status(200)
        .json({
            message: 'Successfully fetched forms', 
            forms: result
        })
}

export default handler