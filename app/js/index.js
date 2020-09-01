import { createTask } from "./modules/module_1.js";
import { createId, showTasks } from "./modules/module_2.js";

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('click', async (e) => {
    // [[Inner Lexical Environment --> e: Event]]
    // [[Outer Lexical Environment --> createTask: function, createId: function, showTasks: function, tasks: Array, anonymous function: function]]
    e.stopPropagation();
    if (e.target.id === "add-button") {
        // [[Inner Lexical Environment --> e.target: Object]]
        // [[Outer Lexical Environment --> e: Event]]
        document.getElementById("error").hidden = true;
        try {
            // [[Inner Lexical Environment --> id: Number, text: String, importance: String, newTask: Object]]
            // [[Outer Lexical Environment --> e.target: Object]]
            const id = createId();
            const text = document.getElementById("add-text").value;
            if (!text) {
                // [[Inner Lexical Environment --> text: String]]
                // [[Outer Lexical Environment --> id: Number, text: String, importance: String, newTask: Object]]
                throw new Error("Please, add text for task!")
            }
            const importance = document.getElementById("add-importance").value;
            if (!parseInt(importance)) {
                // [[Inner Lexical Environment --> importance: String]]
                // [[Outer Lexical Environment --> id: Number, text: String, importance: String, newTask: Object]]
                throw new Error("Please, select importance for task!")
            }
            const newTask = await new createTask(id, text, importance);
            if (newTask) {
                // [[Inner Lexical Environment --> newTask: Object]]
                // [[Outer Lexical Environment --> id: Number, text: String, importance: String, newTask: Object]]
                await tasks.push(newTask);
            }
            document.getElementById("add-text").value = "";
            document.getElementById("add-importance").value = "0";
        } catch(err) {
            // [[Inner Lexical Environment --> err: Object]]
            // [[Outer Lexical Environment --> e.target: Object]]
            document.getElementById("error").innerHTML = err.message;
            document.getElementById("error").hidden = false;
        };
    };

    if (e.target.classList.contains("delete-button")) {
        // [[Inner Lexical Environment --> e.target: Object]]
        // [[Outer Lexical Environment --> e: Event]]
        try {
            // [[Inner Lexical Environment --> id: Number, taskIndex: Number, deletedTask: Object]]
            // [[Outer Lexical Environment --> e.target: Object]]
            const id = e.target.parentNode.id;
            const taskIndex = tasks.findIndex((task) => task.id == id);
            const deletedTask = await tasks.splice(taskIndex, 1);
            if (!deletedTask) {
                // [[Inner Lexical Environment --> deletedTask: Object]]
                // [[Outer Lexical Environment --> e.target: Object]]
                throw new Error("Error while deleting task!")
            }
        } catch(err) {
            // [[Inner Lexical Environment --> err: Object]]
            // [[Outer Lexical Environment --> e.target: Object]]
            document.getElementById("error").innerHTML = err.message;
            document.getElementById("error").hidden = false;
        };
    };

    if (e.target.classList.contains("task-item")) {
        // [[Inner Lexical Environment --> e.target: Object, id: Number, taskItem: Object]]
        // [[Outer Lexical Environment --> e: Event]]
        const id = e.target.id;
        const taskItem = tasks.find(task => task.id == id);
        taskItem.done = taskItem.done ? false : true;
    }

    if (e.target.id === "sort-button") {
        // [[Inner Lexical Environment --> e.target: Object]]
        // [[Outer Lexical Environment --> e: Event]]
        e.target.name = !e.target.name ? "important" : e.target.name === "important" ? "notImportant" : "";
    }

    showTasks(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById("sort-button").hidden = tasks.length === 0 ? true : false;
});