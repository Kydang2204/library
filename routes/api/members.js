const express=require('express');
const uuid=require('uuid');
const router=express.Router();
const members=require('../../Members')

//get all members
router.get('/',(req,res) => res.json(members));
// get single member
router.get('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found)
        res.json(members.filter(member=>member.id===parseInt(req.params.id)))
    else
    res.status(400).json({msg: `Not found with id ${req.params.id}`});
});
//creat member
router.post('/',(req,res)=>{
    const newMember={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:"active"
    };
    if(!newMember.name||!newMember.email)
    {
        res.json({msg: 'Please input name and email'});
    };
    members.push(newMember);
    res.json(members);
})
//put member
router.put('/:id',(req,res)=>
{
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found)
    {
        const updmember=req.body;
        members.forEach(member=>{
            if(member.id===parseInt(req.params.id))
            {
                member.name = updmember.name ? updmember.name : member.name;
                member.email = updmember.email ? updmember.email : member.email;
                res.json({
                    msg:'Member update',
                    member});
            }
        })
        
    }
    else
    res.status(400).json({msg: `Not found with id ${req.params.id}`});
})

router.delete('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found)
        res.json({msg:"Member deleted ",Members: members.filter(member=>member.id!==parseInt(req.params.id))})
    else
    res.status(400).json({msg: `Not found with id ${req.params.id}`});
})

module.exports=router;
