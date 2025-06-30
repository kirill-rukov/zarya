// текущие дата и время
const dateTimeElement = document.getElementById('date_time');
const updateDateTime = () => {
  const now = new Date();

  const weekdayOptions = { weekday: 'long' };
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };

  let weekday = now.toLocaleDateString('ru-RU', weekdayOptions);
  weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  const fullDate = now.toLocaleDateString('ru-RU', dateOptions);

  dateTimeElement.innerHTML = `
    ${weekday}</br> № 46 (13626)</br> ${fullDate}
  `;
};

updateDateTime();

// Функция для получения курсов валют
async function fetchCurrencyRates() {
    try {
        // Запрос к API Центробанка
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        if (!response.ok) throw new Error('Ошибка при загрузке данных');

        const data = await response.json();

        // Достаем курсы доллара и евро
        const usdRate = data.Valute.USD.Value.toFixed(2);
        const eurRate = data.Valute.EUR.Value.toFixed(2);

        // Обновляем текст на странице
        document.getElementById('usd-rate').textContent = usdRate;
        document.getElementById('eur-rate').textContent = eurRate;
    } catch (error) {
        console.error('Ошибка при получении курсов:', error);
        document.getElementById('usd-rate').textContent = 'Ошибка';
        document.getElementById('eur-rate').textContent = 'Ошибка';
    }
}

// Вызываем функцию при загрузке страницы
window.onload = fetchCurrencyRates;