namespace CallbackHell {
	function getUser(userId, callback) {
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('GET', `https://jsonplaceholder.typicode.com/users/${userId}`);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				let user = xhr.response;

				// When we're finished, execute the callback function
				callback(user);
			}
		};

		xhr.send();
	}

	function renderUserInfo(user) {
		console.log(user);
		document.getElementById('user').innerHTML = `User: ${user.name}`;
	}

	function getTodos(user, callback) {
		// Make an XHR request
		// The userId parameter doesn't do anything in this request, but let's pretend it does
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('GET', `https://jsonplaceholder.typicode.com/todos/?userId=${user.id}`);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				let todos = xhr.response.slice(0, 10);

				// When we're finished, execute the callback function
				callback(todos);
			}
		};

		xhr.send();
	}

	function renderTodos(todos) {
		let output = '';
		for (let todo of todos) {
			output = output.concat(`#${todo.id}: ${todo.title}\r\n`);
		}

		console.log(output);
		document.getElementById('output').innerHTML = output;
	}

	export function init() {
		let userId = 5;

		getUser(userId, (user) => {
			renderUserInfo(user);

			getTodos(user, (todos) => {
				renderTodos(todos);
			})
		});
	}
}

CallbackHell.init();