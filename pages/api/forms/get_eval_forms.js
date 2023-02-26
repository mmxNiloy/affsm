import DB_Credentials from '../../../Database/DB_Credentials'
import Form from '../../../models/Form'

const mysql = require('mysql2')

const handler = async (req, res) => {
    const { limit, department, role, semester } = req.query

    if(!Boolean(department) || !Boolean(role)) return res.status(404).send({message: 'Invalid Department ID or Role.'})

    const connection = mysql.createPool(DB_Credentials)
    const poolPromise = connection.promise()
    var query = 
    `
    SELECT * 
    FROM form_infos
    `

    if(role === 'dept') {
        query += ` WHERE department_id = BINARY '${department}'\n`
    } else if(role === 'prov') {
        // Clarification: Here department is the hall id for a provost
        // Because we don't take null values kindly in this part of the town.
        query += ` WHERE allotted_hall = BINARY '${department}'\n`
    }
    // TODO: Set filter conditions for other roles, (eg: accounts office, bank, exam controller)

    if(Boolean(semester)) query += ` AND semester = ${semester}`
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