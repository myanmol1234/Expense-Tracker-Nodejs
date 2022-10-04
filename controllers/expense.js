const Expense = require('../models/expense');

const addexpense = (req, res) => {
    const { expenseamount, description, category } = req.body;

    Expense.create({expenseamount, description, category })
        .then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(401).json({success : false, error: err})
    })
}

const getexpenses = (req, res)=> {
   console.log("idddddd is",req.user.id);
    Expense.findAll({where:{userId:req.user.id}}).then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        return res.status(500).json({ error: err, success: false})
    })
}

const deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    if(expenseid==undefined || expenseid.length===0)
    {
        return res.status(400).json({success:false})
    }
    Expense.destroy({where: { id: expenseid }}).then(() => {
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    })
}

module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
}