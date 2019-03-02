helper = require('./helper')
getCoords = require('./coords')

this.stack = []

var iconsHandler = function (e, parent, list, stack) {
  var stack = stack || this.stack
  var target = e.target
  var id = target.id || target.parentNode.id
  var el = document.getElementById(id)

  var prom = new Promise((resolve) => {

    if (stack.length) {
      helper.hide(stack[0])
      setTimeout(() => {
        resolve(stack.pop().id)
      }, 200)
    } else {
      resolve({})
    }

  }).then((idx) => {

    if ((id === idx) || (id === 'row') || stack.length) {return stack}

    var pos = getCoords(el)
    var hint = document.getElementById(`${id}Hint`)
    var o = {
      id: id,
      el: el,
      list: list,
      hint: hint,
      corner: hint.children[1],
      maxHeight: helper.calculateMaxHeight(parent.children) - 20,
      heightHint: hint.clientHeight,
      top: pos.top,
      left: pos.left
    }

    helper.show(o)
    stack.push(o)
    return stack

  }).then((stack)=>{
    setTimeout(()=>{
      parent.addEventListener("click", {
        handleEvent: function (e) {
          parent.removeEventListener(e.type, this, false);
          iconsHandler(e, parent, list, stack)
        }
      })
    }, 200)
  })
}

var formSubmitHandler = function (e, input, info, output) {
  var val = input.value
  if (val.length) {
    info.style.visibility = ''
    if (val.match(/[.]ru/) === null) {
      val += '.ru'
    }
    input.value = val
    output.innerHTML = val
  } else {
    info.style.visibility = 'hidden'
  }
}

module.exports = {
  stack: this.stack,
  iconsHandler: iconsHandler,
  formSubmitHandler: formSubmitHandler
}
