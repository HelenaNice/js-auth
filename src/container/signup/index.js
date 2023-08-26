class SignupForm {
  // статичне поле для значень полей а формі
  static value = {}

  static validate = (name, value) => {
    return true
  }
  // для відправки даних на сервер
  static submit = () => {
    console.log(this.value)
  }
  // якщо валідація успішна, то значення буде записано
  static change = (name, value) => {
    console.log(name, value)
    if (this.validate(name, value)) this.value[name] = value
  }
}
window.signupForm = SignupForm
