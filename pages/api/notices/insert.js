import DB_Credentials from '../../../Database/DB_Credentials';

const mysql = require('mysql2');

const handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405)
            .json({
                message: 'Method not allowed'
            })
    }

    const { title, message, user_id } = req.body

    if(!Boolean(title) || !Boolean(message) || !Boolean(user_id)) {
        return res.status(404)
            .json({
                message: 'Invalid data'
            })
    }

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    const sql =
    `
    INSERT INTO Notices(title, message, evaluator_id, time_stamp)
    VALUES
    ('${title}', '${message}', ${user_id}, NOW());
    `

    try {
        await poolPromise.execute(sql)
    } catch (err) {
        return res.status(500)
            .json({
                message: 'Database error',
                err
            })
    }

    return res.status(200)
        .json({
            message: 'Successfully posted the form'
        })
}

export default handler