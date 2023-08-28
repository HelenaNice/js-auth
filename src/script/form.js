// Базовий ф-ціонал форм
export const REG_EXP_EMAIL = new RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
)
export const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
)

export class Form {
  FIELD_NAME = {} // тут константи полей із верстки
  FIELD_ERROR = {} // тут заготовки текстів помилок

  value = {}
  error = {}
  disabled = true

  // 3.якщо валідація успішна, то значення буде записано
  change = (name, value) => {
    const error = this.validate(name, value)
    this.value[name] = value

    if (error) {
      this.setError(name, error)
      this.error[name] = error
    } else {
      this.setError(name, null)
      delete this.error[name]
    }

    this.checkDisabled()
  }
  // 4. для червонного підсвічування полів форми з помилками
  setError = (name, error) => {
    const span = document.querySelector(
      `.form__error[name="${name}"]`,
    )

    const field = document.querySelector(
      `.validation[name="${name}"]`,
    )

    if (span) {
      span.classList.toggle(
        'form__error--active',
        Boolean(error),
      )
      span.innerText = error || ''
    }

    if (field) {
      field.classList.toggle(
        'validation--active',
        Boolean(error),
      )
    }
  }
  // для підсвічування незаповнених полів
  checkDisabled = () => {
    let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      if (
        this.error[name] ||
        this.value[name] === undefined
      ) {
        disabled = true
      }
    })

    //  логіка активної кнопки зареєструватися
    const el = document.querySelector(`.button`)

    if (el) {
      el.classList.toggle(
        'button--disabled',

        Boolean(disabled),
      )
    }

    this.disabled = disabled
  }
  //   перевірка кожного поля при натисканні зареєструватися
  validateAll = () => {
    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name])

      if (error) {
        this.setError(name, error)
      }
    })
  }
  // відображення алертов по модифікаторам через класи
  setAlert = (status, text) => {
    const el = document.querySelector(`.alert`)

    if (status === 'progress') {
      el.className = 'alert alert--progress'
    } else if (status === 'success') {
      el.className = 'alert alert--success'
    } else if (status === 'error') {
      el.className = 'alert alert--error'
    } else {
      el.className = 'alert alert--disabled'
    }
    if (text) el.innerText = text
  }
}
