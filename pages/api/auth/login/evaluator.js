import DB_Credentials from '../../../../Database/DB_Credentials'
const mysql = require('mysql2')
import Cookies from 'cookies'
import User from '../../../../models/User'
const jwt = require('jsonwebtoken')

const encodeMessage = (message) => {
    // Prime encoding, avoid for better security
    // Uses a permutation of primes to encode the id(message)
    // Only encode valid evaluator id
    const msg = message.toString() + ''
    if(msg.length != 6) {
        return msg
    }
  
    const encoder = new TextEncoder()
    const data = encoder.encode(msg)
    const positions = [11, 5, 2, 3, 13, 7]
    const bytes = []
    for(let i = 0 ; i < 16 ; i++) bytes.push(Math.floor(Math.random() * 16))
    for(let i = 0 ; i < data.length ; i++) bytes[positions[i]] = data[i]
    //console.log('bytes', new Uint8Array(bytes))
    return Array.from(new Uint8Array(bytes)).map(b => b.toString(16).padStart(2, '0')).join('')
}

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
    FROM evaluatorinformations
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

    if(rows.length === 0) {
        return res
            .status(500)
            .json({
                message: 'Invalid credentials.'
            })
    }

    const user = new User()
    user.buildFromRow({...rows[0], isAdmin: true})
    user.password = ''

    const token = jwt.sign(
        { user },
        process.env.TOKEN_KEY,
        { expiresIn: '1h' }
    )

    const encodedID = encodeMessage(user.user_id + '') + encodeMessage((Date.now() % 1000000).toString().padStart(6, '0'))

    cookies.set(process.env.MY_SECRET_USER_KEY + encodedID, token, {
        httpOnly: true
    })

    console.log('User', user)

    // Code
    return res
        .status(200)
        .json({
            message: 'Successfully authenticated',
            secret: encodedID
        })
}

export default handler