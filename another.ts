async function h() { 
	const x = Math.floor(Math.random() * 100)
	await console.log(x) 
}

async function g() {
	await setInterval(h, 1000);
}

g()
