import './scss/main.scss'
import getCoords from './js/coords'
import helper from './js/helper'

(function() {
  var throttle = function(type, name, obj) {
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
  };

  throttle("resize", "optimizedResize");


  var run = function() {
    var form = document.getElementById('form')
    var input = document.getElementById('domain')
    var output = document.getElementById('output')
    var parent = document.getElementById('row')
    var list = document.getElementById('row').children
    var opened = []

    var handler = (e) => {
      parent.removeEventListener('click', handler)

      var target = e.target
      var id = target.id || target.parentNode.id
      var el = document.getElementById(id)
      let prom = new Promise((resolve) => {

        if (opened.length) {
          helper.hide(opened[0])
          setTimeout(() => { resolve(opened.pop().id) }, 200)
        } else {
          resolve({})
        }

      }).then((idx) => {

        if ((id === idx) || id == 'row') {return}

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
        opened.push(o)

      }).then(()=>{
        setTimeout(()=>{
          parent.addEventListener("click", handler)
        }, 200)
      })
    }

    helper.replaceClassName(list)
    helper.changeHeight(list)

    // handle event
    form.addEventListener("submit", function(e) {
      e.preventDefault()
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
    })
    parent.addEventListener("click", handler)
    window.addEventListener("optimizedResize", function() {
        setTimeout(() => {
          helper.replaceClassName(list)
          helper.changeHeight(list)
          helper.changePropertiesHint(opened[0])
        }, 400)
    })
  }

  document.addEventListener("DOMContentLoaded", run);
})();
