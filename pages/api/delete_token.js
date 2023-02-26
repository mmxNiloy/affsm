import Cookies from 'cookies/'
const jwt = require('jsonwebtoken')

const handler = (req, res) => {
    const cookies = new Cookies(req, res)

    cookies.set('currentUserToken', null, {
        httpOnly: true
    })

    return res.status(200).send('Deleted token')
}

export default handler;