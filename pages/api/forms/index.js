import DB_Credentials from '../../../Database/DB_Credentials'
import Form from '../../../models/Form'

const mysql = require('mysql2')

const handler = async (req, res) => {
    const { id, semester, limit } = req.query

    if(!Boolean(id)) return res.status(500).json({message: 'Invalid student ID'})

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    var query = 
    `
    SELECT * 
    FROM form_infos
    WHERE student_id = ${id}
    `

    if(Boolean(semester)) query += ` AND Forms.semester = ${semester}`
    query += ' ORDER BY time_stamp DESC;'

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
    const forms = new Map()
    for(let i = 0; i < rows.length; i++) {
        const id = rows[i].form_id
        if(!Boolean(forms.get(id)))
            forms.set(id, [rows[i]])
        else forms.set(id, [...forms.get(id), rows[i]])
    }

    const formsArray = []
    let lim = Math.min(Boolean(limit) ? limit : 0, forms.length)

    forms.forEach(val => {
        if(lim < 1) return

        formsArray.push(new Form())
        formsArray[formsArray.length - 1].buildFromRows(val)
        lim = lim - 1
    })

    return res
        .status(200)
        .json({
            message: 'Successfully fetched forms', 
            forms: formsArray
        })
}

export default handler