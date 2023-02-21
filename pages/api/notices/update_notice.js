const mysql = require('mysql2');
const { default: DB_Credentials } = require('../../../Database/DB_Credentials');

const handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405)
            .json({
                message: 'Method not allowed'
            })
    }

    const { notice_id, title, message } = req.body

    if(
        !Boolean(notice_id) ||
        (!Boolean(title) && title.length < 1) ||
        (!Boolean(message) && message.length < 1)
    ) return res.status(405).json({ message: 'Invalid fields'})

    const conncection = mysql.createPool(DB_Credentials)
    const poolPromise = conncection.promise()
    const sql =
    `
    UPDATE Notices
    SET
    title = '${title}',
    message = '${message}',
    time_stamp = NOW()
    WHERE notice_id = ${notice_id};
    `

    var rows = []

    try {
        [rows] = await poolPromise.execute(sql)
    } catch (err) {
        return res.status(500)
            .json({
                message: 'Databse error',
            })
    }

    return res.status(200)
        .json({
            message: 'Successfully updated the notice',
        })
}

export default handler