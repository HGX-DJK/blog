var CustomAnimate = (function() {
    function animate(element, properties, callback) {
      var duration = properties.duration || 1000;
      var easing = properties.easing || "linear";
      var start = performance.now();
  
      function update(time) {
        var timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
  
        var progress = CustomAnimate.easing[easing](timeFraction);
  
        for (var property in properties) {
            if (property !== "duration" && property !== "easing") {
              var startValue = parseFloat(getComputedStyle(element)[property]);
              var endValue = parseFloat(properties[property]);
              var currentValue = startValue + progress * (endValue - startValue);
              element.style[property] = currentValue + (property === "opacity" ? "" : "px");
            }
        }
  
        if (timeFraction < 1) {
          requestAnimationFrame(update);
        } else {
          if (callback) callback();
        }
      }
  
      requestAnimationFrame(update);
    }
  
    // 缓动函数
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
  
    return {
      animate: animate,
      easing: {
        linear: function(t) {
          return t;
        },
        easeInOutQuad: easeInOutQuad
      }
    };
  })();