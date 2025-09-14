

import db from '../config/db.js';

export async function getAllLoanApplications(req, res){
    try {
        const [rows] = await db.query('SELECT * FROM loan_application');
        if(rows.length===0){
            return res.status(400).json({
                success:false,
                message:'no loan applications found'
            })
        }

        return res.status(200).json({
            success:true,
            message:'loan applications fetched successfully',
            data:rows
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'some error occurred while attempting to fetch loan applications',
        })
    }   
}

export async function addLoanApplication(req, res){
    try {
        const {customer_id, product_id, branch_id, amount_applied, tenure_months, guarantor_id} = req.body;

        if(!customer_id || !product_id || !branch_id || !amount_applied || !tenure_months){
            return res.status(400).json({
                success:false,
                message:'please provide all required fields'
            })
        }

        const [rows] = await db.query('INSERT INTO loan_application (customer_id, product_id, branch_id, amount_applied, tenure_months, guarantor_id) VALUES (?,?,?,?,?,?)',
        [customer_id, product_id, branch_id, amount_applied, tenure_months, guarantor_id || null]);


    }   catch (error) {
        return res.status(500).json({
            success:false,
            message:'some error occurred while attempting to add loan application',
        })
    }
}


export async function updateLoanApplication(req,res){
    try {
        const {id}= req.params;
        const {customer_id, product_id, branch_id, amount_applied, tenure_months, status, guarantor_id} = req.body;
        if(!customer_id || !product_id || !branch_id || !amount_applied || !tenure_months || !status){
            return res.status(400).json({
                success:false,
                message: 'please provide all required fields'
            })
        }
        const [rows] = await db.query(`UPDATE loan_application SET customer_id=?, product_id=?, branch_id=?, amount_applied=?, tenure_months=?, status=?, guarantor_id=? WHERE loan_application_id=?`, [customer_id, product_id, branch_id, amount_applied, tenure_months, status, guarantor_id || null, id]);
        if(rows.affectedRows===0){
            return res.status(400).json({
                success:false,
                message:'no loan application found with the provided id'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'some error occurred while attempting to update loan application',
        })
    }
}

export async function deleteLoanApplication(req, res){
    try {
        const {id} = req.params.id;
        if(!id){
            return res.status(400).json({
                success:false,
                message: 'loan application id is required'
            })
        }
        const [rows] = await db.query(`DELETE FROM loan_application WHERE loan_application_id=?`, [id]);
        if(rows.affectedRows > 0){

        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'some error occured while trying to delete loan application'
        })
    }
}