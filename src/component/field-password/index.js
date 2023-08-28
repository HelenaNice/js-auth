class FieldPassword {
  static toggle = (target) => {
    target.toggleAttribute('show')
    // target.previousElementSibling да. можливість зернутися до елемента , що поруч з цим, сибс

    const input = target.previousElementSibling

    const type = input.getAttribute('type')

    if (type === 'password') {
      input.setAttribute('type', 'text')
    } else {
      input.setAttribute('type', 'password')
    }
  }
}

window.fieldPassword = FieldPassword
