// Импорт необходимых зависимостей из другого модуля
import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from '../../script/form'

// Определение класса RecoveryConfirmForm, который наследует функциональность класса Form
class RecoveryConfirmForm extends Form {
  // Константы для полей формы
  FIELD_NAME = {
    CODE: 'code',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'passwordAgain',
  }

  // Константы для сообщений об ошибках
  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Дуже довге значення, приберіть зайве',
    PASSWORD:
      'Пароль повинен складатися з не менше ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру',
    PASSWORD_AGAIN:
      'Ваш другий пароль не збігається з першим',
  }

  // Метод валидации полей
  validate = (name, value) => {
    // Проверка на пустое значение
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    // Проверка на слишком большое значение
    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }

    // Проверка для поля пароля
    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD
      }
    }

    // Проверка для повторного ввода пароля
    if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
      if (
        String(value) !==
        this.value[this.FIELD_NAME.PASSWORD]
      ) {
        return this.FIELD_ERROR.PASSWORD_AGAIN
      }
    }
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
        const res = await fetch('/recovery-confirm', {
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
          location.assign('/recovery-confirm')
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
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
    })
  }
}

// Создание экземпляра класса RecoveryConfirmForm и привязка к глобальному объекту
window.recoveryConfirmForm = new RecoveryConfirmForm()
