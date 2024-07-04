import DB_Credentials from '../../../Database/DB_Credentials';
import Form from '../../../models/Form';

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

    

    const form = new Form()
    form.buildFromRows(rows)
    
    return res.status(200)
        .json({
            message: 'Successfully fetched the form',
            form
        })
}

export default handler