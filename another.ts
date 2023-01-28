async function h() { await console.log("h") }

async function g() {
	await setInterval(h, 1000);
}

g()
