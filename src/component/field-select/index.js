class FieldSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling

    options.toggleAttribute('active')
    // при зміні фокуса з поля вибору - список закривається. Через таймер без встан часу, з/з= 0
    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          // чи елем в середині батьківського контейнера?
          if (!options.parentElement.contains(e.target))
            options.removeAttribute('active')
        },
        { once: true },
      )
    })
  }
  // для зміни плейсхолдера на обрану роль
  static change = (target) => {
    const parent = target.parentElement.parentElement
    // отримати список всіх опцій-ролей из each  и закриваем випад список
    const list = target.parentElement

    // в списке ищем активную роль → отрубаем
    const active = list.querySelector('*[active]')

    if (active) active.toggleAttribute('active')
    // целевую роль ставим в строку
    target.toggleAttribute('active')
    // ===

    const value = parent.querySelector('.field__value')

    if (value) {
      value.innerText = target.innerText
      // плейсхолдер меняем на текст роли
      value.classList.remove('field__value--placeholder')
    }

    list.toggleAttribute('active')
  }
}

window.fieldSelect = FieldSelect
