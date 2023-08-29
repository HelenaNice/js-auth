class User {
  // Роли пользователей, представленные как статическое поле объекта
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }

  // Приватное статическое поле, хранящее список объектов User
  static #list = []

  constructor({ email, password, role }) {
    // Опасно принимать роль напрямую в конструкторе, потому что она может быть неверного формата
    this.email = String(email).toLowerCase()
    this.password = password
    this.role = User.#convertRole(role) // Преобразование роли с проверкой
  }

  // Приватный статический метод для преобразования роли с проверкой
  static #convertRole = (role) => {
    role = Number(role) // Преобразуем в число

    // Если роль не является числом, устанавливаем USER по умолчанию
    if (isNaN(role)) {
      role = this.USER_ROLE.USER
    }

    // Проверяем, является ли значение роли допустимым (1, 2, 3) или устанавливаем USER по умолчанию
    role = Object.values(this.USER_ROLE).includes(role)
      ? role
      : this.USER_ROLE.USER

    return role
  }

  // Статический метод для создания нового пользователя и добавления его в список
  static create(data) {
    const user = new User(data) // Создаем новый объект пользователя
    console.log(user) // Выводим в консоль информацию о добавленном пользователе

    this.#list.push(user) // Добавляем пользователя в список
    console.log(this.#list) // Выводим в консоль обновленный список пользователей
  }

  // Статический метод для поиска пользователя по электронной почте, возвращает null, если не найден
  static getByEmail(email) {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(), // Приводим к нижнему регистру для сравнения
      ) || null
    )
  }
}

// Экспорт класса User для использования в других файлах
module.exports = {
  User,
}
