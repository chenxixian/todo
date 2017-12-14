var __bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };
(function (root, factory) {
  if (typeof exports === "object") {
    factory(exports);
  } else if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else {
    factory(root);
  }
})(this, function (exports) {
  var PleaseWait, addClass, animationEvent, animationSupport, domPrefixes, elm, key, pfx, pleaseWait, removeClass, transEndEventNames, transitionEvent, transitionSupport, val, _i, _len;
  elm = document.createElement('fakeelement');
  animationSupport = false;
  transitionSupport = false;
  animationEvent = 'animationend';
  transitionEvent = null;
  domPrefixes = 'Webkit Moz O ms'.split(' ');
  transEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
  };
  for (key in transEndEventNames) {
    val = transEndEventNames[key];
    if (elm.style[key] != null) {
      transitionEvent = val;
      transitionSupport = true;
      break;
    }
  }
  if (elm.style.animationName != null) {
    animationSupport = true;
  }
  if (!animationSupport) {
    for (_i = 0, _len = domPrefixes.length; _i < _len; _i++) {
      pfx = domPrefixes[_i];
      if (elm.style["" + pfx + "AnimationName"] != null) {
        switch (pfx) {
          case 'Webkit':
            animationEvent = 'webkitAnimationEnd';
            break;
          case 'Moz':
            animationEvent = 'animationend';
            break;
          case 'O':
            animationEvent = 'oanimationend';
            break;
          case 'ms':
            animationEvent = 'MSAnimationEnd';
        }
        animationSupport = true;
        break;
      }
    }
  }
  addClass = function (classname, elem) {
    if (elem.classList) {
      return elem.classList.add(classname);
    } else {
      return elem.className += " " + classname;
    }
  };
  removeClass = function (classname, elem) {
    if (elem.classList) {
      return elem.classList.remove(classname);
    } else {
      return elem.className = elem.className.replace(classname, "").trim();
    }
  };
  PleaseWait = (function () {
    PleaseWait._defaultOptions = {
      backgroundColor: null,
      logo: null,
      loadingHtml: null,
      template: "<div class='pg-loading-inner'>\n  <div class='pg-loading-center-outer'>\n    <div class='pg-loading-center-middle'>\n      <h1 class='pg-loading-logo-header'>\n        <img class='pg-loading-logo'></img>\n      </h1>\n      <div class='pg-loading-html'>\n      </div>\n    </div>\n  </div>\n</div>",
      onLoadedCallback: null
    };
    function PleaseWait(options) {
      var defaultOptions, k, listener, v;
      defaultOptions = this.constructor._defaultOptions;
      this.options = {};
      this.loaded = false;
      this.finishing = false;
      for (k in defaultOptions) {
        v = defaultOptions[k];
        this.options[k] = options[k] != null ? options[k] : v;
      }
      this._loadingElem = document.createElement("div");
      this._loadingHtmlToDisplay = [];
      if (this.options.absolute) {
        this._loadingElem.className = "pg-loading-screen pg-loading-screen-absolute";
      } else {
        this._loadingElem.className = "pg-loading-screen";
      }
      if (this.options.backgroundColor != null) {
        this._loadingElem.style.backgroundColor = this.options.backgroundColor;
      }
      if (this.options.template && !options.logo) {
        this.options.template = this.options.template.replace('<img class=\'pg-loading-logo\'></img>', '');
      }
      this._loadingElem.innerHTML = this.options.template;
      this._loadingHtmlElem = this._loadingElem.getElementsByClassName("pg-loading-html")[0];
      if (this._loadingHtmlElem != null) {
        this._loadingHtmlElem.innerHTML = this.options.loadingHtml;
      }
      this._readyToShowLoadingHtml = false;
      this._logoElem = this._loadingElem.getElementsByClassName("pg-loading-logo")[0];
      if (this._logoElem != null && options.logo) {
        this._logoElem.src = this.options.logo;
      }
      removeClass("pg-loaded", document.body);
      addClass("pg-loading", document.body);
      document.body.appendChild(this._loadingElem);
      addClass("pg-loading", this._loadingElem);
      this._onLoadedCallback = this.options.onLoadedCallback;
      listener = __bind(function (evt) {
        this.loaded = true;
        this._readyToShowLoadingHtml = true;
        addClass("pg-loaded", this._loadingHtmlElem);
        if (animationSupport) {
          this._loadingHtmlElem.removeEventListener(animationEvent, listener);
        }
        if (this._loadingHtmlToDisplay.length > 0) {
          this._changeLoadingHtml();
        }
        if (this.finishing) {
          if (evt != null) {
            evt.stopPropagation();
          }
          return this._finish();
        }
      }, this);
      if (this._loadingHtmlElem != null) {
        if (animationSupport) {
          this._loadingHtmlElem.addEventListener(animationEvent, listener);
        } else {
          listener();
        }
        this._loadingHtmlListener = __bind(function () {
          this._readyToShowLoadingHtml = true;
          removeClass("pg-loading", this._loadingHtmlElem);
          if (transitionSupport) {
            this._loadingHtmlElem.removeEventListener(transitionEvent, this._loadingHtmlListener);
          }
          if (this._loadingHtmlToDisplay.length > 0) {
            return this._changeLoadingHtml();
          }
        }, this);
        this._removingHtmlListener = __bind(function () {
          this._loadingHtmlElem.innerHTML = this._loadingHtmlToDisplay.shift();
          removeClass("pg-removing", this._loadingHtmlElem);
          addClass("pg-loading", this._loadingHtmlElem);
          if (transitionSupport) {
            this._loadingHtmlElem.removeEventListener(transitionEvent, this._removingHtmlListener);
            return this._loadingHtmlElem.addEventListener(transitionEvent, this._loadingHtmlListener);
          } else {
            return this._loadingHtmlListener();
          }
        }, this);
      }
    }
    PleaseWait.prototype.finish = function (immediately, onLoadedCallback) {
      if (immediately == null) {
        immediately = false;
      }
      if (window.document.hidden) {
        immediately = true;
      }
      this.finishing = true;
      if (onLoadedCallback != null) {
        this.updateOption('onLoadedCallback', onLoadedCallback);
      }
      if (this.loaded || immediately) {
        return this._finish(immediately);
      }
    };
    PleaseWait.prototype.updateOption = function (option, value) {
      switch (option) {
        case 'backgroundColor':
          return this._loadingElem.style.backgroundColor = value;
        case 'logo':
          return this._logoElem.src = value;
        case 'loadingHtml':
          return this.updateLoadingHtml(value);
        case 'onLoadedCallback':
          return this._onLoadedCallback = value;
        default:
          throw new Error("Unknown option '" + option + "'");
      }
    };
    PleaseWait.prototype.updateOptions = function (options) {
      var k, v, _results;
      if (options == null) {
        options = {};
      }
      _results = [];
      for (k in options) {
        v = options[k];
        _results.push(this.updateOption(k, v));
      }
      return _results;
    };
    PleaseWait.prototype.updateLoadingHtml = function (loadingHtml, immediately) {
      if (immediately == null) {
        immediately = false;
      }
      if (this._loadingHtmlElem == null) {
        throw new Error("The loading template does not have an element of class 'pg-loading-html'");
      }
      if (immediately) {
        this._loadingHtmlToDisplay = [loadingHtml];
        this._readyToShowLoadingHtml = true;
      } else {
        this._loadingHtmlToDisplay.push(loadingHtml);
      }
      if (this._readyToShowLoadingHtml) {
        return this._changeLoadingHtml();
      }
    };
    PleaseWait.prototype._changeLoadingHtml = function () {
      this._readyToShowLoadingHtml = false;
      this._loadingHtmlElem.removeEventListener(transitionEvent, this._loadingHtmlListener);
      this._loadingHtmlElem.removeEventListener(transitionEvent, this._removingHtmlListener);
      removeClass("pg-loading", this._loadingHtmlElem);
      removeClass("pg-removing", this._loadingHtmlElem);
      if (transitionSupport) {
        addClass("pg-removing", this._loadingHtmlElem);
        return this._loadingHtmlElem.addEventListener(transitionEvent, this._removingHtmlListener);
      } else {
        return this._removingHtmlListener();
      }
    };
    PleaseWait.prototype._finish = function (immediately) {
      var listener;
      if (immediately == null) {
        immediately = false;
      }
      if (this._loadingElem == null) {
        return;
      }
      addClass("pg-loaded", document.body);
      if (typeof this._onLoadedCallback === "function") {
        this._onLoadedCallback.apply(this);
      }
      listener = __bind(function () {
        if (this._loadingElem == null) {
          return;
        }
        document.body.removeChild(this._loadingElem);
        removeClass("pg-loading", document.body);
        if (animationSupport) {
          this._loadingElem.removeEventListener(animationEvent, listener);
        }
        return this._loadingElem = null;
      }, this);
      if (!immediately && animationSupport) {
        addClass("pg-loaded", this._loadingElem);
        return this._loadingElem.addEventListener(animationEvent, listener);
      } else {
        return listener();
      }
    };
    return PleaseWait;
  })();
  pleaseWait = function (options) {
    if (options == null) {
      options = {};
    }
    return new PleaseWait(options);
  };
  exports.pleaseWait = pleaseWait;
  return pleaseWait;
});
