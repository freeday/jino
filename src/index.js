import './scss/main.scss'
import helper from './js/helper'
import handlers from './js/handlers'

(function(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) { return; }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
})("resize", "optimizedResize");

var run = function() {
  var form = document.getElementById('form')
  var input = document.getElementById('domain')
  var output = document.getElementById('output')
  var row = document.getElementById('row')
  var list = row.children

  helper.replaceClassName(list)
  helper.changeHeight(list)

  // handle event

  form.addEventListener("submit", function(e) {
    e.preventDefault()
    formSubmitHandler(e, input, info, output)
  })

  row.addEventListener("click", {
    handleEvent: function (e) {
      row.removeEventListener(e.type, this, false);
      handlers.iconsHandler(e, row, list)
    }
  })

  window.addEventListener("optimizedResize", function() {
      setTimeout(() => {
        helper.replaceClassName(list)
        helper.changeHeight(list)
        helper.changePropertiesHint(handlers.stack[0])
      }, 400)
  })
}

document.addEventListener("DOMContentLoaded", run);
