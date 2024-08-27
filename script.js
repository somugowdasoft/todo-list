// i will wait for the DOM to fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {

    // get the refernce to the input filed button and the list (ul)
    const newTodoInput = document.getElementById("new-todo");
    const addTodoButton = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");


    // function to add the new todo
    function addTodo() {
        //  get the value from the input field
        const todoText = newTodoInput.value;

        // check if the input filed is not empty

        if (todoText !== "") {
            // create a new list item elemet for the todo
            const li = document.createElement("li");
            li.className = "todo-item";

            // crteate the text node with the todo text
            const textNode = document.createTextNode(todoText);


            // create a delete button for the todo
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            // create a edt button for the todo
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-btn";

            deleteButton.addEventListener("click", function () {
                // remove the todo item from the list when the dlete button is clicked
                todoList.removeChild(li);
            })

            // add an event listener to the edit button
            editButton.addEventListener("click", function () {
                // toggle editing state
                if (editButton.textContent === "Edit") {
                    // create the input feild with current todo text
                    const editInput = document.createElement('input');
                    editInput.type = "text";
                    editInput.value = todoText;
                    editInput.className = "edit-input";
                    li.insertBefore(editInput, deleteButton); // inserting the input field befor the delete button
                    li.removeChild(textNode); //remove the text node
                    editButton.textContent = "SAVE"; //change the button text to SAVE
                } else {
                    //get the new value from the input field
                    const newTodoText = li.querySelector(".edit-input").value;
                    if (newTodoText !== "") {
                        textNode.textContent = newTodoText; // update thenode with new text
                    }
                    li.insertBefore(textNode, deleteButton); // inserting thenext nopde
                    li.removeChild(li.querySelector(".edit-input")); //remove the text node
                    editButton.textContent = "Edit"; //change the button text to Edit
                }
            });

            // add the event listener to the list from marking as it is completed
            li.addEventListener("click", function () {
                // toggle the complted class to the list item when clicked
                li.classList.toggle("completed")
            })

            li.appendChild(textNode);
            li.appendChild(editButton);
            li.appendChild(deleteButton);

            //append the listitem to todo list
            todoList.appendChild(li);

            //clear the input field after adding the todo
            newTodoInput.value = "";
        }
    }
    addTodoButton.addEventListener("click", addTodo);

    //add an event listener to the input file add the todo when the user enter key is pressed
    newTodoInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTodo();
        }
    })

})