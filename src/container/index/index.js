// Ждем события DOMContentLoaded, которое срабатывает, когда весь HTML-документ загружен и структура документа доступна для манипуляций.

document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, существует ли глобальная переменная window.session.
  if (window.session) {
    // Если сессия существует, извлекаем объект user из нее.
    const { user } = window.session

    // Проверяем, имеет ли пользователь свойство isConfirm в объекте user и его значение true.
    if (user.isConfirm) {
      // Если пользователь подтвержден (isConfirm === true), перенаправляем его на страницу '/home'.
      location.assign('/home')
    } else {
      // Если пользователь не подтвержден (isConfirm !== true), перенаправляем его на страницу '/signup-confirm'.
      location.assign('/signup-confirm')
    }
  } else {
    // Если сессия не существует (window.session === undefined), перенаправляем пользователя на страницу '/signup'.
    location.assign('/signup')
  }
})
