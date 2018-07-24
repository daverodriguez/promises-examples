let user = 'Dave';
let todos = [
	{ id: 1, title: 'Create presentation' },
	{ id: 2, title: 'Feed dog' },
];

let output = '';
for (let todo of todos) {
	output = output.concat(`#${todo.id}: ${todo.title}\r\n`);
}

console.log(output);
document.getElementById('output').innerHTML = output;