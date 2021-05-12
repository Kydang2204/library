const express=require('express');
const logger=require('./middleware/logger')
const path=require('path');

const app=express();
//init middleware
//body parser middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server use port ${PORT}`));

