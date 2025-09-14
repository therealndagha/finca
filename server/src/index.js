
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import customerRoutes from './routes/customer-routes.js';
import staffRoutes from './routes/staff-routes.js';
import branchRoutes from './routes/branch-routes.js';
import groupRoutes from './routes/group-routes.js';
import loanProductRoutes from './routes/loanProducts-routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
     origin: 'http://localhost:5173', 
    credentials: true}  
));
app.use(cookieParser());

app.get('/api', (req, res)=>{
    res.status(200).json({
        success: true,
        message: 'API is running...'
    })
});

app.use('/api/branch', branchRoutes)
app.use('/api/customer',customerRoutes );
app.use('/api/staff', staffRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/loanproducts', loanProductRoutes)

app.listen(PORT, ()=>console.log(`server is listening on port: ${PORT}`));