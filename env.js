if(process.env.NODE_ENV === 'production') {
  // используем конфиг для продакшна
} else if(process.env.NODE_ENV === 'test') {
  // используем конфиг для тестов
} else {
  // используем конфиг для разработки
}

console.log(process.env.NODE_ENV);