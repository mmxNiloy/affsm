import DB_Credentials from '../../../../Database/DB_Credentials'
const mysql = require('mysql2')

const handler = async (req, res) => {
    const { id, password } = req.query
    
    if(!Boolean(id) || !Boolean(password)) {
        return res
            .status(500)
            .send('Invalid user id or password')
    }

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()

    var query =
    `
    SELECT *
    FROM Evaluators
    JOIN Users
    ON user_id = evaluator_id
    WHERE user_id = ${id} AND password = '${password}';
    `
    
    var rows = []
    var columns = []

    try {
        [rows, columns] = await poolPromise.execute(query)
    } catch (err) {
        return res
            .status(404)
            .json(
                {
                    message: 'Invalid credentials',
                    error: err
                }
            )
    }

    const user = rows[0]
    delete user['password']
    delete user['user_id']

    // Code
    return res
        .status(200)
        .json({
            message: 'Successfully authenticated',
        })
}

export default handler