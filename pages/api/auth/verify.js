import Cookies from 'cookies/'
const jwt = require('jsonwebtoken')

const handler = (req, res) => {
    const cookies = new Cookies(req, res)

    const token = cookies.get('currentUserToken')

    if(!Boolean(token)) return res.status(401).json({message: 'Token has expired or not found'})
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        const { user } = decoded

        // A user is found
        // Filter the data and send it back as a response
        return res.status(200).json({message: 'Verification successful', user})
    } catch (err) {
        return res.status(404).json({message: 'Invalid token', })
    }
}

export default handler