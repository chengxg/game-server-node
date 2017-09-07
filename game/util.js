'use strict';
var util = (function () {
    function Util() {
    }
    Util.isType = function (val) {
        return Object.prototype.toString.call(val).slice(8, -1);
    };
    Util.isObject = function (val) {
        return Util.isType(val) === 'Object';
    };
    Util.isArray = function (val) {
        return Util.isType(val) === 'Array';
    };
    Util.isFunction = function (val) {
        return Util.isType(val) === 'Function';
    };
    Util.extend = function (dest, src) {
        if (Util.isObject(dest) || Util.isFunction(dest) && Util.isObject(src)) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    if (Util.isObject(src[key])) {
                        dest[key] = Util.extend({}, src[key]);
                    }
                    else if (Util.isArray(src[key])) {
                        dest[key] = Util.extend([], src[key]);
                    }
                    else {
                        dest[key] = src[key];
                    }
                }
            }
        }
        else if (Util.isArray(dest) && Util.isArray(src)) {
            for (var i = 0, len = src.length; i < len; i++) {
                dest.push(src[i]);
            }
        }
        return dest;
    };
    Util.clone = function (obj) {
        if (Util.isObject(obj)) {
            return Util.extend({}, obj);
        }
        else if (Util.isArray(obj)) {
            return Util.extend([], obj);
        }
        else {
            return obj;
        }
    };
    Util.sumArray = function (arr) {
        var sum = 0;
        if (Util.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                sum = sum + arr[i];
            }
        }
        return sum;
    };
    Util.toggleValOfArray = function (arr, val) {
        var no = arr.indexOf(val);
        if (no == -1) {
            arr.push(val);
        }
        else {
            arr.splice(no, 1);
        }
    };
    /**
     * 从一个数组中删除值
     * @param {Array,string,number} srcArr
     * @param {Array} valueArr
     */
    Util.delArrSameVal = function (srcArr, valueArr) {
        var i = 0, j = 0;
        if (!Util.isArray(valueArr)) {
            valueArr = [valueArr];
        }
        for (i = 0; i < valueArr.length; i++) {
            for (j = 0; j < srcArr.length; j++) {
                if (srcArr[j] === valueArr[i]) {
                    srcArr.splice(j, 1);
                }
            }
        }
    };
    return Util;
}());

module.exports = util;