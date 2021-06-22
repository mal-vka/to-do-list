{
    let tasks = [{ content: "podlać rośliny" }, { content: "zrobić zakupy na bazarze" }, { content: "kupić prezent na urodziny siostry" }, { content: "iść na jogę" }];

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

    const display = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
                <li class="list__item js-task">

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
        };

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

        newTaskElement.focus();
    };

    const init = () => {
        display();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}