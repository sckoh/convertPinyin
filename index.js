'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Data = require('./data.json');
var _ = require('lodash');

var Pinyin = function () {
  function Pinyin() {
    _classCallCheck(this, Pinyin);
  }

  _createClass(Pinyin, [{
    key: 'get',
    value: function get(str) {
      var _this = this;

      this.isZh = false;
      var ret = [];
      var reg = new RegExp('[a-zA-Z0-9\- ]');
      if (str && str.length !== 0) {
        _.forEach(str, function (val) {
          if (reg.test(val)) {
            if (ret.length !== 0 && !_this.isZh) {
              ret.push(ret.pop() + val);
            } else {
              _this.isZh = false;
              ret.push(val);
            }
          } else {
            var name = _this.search(val);
            if (name) {
              _this.isZh = true;
              ret.push(name);
            }
          }
        });
      }
      return ret;
    }
  }, {
    key: 'search',
    value: function search(str) {
      var once = true;
      var ret = null;
      _.forEach(Data, function (val, key) {
        if (once && val.indexOf(str) !== -1) {
          once = false;
          ret = key;
        }
      });
      return ret;
    }
  }]);

  return Pinyin;
}();

var pinyin = new Pinyin();
module.exports = pinyin.get.bind(pinyin);
