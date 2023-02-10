const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
import Cookies from 'cookies'

const handler = async (req, res) => {
    const cookies = new Cookies(req, res)

    // Get the student id and password from the query parameters
    const {id, password} = req.query

    console.log('Request params', {id, password})

    const connection = mysql.createPool({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        ssl: {"rejectUnauthorized":true}
    })

    const poolPromise = connection.promise();
    const query = 
    `
    SELECT *
    FROM Users
    WHERE user_id = ${id} AND password = '${password}';
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
    FROM Students
    JOIN Users
    ON student_id = user_id
    JOIN Departments
    USING (department_id)
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
                message: 'Database error. No record was found regarding the specified id.'
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

    cookies.set('currentUserToken', token, {
        httpOnly: true
    })

    return res.status(200).json({message: 'Authentication successful!'})
}

export default handler;