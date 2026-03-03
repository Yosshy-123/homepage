const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
});

function generateDarkColor(excludeColor = null) {
	let h, s, l;
	do {
		h = Math.random() * 360;
		s = 20 + Math.random() * 30;
		l = 20 + Math.random() * 20;
	} while (excludeColor && Math.abs(h - excludeColor.h) < 50);
	return {
		h,
		s,
		l
	};
}

let colors = [];
for (let i = 0; i < 4; i++) {
	colors.push(generateDarkColor());
}

let targetColors = colors.map(c => ({
	...c
}));

function lerp(a, b, t) {
	return a + (b - a) * t;
}

let angle = 0;
let angleSpeed = 0.003;

function updateColors() {
	for (let i = 0; i < 4; i++) {
		colors[i].h = lerp(colors[i].h, targetColors[i].h, 0.03); // 色補間速度を上げる
		colors[i].s = lerp(colors[i].s, targetColors[i].s, 0.03);
		colors[i].l = lerp(colors[i].l, targetColors[i].l, 0.03);

		if (Math.abs(colors[i].h - targetColors[i].h) < 1) {
			targetColors[i] = generateDarkColor(colors[i]);
		}
	}
}

function drawGradient() {
	angle += angleSpeed;
	let x0 = width / 2 + Math.cos(angle) * width;
	let y0 = height / 2 + Math.sin(angle) * height;
	let x1 = width / 2 - Math.cos(angle) * width;
	let y1 = height / 2 - Math.sin(angle) * height;
	let grad = ctx.createLinearGradient(x0, y0, x1, y1);
	for (let i = 0; i < 4; i++) {
		let c = colors[i];
		grad.addColorStop(i / 3, `hsl(${c.h},${c.s}%,${c.l}%)`);
	}
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, width, height);
}

function animate() {
	requestAnimationFrame(animate);
	updateColors();
	drawGradient();
}
animate();
