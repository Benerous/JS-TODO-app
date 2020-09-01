export function createId() {
    // [[Inner Lexical Environment --> empty]]
    // [[Outer Lexical Environment --> createId: function]]
    return (new Date()).getTime();
};

export function showTasks(tasks) {
    // [[Inner Lexical Environment --> sortType: Object.name, tasks: Array]]
    // [[Outer Lexical Environment: showTasks: function]]
    const sortType = document.getElementById("sort-button").name;
    tasks = sortType === "important" ? tasks.sort((a, b) => a.importance - b.importance) : sortType === "notImportant" ? tasks.sort((a, b) => b.importance - a.importance) : tasks.sort((a, b) => a.id - b.id);
    localStorage.setItem('tasks', tasks);
    return document.getElementById("list").innerHTML = tasks.map((task) => {
        const importanceClassName = !task.done ? (task.importance === "1" ? "info" : task.importance === "2" ? "warning" : "danger") : "secondary";
        return `<div id=${task.id} class="task-item row justify-content-between text-white p-3 m-2 bg-${importanceClassName}">
            <span class="h3 align-middle">${task.text}</span>
            <button class="delete-button btn btn-${importanceClassName} text-white">X</button>
        </div>`;
    }).join('');
};