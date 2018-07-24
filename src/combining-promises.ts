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