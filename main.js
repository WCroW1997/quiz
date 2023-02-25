const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')


// Створення змінних
let score = 0
let questionIndex = 0


function clearPage() {
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQusetion() {

	let title = questions[questionIndex]['question']
	const headerTemplate = `<h2 class="title">${title}</h2>`
	headerContainer.innerHTML = headerTemplate

	for ([index, item] of questions[questionIndex]['answers'].entries()) {

		let number = index + 1
		const questionTemplate = `
		<li>
			<label>
				<input value="${number}" type="radio" class="answer" name="answer" />
				<span>${item}</span>
			</label>
		</li>
		`
		listContainer.innerHTML += questionTemplate
	}
}

function showResults() {
	let title, message
	let result = `${score} із ${questions.length}`

	if (score === questions.length) {
		title = 'Вітаємо! 🎉'
		message = 'Ви відповіли вірно на всі питання! 😎👍'
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Непоганий результат! 😉'
		message = 'Більше чим на половину питань ви відповіли вірно 👍'
	} else {
		title = 'Пощастить іншого разу! 😢'
		message = 'У вас менше половини правильних відповідей'
	}



	const resultTemplate =
		`
		<h2 class="title">${title}</h2>
		<h3 class="summary">${message}</h3>
		<p class="result">${result}</p>
	`

	headerContainer.innerHTML = resultTemplate

	submitBtn.blur()
	submitBtn.innerHTML = 'Спробувати ще!'
	submitBtn.onclick = () =>	history.go()
}


function checkAnswer() {
	let check = listContainer.querySelector('input:checked')
	if (!check) {
		submitBtn.blur()
		return
	}

	const userAnswer = check.value

	if (userAnswer == questions[questionIndex]['correct']) {
		score++
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++
		clearPage()
		showQusetion()
	} else {
		clearPage()
		showResults()
	}
}



submitBtn.onclick = checkAnswer

// Виклик функцій
clearPage()
showQusetion()