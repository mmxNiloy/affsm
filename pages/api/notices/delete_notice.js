import DB_Credentials from "../../../Database/DB_Credentials"

const mysql = require('mysql2')
const handler = async (req, res) =>
{
    const { notice_id } = req.query
    if(!Boolean(notice_id)) {
        return res.status(404)
        .json({
            message:'Invalid ID.'
        })
        
    

   }

   const connection = mysql.createPool(DB_Credentials)
   const poolPromise = connection.promise()
   const sql = 
   `
   DELETE FROM Notices
   WHERE notice_id = ${notice_id};
   `
   var rows = []

    try {
        [rows] = await poolPromise.execute(sql)
    } catch (err) {
        console.log('Database error', err)
        return res.status(500)
            .json({
                message: 'Database error.'
            })
    }
    

    return res.status(200)
        .json({
            message: 'Successfully deleted notice.',
        })

   
}

export default handler