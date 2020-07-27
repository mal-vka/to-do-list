{
    const list = [];

    const addNewTask = (newTaskContent) => {
        list.push({
            content: newTaskContent,            
        });
        render();
    };

    const removeTask = (taskIndex) => {
        list.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        list[taskIndex].done = !list[taskIndex].done;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });        
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
        
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        let tasksListHTMLContent = "";

        for (const task of list) {
            tasksListHTMLContent += `
                <li class="list__item js-task">

                    <button class="list__button list__button--toggleDone js-toggleDone">
                        ${task.done ? "✔" : ""}
                    </button>

                    <span class="list__content${ task.done ? " list__content--done" : ""}">
                        ${task.content}
                    </span>

                    <button class="list__button list__button--remove js-remove">
                        🗑
                    </button>     
                </li>
            `;
        }
        
        document.querySelector(".js-list").innerHTML = tasksListHTMLContent;    
        
        bindRemoveEvents();
        bindToggleDoneEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }  
        
        newTaskElementContent.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}