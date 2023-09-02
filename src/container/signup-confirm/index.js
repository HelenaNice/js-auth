// signup-confirm.js
// Импорт необходимых зависимостей из другого модуля
import { Form } from '../../script/form'
import {
  saveSession,
  getTokenSession,
  getSession,
} from '../../script/session'

// Определение класса SignupConfirmForm, который наследует функциональность класса Form
class SignupConfirmForm extends Form {
  // Константы для полей формы
  FIELD_NAME = {
    CODE: 'code',
  }

  // Константы для сообщений об ошибках
  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Дуже довге значення, приберіть зайве',
  }

  // Метод валидации полей
  validate = (value) => {
    // Проверка на пустое значение
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }
    // Добавьте другие проверки, если необходимо
    return null // Вернуть null, если поле валидно
  }

  // Метод для обработки отправки формы
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll() // При отключенной форме вызываем валидацию
    } else {
      console.log(this.value) // Вывод значений полей формы в консоль

      this.setAlert('progress', 'Завантаження...') // Устанавливаем статус "Завантаження..."

      try {
        // Отправка данных формы на сервер
        const res = await fetch('/signup-confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(), // Преобразование данных формы в JSON
        })

        const data = await res.json()

        // Обработка ответа сервера
        if (res.ok) {
          this.setAlert('success', data.message) // Устанавливаем статус "Успіх"
          saveSession(data.session)
          location.assign('/')
        } else {
          this.setAlert('error', data.message) // Устанавливаем статус "Помилка"
        }
      } catch (error) {
        this.setAlert('error', error.message) // В случае ошибки устанавливаем статус "Помилка"
      }
    }
  }

  // Метод для преобразования данных формы в JSON
  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(
        this.value[this.FIELD_NAME.CODE],
      ),
      // Не забудьте указать токен, если он необходим
      token: getTokenSession(),
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, существует ли глобальная переменная window.session.
  try {
    if (window.session) {
      if (window.session.user.isConfirm) {
        location.assign('/')
      }
    } else {
      location.assign('/')
    }
  } catch (e) {}

  document
    .querySelector('#renew')
    .addEventListener('click', (e) => {
      e.preventDefault()
      const session = getSession()

      location.assign(
        `/signup-confirm?renew=true&email=${session.user.email}`,
      )
    })
})

window.signupConfirmForm = new SignupConfirmForm()
