import './scss/main.scss'


var ready = function () {
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

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
  })();

  var list = document.getElementById('row').children
  var getClassName = function(w) {
    if (w >= 819) {
      return 'grid-col-4'
    } else if (w >= 480) {
      return 'grid-col-3'
    } else {
      return 'grid-col-2'
    }
  }
  var setClassName = function(list) {
    for (var i = 0; i < list.length; i++) {
      list[i].className = getClassName(window.innerWidth)
    }
  }
  // handle event
  window.addEventListener("optimizedResize", function() {
      setClassName(list)
  })
  setClassName(list)
}

document.addEventListener("DOMContentLoaded", ready);
