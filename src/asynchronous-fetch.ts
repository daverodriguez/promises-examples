namespace AsynchronousFetch {
	function fetchUser(userId) {
		return new Promise(resolve => {
			fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(response => {
				resolve(response.json());
			})
		});
	}

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

	function fetchTodos(user) {
		return new Promise(resolve => {
			fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${user.id}`).then(response => {
				resolve(response.json());
			})
		});
	}

	export function init() {
		let userId = 5;

		fetchUser(userId).then(user => {
			renderUserInfo(user);
			return user;
		}).then(user => {
			return fetchTodos(user);
		}).then(todos => {
			// (todos as any[]) just keeps the TypeScript compiler from throwing a fit
			todos = (todos as any[]).slice(0, 10);
			renderTodos(todos);
		});
	}
}

AsynchronousFetch.init();