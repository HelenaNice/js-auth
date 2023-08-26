class BackButton {
  static back() {
    return window.history.back()
  }
}

window.BackButton = BackButton

// підключена ф-ція на повернення до минулого вікна
