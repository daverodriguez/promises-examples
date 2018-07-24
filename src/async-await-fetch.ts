namespace AsyncAwaitFetch {
	function renderUserInfo(user) {
		console.log(user);
		document.getElementById('user').innerHTML = `User: ${user.name}`;
	}

	function renderTodos(todos) {
		let output = '';
		for (let todo of todos) {
			output = output.concat(`#${todo.id}: ${todo.title}\r\n`);
		}

		console.log(output);
		document.getElementById('output').innerHTML = output;
	}

	// Notice keyword `async` on this function
	export async function init() {
		let userId = 5;

		let user = await( await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`) ).json();
		renderUserInfo(user);

		let todos = await( await fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${user.id}`) ).json();
		todos = todos.slice(0, 10);
		renderTodos(todos);
	}
}

AsyncAwaitFetch.init();