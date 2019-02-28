import './scss/main.scss'
import getCoords from './js/coords'

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

})();

var giveNumClassName = function(w) {
  if (w >= 819) {
    return 4
  } else if (w >= 480) {
    return 3
  } else {
    return 2
  }
}

var replaceClassName = function(list) {
  for (var i = 0; i < list.length; i++) {
    let col = list[i]
    col.className = `grid-col-${giveNumClassName(window.innerWidth)}`
  }
}

var reHeight = function (list) {
  for (var i = 0; i < list.length; i++) {
    let child = list[i].children
    child[0].style.height = `${child[0].clientHeight}px`
  }
}

var maxHeight = function () {
  const marginsBottom = 10
  var elems = document.getElementById('row').children
  var max = 0
  for (var i = 0; i < elems.length; i++) {
    var current = 0
    var children = elems[i].children[0].children
    for (var j = 0; j < children.length; j++) {
      current += children[j].clientHeight
    }
    if (current > max) {
      max = current
    }
  }
  return max - marginsBottom
}

var recalculateHint = function (o) {
  if (o === undefined) return
  let el = o.el
  let hint = o.hint
  let id = o.id
  let corner = o.corner
  let max = maxHeight() - 20
  let heightHint = hint.clientHeight

  let pos = getCoords(el)

  el.style.height = `${max + heightHint + corner.clientHeight}px`

  hint.style.top = `${pos.top + max}px`
  corner.style.left = `${pos.left + el.clientWidth/2}px`
}


var run = function () {

  var parent = document.getElementById('row')
  var list = document.getElementById('row').children
  var opened = []

  // handle event
  window.addEventListener("optimizedResize", function() {
      replaceClassName(parent.childNodes)
      reHeight(parent.children)
      setTimeout(() => {
        recalculateHint(opened[0])
      }, 400)
  })

  var handler = (e) => {

    parent.removeEventListener('click', handler)

    var target     = e.target
    var id         = target.id || target.parentNode.id
    var el         = document.getElementById(id)

    let prom = new Promise((resolve) => {

      if (opened.length) {
        let openEl = opened[0]
        openEl.el.style.height = `${openEl.maxHeight}px`
        openEl.hint.style.opacity = '0'
        openEl.hint.style.top = ''
        setTimeout(()=>{
          resolve(opened.pop())
        }, 200)
      } else {
        resolve({})
      }
    })
    prom.then((o) => {

        if (id === o.id) {
          return
        }

        let hint            = document.getElementById(`${id}Hint`)
        let corner          = hint.children[1]
        let newHeightEl     = el.parentNode.clientHeight + corner.clientHeight
        let heightHint      = hint.clientHeight
        // debugger
        let max             = maxHeight() - 20
        if (id !== 'row') {
          var pos = getCoords(el)
        }

        el.style.height = `${max + heightHint + corner.clientHeight}px`
        setTimeout(()=>{
          hint.style = `opacity: 1; top: ${pos.top + max}px`
          corner.style.left = `${pos.left + el.clientWidth/2}px`
        }, 50)

        opened.push({
                el: el,
                hint: hint,
                id: id,
                newHeightEl: newHeightEl,
                corner: corner,
                maxHeight: max,
                heightHint: heightHint
              })

    }).then(()=>{
      setTimeout(()=>{
        parent.addEventListener("click", handler)
      }, 200)
    })
  }

  parent.addEventListener("click", handler)
  replaceClassName(parent.childNodes)
  reHeight(parent.children)

}


document.addEventListener("DOMContentLoaded", run);
