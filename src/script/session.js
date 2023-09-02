// Константа для ключа, по которому будет сохраняться сессия в локальном хранилище
export const SESSION_KEY = 'sessionAuth'

// Функция для сохранения сессии в локальном хранилище
export const saveSession = (session) => {
  try {
    // Сохраняем сессию в глобальной переменной window.session
    window.session = session
    // Сохраняем сессию в локальном хранилище, преобразовав ее в строку JSON
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session),
    )
  } catch (er) {
    // В случае ошибки при сохранении сессии, выводим ошибку в консоль
    console.error(er)
  }
}

// Функция для загрузки сессии из локального хранилища
export const loadSession = () => {
  try {
    // Пытаемся получить сессию из локального хранилища и преобразовать ее из строки JSON
    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY),
    )
    if (session) {
      // Если сессия успешно получена, сохраняем ее в глобальной переменной window.session
      window.session = session
    } else {
      // Если сессия не найдена или не может быть разобрана, устанавливаем window.session в null
      window.session = null
    }
  } catch (er) {
    // В случае ошибки при разборе сессии, выводим ошибку в консоль и устанавливаем window.session в null
    console.error(er)
    window.session = null
  }
}

// Функция для получения токена из сессии
export const getTokenSession = () => {
  try {
    const session = getSession()
    return session ? session.token : null
  } catch (er) {
    // В случае ошибки при разборе сессии, выводим ошибку в консоль и возвращаем null
    console.error(er)
    return null
  }
}
// Функция для получения объекта из сессии
export const getSession = () => {
  try {
    const session =
      JSON.parse(localStorage.getItem(SESSION_KEY)) ||
      window.session
    return session || null
  } catch (er) {
    console.error(er)
    return null
  }
}
