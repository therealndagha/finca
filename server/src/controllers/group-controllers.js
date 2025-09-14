
import db from '../config/db.js'

export async function getAllGroups(req, res){
    try {
        const [rows] = await db.query(`SELECT * FROM \`group\``);
        if(rows.length === 0){
            return res.status(200).json({
                success:false,
                message: 'no groups found please add some group'
            })
        }
        return res.status(200).json({
            success:true,
            message:'here is a list of groups',
            data: rows
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'some error occured while trying to get groups'
        })
    }
}