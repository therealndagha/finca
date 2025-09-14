

import db from '../config/db.js';


export async function getAllLoanProducts(req, res){
    try {
        const [rows] = await db.query(`SELECT * FROM loan_product`);
        if(rows.length===0){
            return res.status(200).json({
                success:false,
                message: 'no loan products found, please add some'
            })
        }
        return res.status(200).json({
            success:true,
            data:rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'some error occured while trying to get loan products'
        })
    }
}