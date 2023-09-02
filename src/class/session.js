class Session {
  // Приватное статическое поле, хранящее список объектов Session
  static #list = []

  // Конструктор класса Session
  constructor(user) {
    // Генерация уникального кода подтверждения
    this.token = Session.generateCode()
    // Сохранение переданных данных
    this.user = {
      email: user.email,
      isConfirm: user.isConfirm,
      role: user.role,
      id: user.id,
    }
  }

  // Статический метод для генерации случайного 4-значного кода
  static generateCode = () => {
    const length = 6
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      )
      result += characters[randomIndex]
    }
    return result
  }

  // Статический метод для создания нового объекта Session и добавления его в список
  static create = (data) => {
    const session = new Session(data)
    this.#list.push(session)
    return session
  }

  // Статический метод для получения данных по коду подтверждения
  static get = (token) => {
    return (
      this.#list.find((item) => item.token === token) ||
      null
    )
  }
}

// Экспорт класса Session для использования в других файлах
module.exports = {
  Session,
}

console.log(Session.generateCode())
