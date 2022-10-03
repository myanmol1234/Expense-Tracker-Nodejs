
function signup(event)
   
{ event.preventDefault();

    alert("The form was submitted");

    const name=document.getElementById("text");
    const password=document.getElementById("pass");
    const email=document.getElementById("mail");

    let obj={
        name:name.value,
        password:password.value,
        email:email.value
    };
    console.log('object is ', obj);
    axios.post("http://localhost:3000/signup",obj)
    .then((response) => {
        if(response.status==201)
        {
            window.location.href="./login.html"
        }
        else
        {
            throw new Error("failed to login")
        }
        
       
      console.log(response);
    
    })
    .catch((err) => {
        
        console.log(err);
    });

    
}

function login(event)
   
{ event.preventDefault();

    alert("The form was submitted");

   // const name=document.getElementById("text");
    const password=document.getElementById("pass");
  const email=document.getElementById("email");

    let logindetails={
        //name:name.value,
        email:email.value,
        password:password.value,
     
    };
    
    axios.post("http://localhost:3000/login",logindetails)
    .then((response) => {
        if(response.status==201)
        { alert(response.data.message)
            window.location.href="./expense.html"
        }
        else
        {
            throw new Error(response.data.message)
        }
        
       
      console.log(response);
    
    })
    .catch((err) => {
        
        console.log(err);
    });

    
}

function addNewExpense(event)
   
{ event.preventDefault();

    alert("The form was submitted");

    const expenseamount =document.getElementById("text");
    const description=document.getElementById("pass");
    const category=document.getElementById("category");

    let obj={
        expenseamount:expenseamount.value,
        description:description.value,
        category:category.value
    };
    console.log('object is ', obj);
    axios.post("http://localhost:3000/addexpense",obj)
    .then((response) => {
        if(response.status==201)
        { alert("expense added");
            //addNewExpensetoUI(response.data.expense);
            console.log(response.expense);
            addNewExpensetoUI(response.expense);
        }
        else
        {
            throw new Error("failed to add")
        }
        
       
      console.log(response);
    
    })
    .catch((err) => {
        
        console.log(err);
    });

    

}

  
    window.addEventListener('load', ()=> {
        //const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/getexpenses').then(response => {
            if(response.status === 200){
                console.log(response);
                console.log(response.data.expenses);
                
                //response.data.expenses.forEach(expense => {
    
                    addNewExpensetoUI(response.data.expenses);
                
            } else {
                throw new Error();
            }
        })
    });

function addNewExpensetoUI(expense){
    console.log(expense);
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}

function deleteExpense(e, expenseid) {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/user/deleteexpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 204){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}

/*
document.getElementById('rzp-button1').onclick = async function (e) {
    alert("premium members door")
    const response  = await axios.get('http://localhost:3000/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.rzp_test_3Gj1KcjHiTWe3H, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}
*/