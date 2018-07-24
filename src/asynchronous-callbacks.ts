namespace AsynchronousCallbacks {
	// getTodos() takes one argument, a callback function
	function getTodos(callback) {
		// Make an XHR request...
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/');
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
		getTodos(renderTodos);
	}
}

AsynchronousCallbacks.init();

