import DB_Credentials from '../../../../Database/DB_Credentials'
const mysql = require('mysql2')
import Cookies from 'cookies'
const jwt = require('jsonwebtoken')

const handler = async (req, res) => {
    const cookies = new Cookies(req, res)

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
    WHERE user_id = ${id} AND password = BINARY '${password}';
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

    var user = rows[0]
    user = {...user, isAdmin: true}
    delete user['password']
    delete user['user_id']

    const token = jwt.sign(
        {user},
        process.env.TOKEN_KEY,
        { expiresIn: '1h' }
    )

    cookies.set('currentUserToken', token, {
        httpOnly: true,
    })

    console.log('User', user)

    // Code
    return res
        .status(200)
        .json({
            message: 'Successfully authenticated',
            user
        })
}

export default handler