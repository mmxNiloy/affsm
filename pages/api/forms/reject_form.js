import DB_Credentials from '../../../Database/DB_Credentials';

const mysql = require('mysql2');

const handler = async (req, res) => {
    const { form_id } = req.query
    if(!Boolean(form_id)) 
        return res.status(404)
            .json({
                message: "Invalid form id provided"
            })
    
    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    const sql = 
    `
    UPDATE Forms
    SET clearance_level = 0
    WHERE form_id = ${form_id};
    `

    try {
        await poolPromise.execute(sql)
    } catch(err) {
        return res.status(500)
            .json({
                message: 'Database error',
                err
            })
    }

    return res.status(200)
        .json({
            message: 'Successfully rejected the form'
        })
}

export default handler