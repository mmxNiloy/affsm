import DB_Credentials from '../../../Database/DB_Credentials';

const mysql = require('mysql2');

const handler = async (req, res) => {
    const { form_id, evaluator_id, clearance_level } = req.query

    if(!Boolean(form_id) || !Boolean(evaluator_id) || !Boolean(clearance_level)) {
        return res.status(404)
            .json({message: "Invalid credentials"})
    }

    const connection = mysql.createPool(DB_Credentials)
    const promisePool = connection.promise()
    const update =
    `
    UPDATE Forms
    SET clearance_level = ${Number.parseInt(clearance_level) + 1}, time_stamp=NOW()
    WHERE form_id = ${form_id};
    `

    const insert =
    `
    INSERT INTO Evaluates
    VALUES
    (${evaluator_id}, ${form_id}, ${clearance_level});
    `

    try {
        await promisePool.execute(update)
        await promisePool.execute(insert)
    } catch (err) {
        return res.status(500)
            .json({
                message: 'Database error: ',
                err
            })
    }

    return res.status(200).json({
        message: 'Successfully approved the form'
    })
}

export default handler