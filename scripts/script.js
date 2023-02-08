"use strict";
//<button class="update-btn btn" onclick=editTransaction(${id})><i class="fa-solid fa-pen"></i></button>
//getting elements
const balanceEl = document.getElementById("balance");
const moneyPlusEl = document.getElementById("income");
const moneyMinusEl = document.getElementById("expense");
const listEl = document.getElementById("lists");
const formEl = document.getElementById("form");
const transactionEl = document.getElementById("transaction");
const amountEl = document.getElementById("input-amount");
const button = document.getElementById("btn");
const restart=document.querySelector('.rest');

//global variables
let transactions = [];
let income = 0;
let expense = 0;
let balance = 0;

//init function
function init(){
  listEl.innerHTML=null;
  income=0;
  expense=0;
  balance=0;
  moneyMinusEl.innerText=null;
  moneyPlusEl.innerText=null;
  balanceEl.innerText=null;
}
init();

//update ui step-5
//map storing all amount 
function updateValue(){
  income =transactions.map((val)=>val.amount).filter((val)=>val>0).reduce((prev,val)=>prev+val,0);
  expense =transactions.map((val)=>val.amount).filter((val)=>val<0).reduce((prev,val)=>prev+val,0);
  balance =transactions.map((val)=>val.amount).reduce((prev,val)=>prev+val,0);
  console.log(income);
  console.log(expense);
  console.log(balance);
  //inner text
  moneyPlusEl.innerText= `₹${income}`;
  moneyMinusEl.innerText=`₹${expense}`;
  balanceEl.innerText=`₹${balance}`;
}

//display ui step-3
function addTransactionDom({ id, name, amount }) {

    const liEl = document.createElement("li"); 
    liEl.innerHTML = `${name} ₹${amount}
                      <button class="delete-btn btn" onclick=deleteTransaction(${id})>X</button>`;
    listEl.appendChild(liEl);
  }

  //delete item step-4
  function deleteTransaction(id) {  
    transactions = transactions.filter((transaction) =>{
        return transaction.id !== id;

    }) 
    listEl.innerHTML=null;
    //re add the list elements
    transactions.forEach((transaction) => {
        addTransactionDom(transaction)
    })
   }
//add event listener
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    //validation user input step-1

    if (transactionEl.value.trim() === "" || amountEl.value.trim() === "" || Number(amountEl.value === "0")) 
      {
        alert("Please Enter a Valid Transaction Details");
      }
      //step-2
      else{
        const transaction={
            id: Date.now(),
            name: transactionEl.value,
            amount: Number(amountEl.value),
        };
        transactions.push(transaction);

        addTransactionDom(transaction);
      }
        updateValue()

      transactionEl.value = null;
      amountEl.value = null;
        
})  

restart.addEventListener('click',function(){
  init()
})
