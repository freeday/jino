module.exports = function (elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: Math.floor(box.top + pageYOffset),
    left: Math.floor(box.left + pageXOffset)
  };

}
