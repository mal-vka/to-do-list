{
    let tasks = [];

    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        display();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        display();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1)
        ];
        // lub: tasks = tasks.map((task, index) => (index === taskIndex ? { ...task, done: !task.done } : task));
        display();
    };

    const markAllTasksDone = () => {
        // nie działa - czemu? tasks = tasks.map(task => task.done = true);
        tasks = tasks.map(task => ({ ...task, done: true }));
        display();
    };

    const toggleVisibilityDoneTasks = () => {
        hideDoneTask = !hideDoneTask;
        display();
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

    const bindButtonsEvents = () => {
        const toggleVisibilityDoneTasksButton = document.querySelector(".js-toggleVisibilityDoneButton");

        if (toggleVisibilityDoneTasksButton) {
            toggleVisibilityDoneTasksButton.addEventListener("click", toggleVisibilityDoneTasks);
        };

        const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDoneButton");
        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
        };
    };

    const displayButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
        if (tasks.length) {
            buttonsElement.innerHTML = `
                <button class="buttons__button js-toggleVisibilityDoneButton">
                    ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone
                </button>

                <button class="buttons__button js-markAllTasksDoneButton" ${tasks.every(task => task.done) ? "disabled" : ""}>
                    Ukończ wszystkie
                </button>
            `;
        } else {
            buttonsElement.innerHTML = "";
        }
    };

    const displayTasksList = () => {
        let taskToHTML = task => `
            <li class="list__item ${(task.done && hideDoneTask) ? "list__item--hidden" : ""}">

                <button class="list__button list__button--toggleDone js-toggleDone">
                    ${task.done ? "✔" : ""}
                </button>

                <span class="list__content${task.done ? " list__content--done" : ""}">
                    ${task.content}
                </span>

                <button class="list__button list__button--remove js-remove">
                    🗑
                </button>     
            </li>
        `;
        const listElement = document.querySelector(".js-list");
        listElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const display = () => {
        displayButtons();
        displayTasksList();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        display();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}