module.exports = function (elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: Math.floor(box.top + pageYOffset),
    left: Math.floor(box.left + pageXOffset)
  };

}
