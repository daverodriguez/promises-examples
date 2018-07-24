# Today's lesson: Making asynchronous programming suck less

##Prereqs
1. Make sure you have the latest LTS (long-term stable) version of [Node.js](https://nodejs.org/en/) installed. You'll need at least Node 8.2 to run these examples. 
2. Check out this repo and run `npm install` locally.
3. Run `npx webpack` if you want to recompile the examples from source.

##What is asychronous programming?

A **synchronous** function is one that happens in real time, in a predictable order: Line 1 executes, then line 2, then line 3.

```typescript
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
```

**Run this example:**
> Open [dist/synchronous.html]()

An **asynchronous** function is one that involves some latency. Most often, it's because we're retrieving some data from a server, or sending some data from a server.  

```typescript
let todos = getTodos(); // Let's assume these are coming from an API endpoint

let output = '';
for (let todo of todos) {
    output = output.concat(`#${todo.id}: ${todo.title}\r\n`);
}

console.log(output);
```

Since we can't predict how long it will take to retrieve the information, it's not safe to ask for the todos, and then expect to immediately do something with them.
We'll almost certainly get an error:

```js
Uncaught ReferenceError: todos is not defined
``` 

##What is a callback?

A **callback** is a function that is passed as an argument to another function. When function A finishes, it calls function B.

```typescript
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
```

**Run this example:**

> Open [dist/asynchronous-callbacks.html]() (you'll need to run it from a local web server to avoid XHR security errors)

This method at least avoids the `'todos' is not defined` error, by waiting until the todos are loaded to do something with them, but you
can already see that the code is getting longer, and is becoming disjointed and hard to follow.

##Combining asynchronous functions, a.k.a. callback hell

What happens when we have to chain multiple asynchronous actions? Let's say that we first have to 
get the current user, then get the todos for that user.

```typescript
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
```

**Run this example:**

> Open [dist/callback-hell.html]() (you'll need to run it from a local web server to avoid XHR security errors)

Chaining callbacks results in a structure called the "pyramid of doom":

```typescript
doSomething(response => {
    doSomethingElse(response => {
        doAThirdThing(response => {
            doAnotherThing(response => {
                pleaseKillMeNow(response => {
                    // DOOM.
                });
            });
        });
    });
});
```

##What is a promise?

A promise is an object. It takes an asynchronous function as an argument and keeps
track of whether the function has resolved successfully, or has failed for some reason (been rejected).

Promises are supported in every major browser except IE11, but polyfills are available: 
https://caniuse.com/#feat=promises

```typescript
// This function waits one second and then sets its "resolved" state
function waitAWhile() {
    // Notice that this function returns a value right away (the Promise)
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

// You interact with a Promise by using its `then` method. `then` allows you
// to specify two functions, one for a successful resolution, one for failure
// (the failure function is optional)
waitAWhile().then(() => {
    console.log('All done!');
});
```

Here's a slightly more complex Promise that has a success and an error handler.

```typescript
function doSomethingRisky() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let randomNum = Math.random();
            
            if (randomNum >= 0.5) {
                resolve(`Success! Value was ${randomNum}`);
            } else {
                reject(`Too bad! Value was ${randomNum}`);
            }
        }, 1000);
    });
}

doSomethingRisky().then((successMessage) => {
    console.log(successMessage);
}, (errorMessage) => {
    console.log(errorMessage);
});
```

##Replacing callbacks with promises (and `XMLHttpRequest` with `fetch`)

`fetch` is a newer replacement for `XMLHttpRequest` that is fully compatible with promises. It's supported
in every major browser except IE11, but a polyfill is available:
https://caniuse.com/#feat=fetch 

```typescript
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
```

##Combining promises

If you need to track a lot of asynchronous actions at once, you can use `Promise.all()` to combine lots of promises into one mega-Promise.
 to merge promises. You can use this for things you might not expect, for example, preloading images.

```typescript
namespace CombiningPromises {
    function fetchImages() {
        return new Promise(resolve => {
            fetch('https://jsonplaceholder.typicode.com/photos/').then(response => {
                resolve( response.json() );
            });
        })
    }

    function preloadImages(images) {
        let promises = [];
        let startTime = new Date().getTime();

        document.getElementById('start').hidden = false;

        images = images.slice(0, 200);

        for (let nextImage of images) {
            let promise = new Promise(resolve => {
                let tmpImg = new Image();
                tmpImg.addEventListener('load', () => {
                    resolve();
                });
                tmpImg.src = nextImage.thumbnailUrl;
            });

            promises.push(promise);
        }

        Promise.all(promises).then(() => {
            document.getElementById('start').hidden = true;
            document.getElementById('finish').hidden = false;

            let endTime = new Date().getTime();
            let elapsedTime = endTime - startTime;

            document.getElementById('info').innerHTML = `Preload took ${elapsedTime} ms.`;
        });
    }

    document.getElementById('start').hidden = true;
    document.getElementById('finish').hidden = true;

    fetchImages().then( images => { preloadImages(images) });
}
```

##The future: async / await functions

The next version of JavaScript (called ES2016 or ES7) has an even more powerful way to work with Promises.
Using two new keywords, `async` and `await`, you'll be able to write asynchronous code that looks like it's synchronous.
Any function that returns a promise can be `await`ed, and behind the scenes, JavaScript will do listen for
the `resolve` and not continue to the next step until it's received.

```js
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
```

Asynchronous functions are surprisingly well supported already! https://caniuse.com/#feat=async-functions
TypeScript also supports async/await functions now (in version 1.7 and higher). It will transpile your asynchronous
code to something even older browsers can work with.

## More reading:
- [Introduction to ES6 Promises](http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/)
- [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Promise polyfill](https://github.com/stefanpenner/es6-promise)
- [Introduction to fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)
- [MDN: Using fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Fetch polyfill](https://github.com/github/fetch)
- [Fetch with async/await](https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808)
- [Fake REST API used in examples for this lesson](https://jsonplaceholder.typicode.com/)