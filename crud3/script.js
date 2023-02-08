const inputEl=document.getElementById('crud');
const formEl = document.getElementById('form-item');
const btnEl=document.getElementById('btn');
const containerEl=document.getElementById('todo-list-container');
//global variables
let tasks=[];
let editId=null;
let isEditing=false;

//init
function init(){
    isEditing=false;
    editId=null;
    btnEl.innerText='submit';
}
init();

//read ui  //step-3 read
const readUi=function(){
    containerEl.innerHTML=null;//if we delete
    inputEl.value=null;//after update


    tasks.forEach((task)=>{
    const taskEl=document.createElement('li');
    
     taskEl.innerHTML= `${task.taskName}
     <button class="btn-update"onclick = updateItem(${task.id}) ><i class="fa-solid fa-pen-to-square update"></i></button>
     <button class="btn-delete" onclick = deleteItem(${task.id})><i class="fa-solid fa-trash delete"></i></button>`;
    containerEl.appendChild(taskEl);
    })  
}
//delete //step-4
const deleteItem=function(id){
    console.log(id)
    tasks =tasks.filter(taskDelete =>{
        return taskDelete.id !== id ;//checking the tasks.id with onclick task id
    })
    readUi();
}

//update //step-5
    const updateItem=function(id){
        isEditing = true;
        btnEl.innerText='update';

        //find the elements

        const itemToEdit = tasks.find((taskUpdate)=>{
            return taskUpdate.id === id;//checking the tasks.id with onclick task id
          });

          inputEl.value = itemToEdit.taskName;
          editId = itemToEdit.id;
    }

//input & submit
//step-1 submit
formEl.addEventListener('submit', function(event){
    event.preventDefault();
    const title = inputEl.value;

//step 6
    if(isEditing){
        tasks=tasks.map((task)=>{
            if(task.id===editId)
            {
                return{
                    id:editId,
                    taskName:title,
                };
            }else{
                return task;
            }
        })
    init();
    readUi();

}
//step-2 create
    else{
        if (inputEl.value ==='') 
        {
          alert("Please Enter a Valid value");
        }
        else{
    const task={
        id:Date.now(),
        taskName:title,
    }
    console.log(task)

    //add task  to tasks array
    tasks.push(task)
    console.log(tasks)

    //display
    readUi();

    //clean the input
    inputEl.value=null;//after typing
}
}
  });
