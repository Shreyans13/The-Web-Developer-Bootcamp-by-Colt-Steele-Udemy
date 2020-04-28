let size = 6
let randomColor = () => {
	let red = Math.floor(Math.random() * 256)
	let green = Math.floor(Math.random() * 256)
	let blue = Math.floor(Math.random() * 256)

	 return `rgb(${red}, ${green}, ${blue})`
}

let generateRandomColor = (num) => {
	let arr = []
	for (let i = 0; i < num; i++) {
		arr.push(randomColor())
	}
	return arr
}


let colors = generateRandomColor(size)
let pickedColor = colors[Math.floor(Math.random() * size)]
let square = document.querySelectorAll(".square")
let h1 = document.querySelector('h1')
let messageDisplay = document.getElementById('message')
let colorDisplay = document.getElementById('colorDisplay')
let reset = document.getElementById('reset')
colorDisplay.textContent = pickedColor

let easy = document.getElementById('easy')
let hard = document.getElementById('hard')

let easyMode = () => {
	easy.className = "selected"
	hard.className = ""
	size = 3
	resetFun()
	for (let i = 3; i < size + 3; i++) {
		square[i].style.backgroundColor = '#232323'
	}
}

let hardMode = () => {
	easy.className = ""
	hard.className = "selected"
	size = 6
	resetFun()
}

easy.addEventListener('click', easyMode)
hard.addEventListener('click', hardMode)

let changeBackgroundColor = () => {
	h1.style.backgroundColor = 'steelblue'//iska repitetion kam karna hai
	for (let i = 0; i < size; i++) {
		square[i].style.backgroundColor = colors[i]
		square[i].addEventListener('click',() => { run(square[i]); })
	}
}

let changeColor = (pickedColor) => {
	let square =  document.querySelectorAll('.square')
	for (let i = 0; i < size; i++) {
		square[i].style.backgroundColor = pickedColor
	}
	document.querySelector('h1').style.backgroundColor = pickedColor//iska repitetion kam karna hai
}

let run = (tag) => {
	if (tag.style.backgroundColor === pickedColor) {
		changeColor(pickedColor)
		messageDisplay.textContent = "Correct!!!"
		reset.textContent = "Play Again?"
	} else {
		tag.style.backgroundColor = '#232323'
		messageDisplay.textContent = "Try Again"
	}
}

let resetFun = () => {
	colors = generateRandomColor(size)
	pickedColor = colors[Math.floor(Math.random() * size)]
	changeBackgroundColor()
	colorDisplay.textContent = pickedColor
	messageDisplay.textContent = ""
	reset.textContent = "New Color"
}
reset.addEventListener('click',resetFun)
