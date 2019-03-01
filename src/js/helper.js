let getCoords = require('./coords')
let dimensions = require('./dimensions')

module.exports = {
  calculateMaxHeight: function (list) {
    const marginsBottom = 10
    var max = 0
    for (var i = 0; i < list.length; i++) {
      var current = 0
      var children = list[i].children[0].children
      for (var j = 0; j < children.length; j++) {
        current += children[j].clientHeight
      }
      if (current > max) {
        max = current
      }
    }
    return max - marginsBottom
  },

  changePropertiesHint: function (o) {
    if (o === undefined) return
    const offsetTop = 20
    let el = o.el
    let hint = o.hint
    let corner = o.corner
    let max = this.calculateMaxHeight(o.list) - offsetTop
    let heightHint = hint.clientHeight
    let pos = getCoords(el)
    let leftHint = dimensions.getMaxWidthBody()/2 - dimensions.getMaxWidthHint()/2

    el.style.height = `${max + heightHint + corner.clientHeight}px`
    hint.style.top = `${pos.top + max}px`
    hint.style.left = `${leftHint}px`
    corner.style.left = `${(pos.left + el.clientWidth/2) - leftHint}px`
  },

  changeHeight: function (list) {
    for (var i = 0; i < list.length; i++) {
      let child = list[i].children
      child[0].style.height = `${child[0].clientHeight}px`
    }
  },

  replaceClassName: function(list) {
    for (var i = 0; i < list.length; i++) {
      let col = list[i]
      col.className = `grid-col-${this.giveNumClassName(window.innerWidth)}`
    }
  },

  giveNumClassName: function(w) {
    if (w >= 819) {
      return 4
    } else if (w >= 480) {
      return 3
    } else {
      return 2
    }
  },

  hide: function (o) {
    o.el.style.height = `${o.maxHeight}px`
    o.hint.style.opacity = '0'
    o.hint.style.top = ''
  },

  show: function (o) {
    const borderHint = 1
    let max = o.maxHeight
    let corner = o.corner
    let el = o.el
    let hint = o.hint
    let leftHint = dimensions.getMaxWidthBody()/2 - dimensions.getMaxWidthHint()/2

    el.style.height = `${max + o.heightHint + corner.clientHeight}px`
    setTimeout(() => {
      hint.style = `opacity: 1; top: ${o.top + max}px; left: ${leftHint}px`
      corner.style.left = `${(o.left + el.clientWidth/2) - leftHint}px`
    }, 50)
  }
}
