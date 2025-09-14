
import db from '../config/db.js';

export async function getAllBranches(req, res){
    try {
        const [rows] = await db.query(`SELECT * FROM branch`);
        if(rows.length === 0){
            return res.status(400).json({
                success:false,
                message: 'no branches found please add some'
            })
        }
        return res.status(200).json({
            success:true,
            data: rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'some error occured while attempting to fetch branches'
        })
    }
}


export async function addBranch(req, res){
    try {
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'some error occured while attempting to fetch branches'
        })
    }
}

export async function updateBranch(req, res){
    try {
        
    } catch (error) {
        
    }
}

export async function deleteBranch(req,res){
    try {
        
    } catch (error) {
        
    }
}