const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const jobRoutes = require('./routes/jobRoutes');

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err.message)
})

app.use(express.json());
app.use("/auth", authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

app.listen(3000,()=>{
    console.log('Server is running at port 3000');
})