import db from '../config/db.js';

export async function getAllCustomers(req, res){

  try {
    const [rows] = await db.query(`SELECT * FROM customers`);
    return res.status(200).json({
        success: true,
        message: 'here is the list of all customers',
        data: rows
    })
  } catch (error) {
     return res.status(500).json({
        success: false,
        message: 'some error occured while trying to get customer list'
     })
  }

}


export async function addCustomers(req, res){

    try {
        const {f_name, l_name, national_id_no, customer_type, phone_no, address, email, branch_id} = req.body;
        if(!f_name || !l_name || !national_id_no || !customer_type || !phone_no || !address || !branch_id) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const [rows] = await db.query(`SELECT customer_id from customers WHERE national_id_no=?`, [national_id_no]);

        if(rows.length > 0){
            return res.status(400).json({
                success:false,
                message: 'you are already registered as a customer, national_id already in use.'
            })
        }

        await db.query(`INSERT INTO customers (f_name, l_name, national_id_no, customer_type, phone_no, address, email, branch_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
        [f_name, l_name, national_id_no, customer_type, phone_no, address, email, branch_id]);

        return res.status(201).json({
            success: true,
            message: 'customer added successfully'
        })



        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'some error occured while trying to add customer'
        })
    }

}



export async function deleteCustomer(req, res){
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: 'customer id is required'
            })
        }
        const [rows] = await db.query(`SELECT id from customers WHERE id=${id}`);
        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'customer not found'
            })
        }
        await db.query(`DELETE FROM customers WHERE id=${id}`);
        return res.status(200).json({
            success: true,
            message: 'customer deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'some error occured while trying to delete customer'
        })
    }
}

export async function updateCustomer(req, res){
   try {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: 'customer id is required'
        })
    }
    const [rows] = await db.query(`SELECT id from customers WHERE id=?`, [id]);
    if(rows.length === 0){
        return res.status(404).json({
            success: false,
            message: 'customer not found'
        })
    }
    const {f_name, l_name, national_id_no, customer_type, phone_no, address, email, branch_id} = req.body;
    if(!f_name || !l_name || !national_id_no || !customer_type || !phone_no || !address || !email || !branch_id) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    await db.query(`UPDATE customers SET f_name=?, l_name=?, national_id_no=?, customer_type=?, phone_no=?, address=?, email=?, branch_id=? WHERE customer_id=?`, 
    [f_name, l_name, national_id_no, customer_type, phone_no, address, email, branch_id, id]);

    return res.status(200).json({
        success: true,
        message: 'customer updated successfully'
    })
   } catch (error) {
       return res.status(500).json({
           success: false,
           message: 'some error occured while trying to update customer'
       })                           
   }
}

    