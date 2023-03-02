const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
import Cookies from 'cookies'
import DB_Credentials from '../../../../Database/DB_Credentials'

const handler = async (req, res) => {
    const cookies = new Cookies(req, res)

    // Get the student id and password from the query parameters
    const {id, password} = req.query

    const connection = mysql.createPool(DB_Credentials)

    const poolPromise = connection.promise();
    const query = 
    `
    SELECT *
    FROM Users
    WHERE user_id = ${id} AND password = BINARY '${password}';
    `
    var rows = []
    var columns = []
    try {
        [rows, columns] = await poolPromise.execute(query)
    } catch (e) {
        return res
            .status(500)
            .json({
                message: 'Authentication failed. Invalid username or password.'
            })
    }

    if(rows.length === 0) {
        return res
            .status(500)
            .json({
                message: 'Authentication failed. Invalid username or password.'
            })
    }

    const studentQuery = 
    `
    SELECT *
    FROM studentinformations
    WHERE user_id = ${id};
    `

    try {
        [rows, columns] = await poolPromise.execute(studentQuery)
    } catch (e) {
        return res
            .status(500)
            .json({
                message: 'Database error.'
            })
    }

    if(rows.length === 0) {
        return res
            .status(500)
            .json({
                message: 'Invalid Credentials.'
            })
    }

    const user = {...rows[0]}

    delete user.password
    delete user.user_id

    const token = jwt.sign(
        {user},
        process.env.TOKEN_KEY,
        {
            expiresIn: '1h',
        } 
    )

    cookies.set('currentUserToken', token)

    console.log('Login successful')

    return res.status(200).json({message: 'Authentication successful!'})
}

export default handler;