/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
    ],
    theme: {
        extend: {
        colors: {
            'purple-950': '#1a0033', // Глубокий фиолетовый для фона
            'purple-900': '#2a0047', // Основной для карточек
            'purple-800': '#3b0066', // Для инпутов
            'purple-700': '#4c0085', // Акцент
            'purple-600': '#5d00a3', // Кнопки
            'purple-500': '#7b00d3', // Ховер
        },
        fontFamily: {
            ponomar: ['Ponomar', 'sans-serif'], // Добавляем кастомный шрифт
        },
        },
    },
};