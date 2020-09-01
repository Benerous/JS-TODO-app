export function createTask(id, text, importance) {
    // [[Inner Lexical Environment --> this.id: id, this.text: text, this.importance: importance, this.done: false]]
    // [[Outer Lexical Environment --> createTask: function]]
    try {
        this.id = id;
        this.text = text;
        this.importance = importance;
        this.done = false;
    } catch(err) {
        throw new Error("Error while creating new task!")
    }
}

class User {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(`Hi, i'm ${this.name}`);
    }
    sayGoodBye() {
        console.log(`Goodbye!!!`);
    }
};

class ToDoUser extends User {
    constructor(name, tasks, tasksDone) {
        super(name);
        this.tasks = tasks;
        this.tasksDone = tasksDone;
    }
    doneTasks() {
        this.tasks -= this.tasksDone;
        console.log(`I have done ${this.tasksDone} tasks, but I need to do ${this.tasks} more`);
    }
};

const newToDoUser_1 = new ToDoUser("Bob", 10, 2);
const newToDoUser_2 = new ToDoUser("Sarah", 15, 4);
console.log("These logs are only for testing classes which were mandatory in this application:");
newToDoUser_1.sayName();
newToDoUser_1.doneTasks();
newToDoUser_1.sayGoodBye();

newToDoUser_2.sayName();
newToDoUser_2.doneTasks();
newToDoUser_2.sayGoodBye();