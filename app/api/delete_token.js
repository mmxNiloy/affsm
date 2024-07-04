import Cookies from 'cookies/'
const jwt = require('jsonwebtoken')

const handler = (req, res) => {
    const cookies = new Cookies(req, res)

    const { key } = req.query
    if(!Boolean(key) || key.length < 1) return res.status(404).json({ message: "No token found" })
    
    cookies.set(process.env.MY_SECRET_USER_KEY + key, null, {
        httpOnly: true
    })

    return res.status(200).send('Deleted token')
}

export default handler;