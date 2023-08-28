class BackButton {
  static back() {
    return window.history.back()
  }
}

window.backButton = BackButton // ***

// підключена ф-ція на повернення до минулого вікна
