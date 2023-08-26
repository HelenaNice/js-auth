class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }

  static #list = []
  

  constructor({email, password, role}) {
    // 1.так небезпечно отримувати role в конструкторі, тому → 2
    this.email = email
    this.password = password
    this.role = User.#convertRole(role)
  }
// 2. приватн метод для отримання role з перевіркою чи це чісло
  static #convertRole = (role) => {
    role = Number(role)

    if (isNaN(role)) {
      role = this.USER_ROLE.USER
    }
// 2-1. чи це чісло присутнє у класі USER_ROLE 1,2,3. Якщо є =отримаємо значеня, або з/з=1
    role = Object.values(this.USER_ROLE).includes(role)
    ? role : this.USER_ROLE.USER

    return role

  }
  // 3. створити запис та додати в список
  static create(data) {
    const user = new User(data)

    this.#list.push(user)
  }


}

module.exports = {
  User,
}
