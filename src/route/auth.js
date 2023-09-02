// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
// ***тестовій користувач
User.create({
  email: 'test@mail.com',
  password: '123456Qw',
  role: 1,
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('signup', {
    // вказуємо назву контейнера
    name: 'signup',
    // вказуємо назву компонентів
    component: [
      'back-button',
      'field',
      'field-password',
      'field-checkbox',
      'field-select',
    ],

    // вказуємо назву сторінки
    title: 'Signup page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      // 4. у випадаючому списку буде 3 опції вибору
      role: [
        { value: User.USER_ROLE.USER, text: 'Користувач' },
        {
          value: User.USER_ROLE.ADMIN,
          text: 'Адміністратор',
        },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'Розробник',
        },
      ],
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ============GET=====
router.get('/home', function (req, res) {
  return res.render('home', {
    name: 'home',
    component: [],
    title: 'Home page',
    data: {},
  })
})
// ============GET=====
router.get('/logout', function (req, res) {
  return res.render('logout', {
    name: 'logout',
    component: [],
    title: 'Logout page',
    data: {},
  })
})

// ============POST=====
router.post('/signup', function (req, res) {
  const { email, password, role } = req.body

  console.log(req.body)
  // 1. Перевірка заповненності всіх полів
  if (!email || !password || !role) {
    return res.status(400).json({
      message: 'Помилка. Відсутні обовїязкові поля',
    })
  }

  // 1.1 перехоплення помилок при реєстраціі.Бізнес логіку
  // лише через try/catch/ Інакше вимкне сервер

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач вже існує',
      })
    }

    const newUser = User.create({ email, password, role })
    const session = Session.create(newUser)

    Confirm.create(newUser.email)
    // передача на фронтенд частину
    return res.status(200).json({
      message: 'Користувач успішно зареєстрованний',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

// ============GET=====
router.get('/recovery', function (req, res) {
  return res.render('recovery', {
    name: 'recovery',

    component: ['back-button', 'field'],
    title: 'Recovery page',

    data: {},
  })
})

// ============POST=====
router.post('/recovery', function (req, res) {
  const { email } = req.body

  console.log(email)

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      message: 'Код для відновлення паролю відправлено',
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})
// =============================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/recovery-confirm', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('recovery-confirm', {
    // вказуємо назву контейнера
    name: 'recovery-confirm',
    // вказуємо назву компонентів
    component: ['back-button', 'field', 'field-password'],

    // вказуємо назву сторінки
    title: 'Recovery confirm page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})
// ====================
router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body

  console.log(password, code)

  if (!code || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    user.password = password

    console.log(user)
    const session = Session.create(user)

    return res.status(200).json({
      message: 'Пароль змінено',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ============GET=====
router.get('/signup-confirm', function (req, res) {
  const { renew, email } = req.query
  if (renew) {
    Confirm.create(email)
  }
  return res.render('signup-confirm', {
    name: 'signup-confirm',

    component: ['back-button', 'field'],
    title: 'Signup confirm page',

    data: {},
  })
})
// =========Post=======
router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  if (!code || !token) {
    return res.status(400).json({
      message: "Помилка. Відсутні обов'язкові поля",
    })
  }

  try {
    const session = Session.get(token)
    if (!session) {
      return res.status(400).json({
        message: 'Помилка.Ви не увішли в аккаунт',
      })
    }
    const email = Confirm.getData(code)
    if (!email) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }
    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'Код не дійсний',
      })
    }

    const user = User.getByEmail(session.user.email)
    user.isConfirm = true
    session.user.isConfirm = true

    return res.status(200).json({
      message: 'Ви підтвердили свою пошту',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})
// ============GET=====
router.get('/login', function (req, res) {
  return res.render('login', {
    name: 'login',

    component: ['back-button', 'field', 'field-password'],
    title: 'Login page',

    data: {},
  })
})

// ============POST=====
router.post('/login', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Помилка. Відсутні обов`язкові поля',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з таким email не існує',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Помилка. Пароль не підходить',
      })
    }

    const session = Session.create(user)

    return res.status(200).json({
      message: 'Ви увійшли',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// =======================================================================
// Підключаємо роутер до бек-енду
module.exports = router
