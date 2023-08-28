import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from '../../script/form'

class SignupForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'passwordAgain',
    ROLE: 'role',
    IS_CONFIRM: 'isConfirm',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Дуже довге значення, приберіть зайве',
    EMAIL: 'Введіть коректне значення e-mail адреси',
    PASSWORD:
      'Пароль повинен складатися з не меньше ніж 8 символів, включаючи мінімум 1 цифру',
    PASSWORD_AGAIN:
      'Ваш перший пароль не збігається з першим',
    NOT_CONFIRM: 'Ви не погодилися з правилами',
    ROLE: 'Ви не обрали роль',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL
      }
    }

    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD
      }
    }
    if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
      if (
        String(value) !==
        this.value[this.FIELD_NAME.PASSWORD]
      ) {
        return this.FIELD_ERROR.PASSWORD_AGAIN
      }
    }

    if (name === this.FIELD_NAME.ROLE) {
      if (isNaN(value)) {
        return this.FIELD_ERROR.ROLE
      }
    }

    if (name === this.FIELD_NAME.IS_CONFIRM) {
      if (Boolean(value) !== true) {
        return this.FIELD_ERROR.NOT_CONFIRM
      }
    }
  }
  // 2.для відправки даних на сервер після валідаціі всіх полів
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      console.log(this.value)
      // поки користувач чекає, виведемо пвідомлення про завантаження
      this.setAlert('progress', 'Завантаження...')

      // перехоплення помилок
      try {
        const res = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        })

        const data = await res.json()
        if (res.ok) {
          this.setAlert('success', data.message)
        } else {
          this.setAlert('error', data.message)
        }
      } catch (error) {
        this.setAlert('error', error.message)
      }
    }
  }
  //3. відправка даних на сервер
  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]:
        this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
      [this.FIELD_NAME.ROLE]:
        this.value[this.FIELD_NAME.ROLE],
    })
  }

  // 3.якщо валідація успішна, то значення буде записано
  // static change = (name, value) => {
  //   console.log(name, value)
  //   if (this.validate(name, value)) this.value[name] = value
  // }
}
// в окремому файлі скрипт - маємо батьківський клас Form

window.signupForm = new SignupForm()
// 4.конструктор єкземпляра кожного облікового запису
