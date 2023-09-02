import { saveSession } from '../../script/session'

// Ждем события DOMContentLoaded, которое срабатывает, когда весь HTML-документ загружен и структура документа доступна для манипуляций.

document.addEventListener('DOMContentLoaded', () => {
  saveSession(null)

  location.assign('/')
})
