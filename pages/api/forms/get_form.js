import DB_Credentials from '../../../Database/DB_Credentials';

const mysql = require('mysql2');

const handler = async (req, res) => {
    const { form_id } = req.query

    if(!Boolean(form_id)) {
        return res.status(404)
            .json({
                message: 'Invalid form ID.'
            })
    }

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    const sql =
    `
    SELECT *
    FROM form_infos
    WHERE form_id = ${form_id}
    `

    var rows = []
    try {
        [rows] = await poolPromise.execute(sql)
    } catch(err) {
        return res.status(500)
            .json({
                message: 'Database error',
                err
            })
    }

    

    const commonData = rows[0]
    var form = {
        form_id: commonData.form_id,
        student_id: commonData.student_id,
        first_name: commonData.first_name,
        last_name: commonData.last_name,
        name_of_father: commonData.name_of_father,
        name_of_mother: commonData.name_of_mother,
        name_of_guardian: commonData.name_of_guardian,
        religion: commonData.religion,
        data_of_birth: commonData.data_of_birth,
        ethnicity: commonData.ethnicity,
        nationality: commonData.nationality,
        allotted_hall: commonData.allotted_hall,
        hall_name: commonData.hall_name,
        email: commonData.email,
        semester: commonData.semester,
        session: commonData.session,
        department_id: commonData.department_id,
        department_name: commonData.department_name,
        time_stamp: commonData.time_stamp,
        clearance_level: commonData.clearance_level,
        permanent_address: commonData.permanent_address,
        current_address: commonData.current_address,
        contact: commonData.contact,
    }
    
    for(let i = 0; i < rows.length; i++) {
        rows[i] = {
            course_title: rows[i].course_title,
            course_code: rows[i].course_code,
            type: rows[i].type,
            cousrse_semester: rows[i].cousrse_semester,
            course_department_id: rows[i].course_department_id
        }
    }

    form = {...form, courses: rows}
    
    return res.status(200)
        .json({
            message: 'Successfully fetched the form',
            form
        })
}

export default handler