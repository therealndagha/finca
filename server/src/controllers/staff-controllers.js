import db from '../config/db.js';


export async function getAllStaffMembers(req, res){
    try {
        const [rows] = await db.query(`
             SELECT 
    s.staff_id,
    s.f_name,
    s.l_name,
    s.email,
    s.phone_no,
    s.address,
    s.branch_id,
    r.role_name  -- from role table
    FROM staff s
   JOIN role r ON s.role_id = r.role_id;

            `);
            if(rows.length === 0) return res.status(404).json({message: 'No staff members found'});
              return res.status(200).json({
                success: true,
                data: rows
              });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while trying to retrieve staff members',
        });
    }
}

export async function getStaffMemberById(req, res){
    const { id } = req.params;  
    try {

        const [rows] = await db.query(`SELECT * FROM staff WHERE id = ?`, [id]);
            if(rows.length === 0) return res.status(404).json({message: 'Staff member not found'});
              return res.status(200).json({
                success: true,
                data: rows[0]
              });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while trying to retrieve staff member',
        });
    }
}

export async function addStaffMember(req,res){
    try {
        const {branch_id, role_id, f_name, l_name, email,phone_no,address} = req.body;
        if(!branch_id || !role_id || !f_name || !l_name || !email || !phone_no || !address){
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }
        const [result] = await db.query(`INSERT INTO staff (branch_id, role_id, f_name, l_name, email, phone_no, address) VALUES (?, ?, ?, ?, ?, ?, ?)`, [branch_id, role_id, f_name, l_name, email, phone_no, address]);
        return res.status(201).json({
            success: true,
            data: {
                id: result.insertId,
                branch_id,
                role_id,
                f_name,
                l_name,
                email,
                phone_no,
                address
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while trying to add staff member',
        });                             
    }
}


export async function updateStaffMember(req, res){
    const { id } = req.params;
    const {branch_id, role_id, f_name, l_name, email,phone_no,address} = req.body;      
    try {
        const [result] = await db.query(`UPDATE staff SET branch_id = ?, role_id = ?, f_name = ?, l_name = ?, email = ?, phone_no = ?, address = ? WHERE id = ?`, [branch_id, role_id, f_name, l_name, email, phone_no, address, id]);
        if(result.affectedRows === 0) return res.status(404).json({message: 'Staff member not found'});
        return res.status(200).json({
            success: true,
            message: 'Staff member updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while trying to update staff member',
        });
    }
}       


export async function deleteStaffMember(req, res){
    const { id } = req.params;  
    try {
        const [result] = await db.query(`DELETE FROM staff WHERE id = ?`, [id]);
        if(result.affectedRows === 0) return res.status(404).json({message: 'Staff member not found'});
        return res.status(200).json({
            success: true,
            message: 'Staff member deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while trying to delete staff member',
        });
    }
}   


        