document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
    const taskList = document.getElementById("tasks");
    
    // Create and append additional input fields
    const userInput = document.createElement("input");
    userInput.type = "text";
    userInput.id = "task-user";
    userInput.placeholder = "Assigned to";
    
    const durationInput = document.createElement("input");
    durationInput.type = "text";
    durationInput.id = "task-duration";
    durationInput.placeholder = "Duration";
    
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "task-date";
    
    // Create and append priority dropdown
    const prioritySelect = document.createElement("select");
    prioritySelect.id = "task-priority";
    ["high", "medium", "low"].forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
        prioritySelect.appendChild(option);
    });
    
    form.insertBefore(userInput, form.children[2]);
    form.insertBefore(durationInput, form.children[3]);
    form.insertBefore(dateInput, form.children[4]);
    form.insertBefore(prioritySelect, form.children[5]);
    
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload
        
        const taskDescription = document.getElementById("new-task-description").value;
        const user = userInput.value;
        const duration = durationInput.value;
        const date = dateInput.value;
        const priority = prioritySelect.value;
        
        if (taskDescription.trim() !== "") {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `<strong>${taskDescription}</strong> (Assigned to: ${user}, Duration: ${duration}, Due: ${date})`;
            taskItem.classList.add(priority + "-priority");
            
            // Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-btn");
            editButton.addEventListener("click", () => {
                const newDescription = prompt("Edit task description:", taskDescription);
                if (newDescription !== null) {
                    taskItem.innerHTML = `<strong>${newDescription}</strong> (Assigned to: ${user}, Duration: ${duration}, Due: ${date})`;
                    taskItem.appendChild(deleteButton);
                    taskItem.appendChild(editButton);
                }
            });
            
            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.classList.add("delete-btn");
            deleteButton.addEventListener("click", () => {
                taskItem.remove();
            });
            
            taskItem.appendChild(deleteButton);
            taskItem.appendChild(editButton);
            taskList.appendChild(taskItem);
            
            // Clear input fields
            document.getElementById("new-task-description").value = "";
            userInput.value = "";
            durationInput.value = "";
            dateInput.value = "";
        }
    });
});
