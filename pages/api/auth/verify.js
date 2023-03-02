import Cookies from 'cookies/'
const jwt = require('jsonwebtoken')

const decodeMessage = (message) => {
    // Code
    const msg = message.toString() + ''
    if(msg.length != 32) return message
    
    const bytes = []
    for(let i = 0 ; i < msg.length; i += 2) {
      bytes.push(Number.parseInt(msg.substring(i, i + 2), 16))
    }
  
    const data = []
    const positions = [11, 5, 2, 3, 13, 7]
    for(let i = 0; i < positions.length; i++) data.push(bytes[positions[i]])
    const decoder = new TextDecoder()
    const decoded = decoder.decode(new Uint8Array(data))
    
    return decoded
}

const handler = (req, res) => {
    const cookies = new Cookies(req, res)
    const { key } = req.query

    if(!Boolean(key) || key.length < 1) return res.status(401).json({message: 'Token has expired or not found'})

    const token = cookies.get(process.env.MY_SECRET_USER_KEY + key)

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