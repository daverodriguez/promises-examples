function doSomethingRisky() {
	return new Promise<any>((resolve, reject) => {
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