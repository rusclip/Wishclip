/* src/App.css */

/* Общие стили для страницы */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background: linear-gradient(135deg, #f9f9f9, #ececec);
  color: #333;
}

/* Центрирование контента */
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
}

/* Заголовок */
h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #222;
}

/* Подзаголовок */
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #444;
}

/* Кнопки */
button {
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.25s ease;
}

button:hover {
  background-color: #0059c9;
}

/* Карточки */
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin: 1rem 0;
  width: 100%;
  max-width: 600px;
  text-align: center;
}

/* Вводы */
input, textarea {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  border-color: #0070f3;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
}

/* Ссылки */
a {
  color: #0070f3;
  text-decoration: none;
  transition: color 0.25s ease;
}

a:hover {
  color: #0059c9;
}
