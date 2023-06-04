const dataBase = ["2023-06-01", "2023-06-15", "2019-08-02", "2023-08-24"]

const messes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const ano = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
// const semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']


const date = new Date()
const today = date.getDate()
const currentMonth = date.getMonth()
const currentYear = date.getFullYear()

const selectMonth = document.querySelector("#selectMonth")
const selectYear = document.querySelector("#selectYear")
selectMonth.addEventListener("change", heandleCalendar)
selectYear.addEventListener("change", heandleCalendar)

function initializeCalendar() {
    popularSelect(selectMonth, messes)
    popularSelect(selectYear, ano)
}


function popularSelect(element, option) {
    option.map((data, index) => {
        element.insertAdjacentHTML("afterbegin", `
            <option value="${index}" ${((index == currentMonth) || (data == currentYear)) && "selected"}>${data}</option>
        `)
    })
}

function heandleCalendar() {
    const selectedMonth = parseInt(selectMonth.options[selectMonth.selectedIndex].value)
    const selectedYear = parseInt(selectYear.options[selectYear.selectedIndex].value)
    clearCalendar()
    renderCalendar(selectedMonth, selectedYear)
}


const containerNextWeek = [...document.querySelectorAll(".week")][6]

renderCalendar(currentMonth, ano.indexOf(currentYear))
function renderCalendar(month, year) {
    // console.log(month, ano[year]);

    const lastDayOfMonth = new Date(ano[year], parseInt(month) + 1, 0).getDate()
    const firstDayOfWeek = new Date(ano[year], parseInt(month), 1).getDay()
    let calendar = []
    let control = 0

    for (let i = 1; i <= lastDayOfMonth; i++) {
        while (control != firstDayOfWeek) {
            let ultimoDiaDoMesAnterior = new Date(ano[year], parseInt(month), 0).getDate()
            let dataDay = {
                date: ultimoDiaDoMesAnterior - control,
                class: "last-month",
                status: "disabled"
            }
            calendar.unshift(dataDay)
            control++
        }
        let dataDay = {
            date: i,
            class: ""
        }

        if (today == i && month == currentMonth && ano[year] == currentYear) {
            dataDay.class = "today"
        }


        calendar.push(dataDay)
    }
    control = 0
    while (calendar.length < 35) {
        let dataDay = {
            date: control + 1,
            class: "last-month",
            status: "disabled"
        }
        calendar.push(dataDay)
        control++
    }

    calendar.reverse().map(day => {
        const idGenerator = `date-${ano[year]}-${(month + 1).toString().padStart(2, 0)}-${day.date.toString().padStart(2, 0)}`
        console.log(day);
        containerNextWeek.insertAdjacentHTML("afterend", `
            <label class="box-calendar">
                <input type="radio" name="day" ${day.status && "disabled"}>
                <div class="day ${day.class}" id="${idGenerator}">
                    ${day.date}
                </div>
            </label>
        `)
    })
    // <span class="box-calendar day ${day.class}" id="${idGenerator}">${day.date}</span>
    active()
}

function clearCalendar() {
    const calendarDays = [...document.querySelectorAll("label.box-calendar")]
    calendarDays.map(dayBox => {
        dayBox.remove()
    })
}

function active() {
    for (let i = 0; i < dataBase.length; i++) {
        if (document.getElementById(`date-${dataBase[i]}`)) {
            const destaque = document.getElementById(`date-${dataBase[i]}`)
            destaque.classList.add("active")
        }
    }
}

initializeCalendar()
