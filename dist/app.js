/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  $('.fa-square').click(function () {
    if ($(this).hasClass('fa-square')) {
      $(this).removeClass('fa-square');
      $(this).addClass('fa-check-square');
      $('#privacy').prop('checked', true);
    } else {
      $(this).removeClass('fa-check-square');
      $(this).addClass('fa-square');
      $('#privacy').prop('checked', false);
    }
  });
  $('#newsletter_form').submit(function (e) {
    var email = $('#email');
    email.removeClass('form_error');
    var privacy = $('#privacy');
    privacy.removeClass('form_error');

    if (email.val() === "" || !email.val().includes("@") || !email.val().includes(".")) {
      email.val('');
      email.addClass('form_error');
      email.attr('placeholder', 'Inserisci un\'email valida');
      e.preventDefault();
    }

    if (!privacy.is(':checked')) {
      $('#privacy_text').addClass('form_error');
      e.preventDefault();
    }
  });
  $('#notify_btn').click(function () {
    $('#double_view').show();
    $('#newsletter_form_cnt').hide();
    $(this).addClass('selected-box');
    $('#newsletter_btn').removeClass('selected-box');
  });
  $('#newsletter_btn').click(function () {
    $('#double_view').hide();
    $('#newsletter_form_cnt').show();
    $(this).addClass('selected-box');
    $('#notify_btn').removeClass('selected-box');
  });
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/photos",
    method: "GET",
    success: function success(data) {
      for (var i = 0; i < 24; i++) {
        if (i <= 11) {
          $('#women_panel').append('<div class="col-md-4 panel-square">' + '<img class="img-fluid mt-4 mb-4 panel-img" src="' + data[i].url + '">' + '<p class="text-center">' + data[i].title + '</p>' + '</div>');
        } else {
          $('#men_panel').append('<div class="col-md-4 panel-square">' + '<img class="img-fluid mt-4 mb-4 panel-img" src="' + data[i].url + '">' + '<p class="text-center">' + data[i].title + '</p>' + '</div>');
        }
      }
    }
  });
  $('#panel_search').keyup(function () {
    var searchWord = $(this).val();
    console.log(searchWord);
    $('.panel-square').each(function () {
      var title = $(this).children('p').text();

      if (!title.includes(searchWord)) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  }); // PUSH NOTIFICATION

  var pushButton = $('#push_btn');
  var applicationServerPublicKey = 'BACNAKMq6n6utHVrdIvPkTi_am1lK_Spqol69p0OeZGU9mP0cmqARiekWEVL8KNNSSCHFROf68kLnqpvpUWkiLs';

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    navigator.serviceWorker.register('sw.js').then(function (swReg) {
      console.log('Service Worker is registered', swReg);
      swRegistration = swReg;
      initializeUI();
    }).catch(function (error) {
      console.error('Service Worker Error', error);
    });
  } else {
    console.warn('Push messaging is not supported');
    $('#push_view').removeClass('elements_view');
    $('#download_view').addClass('elements_view');
  }

  function initializeUI() {
    pushButton.click(function () {
      pushButton.prop('disabled', true);

      if (isSubscribed) {
        unsubscribeUser();
      } else {
        subscribeUser();
      }
    }); // Set the initial subscription value

    swRegistration.pushManager.getSubscription().then(function (subscription) {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
  }

  function updateBtn() {
    if (isSubscribed) {
      pushButton.text('DISABLE UPDATE');
    } else {
      pushButton.text('KEEP ME UPDATED');
    }

    pushButton.prop('disabled', false);
  }

  function subscribeUser() {
    var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    }).then(function (subscription) {
      console.log('User is subscribed.');
      isSubscribed = true;
      updateBtn();
    }).catch(function (err) {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();
    });
  }

  function unsubscribeUser() {
    swRegistration.pushManager.getSubscription().then(function (subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    }).catch(function (error) {
      console.log('Error unsubscribing', error);
    }).then(function () {
      console.log('User is unsubscribed.');
      isSubscribed = false;
      updateBtn();
    });
  }

  function urlB64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }
});

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./src/js/app.js ./src/scss/app.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/dlecci/Documenti/landingexample02/src/js/app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! /home/dlecci/Documenti/landingexample02/src/scss/app.scss */"./src/scss/app.scss");


/***/ })

/******/ });