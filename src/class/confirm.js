class Confirm {
  // Приватное статическое поле, хранящее список объектов Confirm
  static #list = []

  // Конструктор класса Confirm
  constructor(data) {
    // Генерация уникального кода подтверждения
    this.code = Confirm.generateCode()
    // Сохранение переданных данных
    this.data = data
  }

  // Статический метод для генерации случайного 4-значного кода
  static generateCode = () =>
    Math.floor(Math.random() * 9000) + 1000

  // Статический метод для создания нового объекта Confirm и добавления его в список
  static create = (data) => {
    // Создание нового объекта Confirm и добавление его в список
    this.#list.push(new Confirm(data))

    // Установка таймера на удаление объекта через 24 часа (в миллисекундах)
    setTimeout(() => {
      this.delete(code) // Необходимо передать код для удаления
    }, 24 * 60 * 60 * 1000) // 24 часа в миллисекундах

    // Вывод текущего списка объектов Confirm в консоль
    console.log(this.#list)
  }

  // Статический метод для удаления объекта с указанным кодом
  static delete = (code) => {
    const length = this.#list // Запомним начальную длину списка

    // Фильтрация списка: удаляем объект с переданным кодом
    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )

    // Возвращаем true, если длина списка изменилась, иначе false
    return length > this.#list.length
  }

  // Статический метод для получения данных по коду подтверждения
  static getData = (code) => {
    // Поиск объекта в списке по указанному коду
    const obj = this.#list.find(
      (item) => item.code === code,
    )

    // Возвращаем данные объекта, если он найден, иначе null
    return obj ? obj.data : null
  }
}

// Экспорт класса Confirm для использования в других файлах
module.exports = {
  Confirm,
}
