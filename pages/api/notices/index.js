import DB_Credentials from '../../../Database/DB_Credentials'

const mysql = require('mysql2')

const handler = async (req, res) => {
    if(req.method !== 'GET') {
        return res.status(405).send({message: 'Method not supported'})
    }

    var { limit } = req.query

    if(!Boolean(limit)) limit = 100

    const connection = mysql.createPool(DB_Credentials)

    const query = 
    `
    SELECT * FROM noticeinformations
    LIMIT ${limit}
    `
    const poolPromise = connection.promise()

    var rows = []
    var columns = []
    try {
        [rows, columns] = await poolPromise.execute(query)
    } catch (e) {
        return res
            .status(500)
            .json({
                message: 'SQL Error',
                error: e,
            })
    }

    return res.status(200).json({message: 'Successfully fetched notices', notices: rows})


}

export default handler