"use strict";

function calculateVideoSize() {
  var t = ".videoplayer-container, .videoplayer-container-thumb",
      i = $(t);

  if (i.length) {
    var e = i.find("iframe");
    e.each(function (i, e) {
      var a = $(e).closest(t).width(),
          o = $(e).closest(t).height();

      if (o > a) {
        var s = 1.77 * o;
        $(e).css({
          width: s,
          "min-width": s,
          "min-height": "auto",
          height: s
        });
      } else {
        s = 1.77 * a;
        $(e).css({
          height: s,
          "min-height": s,
          "min-width": "auto",
          width: s
        });
      }
    });
  }
}

function closeDropDown(t) {
  $(".smart-section-nav__list").not(t).addClass("visually-hidden"), t || window.removeEventListener("click", windowClickCallback);
}

function alignCenter(t) {
  $(window).height() > t.outerHeight() ? t.css({
    top: ($(window).height() - t.height()) / 2 + "px"
  }) : t.css("top", 0);
}

function renderError(t, i) {
  $(t).after('<label class="label-form-error" id="label_' + i + '">This field is required<label>');
}

function submitCustomForm(t) {
  t.preventDefault(), $(".label-form-error").remove();
  var i = $(this),
      e = i.attr("data-integration-id"),
      a = i.attr("data-integration-pk"),
      o = $(this).closest(".section-class-link").find('.form-item:not(".hidden__important") input[data-integration-id="' + e + '"][type="text"], .form-item:not(".hidden__important") input[data-integration-id="' + e + '"][type="radio"]:checked, .form-item:not(".hidden__important") input[data-integration-id="' + e + '"][type="checkbox"]:checked, .form-item:not(".hidden__important") textarea[data-integration-id="' + e + '"], .form-item:not(".hidden__important") select[data-integration-id="' + e + '"]');

  if (o.length > 0 && a) {
    var s = !1;
    o.map(function (i, e) {
      if ($(e).bind("focus", function (t) {
        $("#label_" + $(e).attr("id")).css("display", "none"), $(this).off(t);
      }), "required" == $(e).attr("required") && !$(e).val()) {
        t.preventDefault();
        var a = $(e).attr("id");
        renderError(e, a), s = !0;
      }
    }), s ? (t.preventDefault(), t.stopImmediatePropagation()) : $.ajax({
      url: "/api/autoresponder/integrations/" + a + "/",
      type: "GET",
      async: !1,
      success: function success(a) {
        if (a && a.html) {
          $("body").addClass("user-no-click");
          var s = $.parseHTML(a.html);
          $("body").append($('<div id="form_integration_' + e + '" hidden>').append(s));
          var n = $("#form_integration_" + e).find("form").first();
          o.each(function () {
            var t = $(this),
                i = t.attr("name"),
                e = t.val();

            if (i && e) {
              var a = n.find('[name="' + i + '"]').first();
              "radio" === t.attr("type") || "checkbox" === t.attr("type") ? (a = n.find('[name="' + i + '"][value="' + e + '"]').first()).attr("checked", !0) : (a = n.find('[name="' + i + '"]').first()).length > 0 && a.val(e);
            }
          });
          var r = n.attr("action");

          if (r.includes("wufoo") || r.includes("mcssl") || r.includes("contest")) {
            t.preventDefault();
            var l = n.find('[type="submit"], #submit, [name="submit"]').first();
            l ? l.click() : n.submit();
          } else $.ajax({
            url: n.attr("action"),
            type: "POST",
            data: n.serialize(),
            crossDomain: !0,
            async: !0,
            complete: function complete(a, s) {
              var n = a.getResponseHeader("Location");
              n && -1 !== n.indexOf("captcha") && (window.location = n), $("body").hasClass("user-no-click") && $("body").removeClass("user-no-click"), 200 != a.status && 0 != a.status ? (console.log('An error has occurred: "' + a.status + ". " + a.statusText + '"'), t.preventDefault(), t.stopImmediatePropagation()) : (i.attr("href") || "").replace("#", "") ? window.location = i.attr("href") : o.val(""), $("#form_integration_" + e).remove();
            }
          });
        }
      }
    });
  }
}

function submitForm(t) {
  $(".label-form-error").remove(), t.preventDefault();
  var i = $(this),
      e = $(this).attr("data-integration-type").toLowerCase(),
      a = $(this).attr("data-integration-list-id"),
      o = $(this).attr("data-integration-original-id"),
      s = !1,
      n = a,
      r = !1;
  $(this).attr("data-integration-campaign") && (s = $(this).attr("data-integration-campaign")), $(this).attr("data-integration-infusionsoft-id") && (n = $(this).attr("data-integration-infusionsoft-id")), $(this).attr("data-opt-in") && (r = $(this).attr("data-opt-in"));
  var l,
      c = $(this).closest(".section-class-link"),
      d = "",
      p = !1;
  "email" === e ? (l = '[data-integration-list-id="' + o + '"]', d = c.find('.form-item:not(".hidden__important") input' + l + '[type="text"], .form-item:not(".hidden__important") input' + l + '[type="radio"]:checked, .form-item:not(".hidden__important") input' + l + '[type="checkbox"]:checked, .form-item:not(".hidden__important") textarea' + l + ', .form-item:not(".hidden__important") select' + l), p = !0) : (l = '[data-integration-type="' + e + '"][data-integration-list-id="' + n + '"]', d = c.find('.form-item:not(".hidden__important") input' + l + ', .form-item:not(".hidden__important") textarea' + l));
  var h = d;

  if (h.length > 0) {
    var m = !1;
    if (h.map(function (i, e) {
      if ($(e).bind("focus", function (t) {
        $("#label_" + $(e).attr("id")).css("display", "none"), $(this).off(t);
      }), "required" === $(e).attr("required") && "" === $(e).val().trim()) {
        t.preventDefault(), t.stopImmediatePropagation();
        var a = $(e).attr("id");
        renderError(e, a), m = !0;
      }
    }), m) t.preventDefault(), t.stopImmediatePropagation();else {
      var f = new FormData(),
          v = {};
      h.each(function () {
        if ($(this).attr("data-integration-name")) {
          var t = $(this).val();
          "infusionsoft" === $(this).attr("data-integration-type") && "checkbox" === $(this).attr("type") && (t = +$(this).prop("checked")), f.append($(this).attr("data-integration-name"), t), p && (v[$(this).attr("data-integration-name")] = $(this).val());
        }
      }), f.append("opt_in", r), f.append("type", e), f.append("list_id", a), f.append("object_id", o), f.append("campaign_id", s), p && f.append("data_form", JSON.stringify(v)), $.ajax({
        url: "/api/send-integration/",
        type: "POST",
        data: f,
        processData: !1,
        contentType: !1,
        success: function success(e) {
          "error" in e ? (console.log('An error has occurred: "' + e.error + '"'), t.preventDefault(), t.stopImmediatePropagation()) : "ok" in e && ((i.attr("href") || "").replace("#", "") ? window.location = i.attr("href") : (h.filter(':not([type="checkbox"],[type="radio"])').val(""), h.filter('[type="checkbox"]:not([checked="checked"]),[type="radio"]:not([checked="checked"])').prop("checked", !1), h.filter('[type="checkbox"][checked="checked"],[type="radio"][checked="checked"]').prop("checked", !0)));
        }
      });
    }
  }
}

function openPopup(t, i) {
  t.preventDefault();
  var e = $(i)[0].getAttribute("data-blur"),
      a = "";
  e && (a = "blur(" + e + "px)");
  var o = $(".contentWrapper")[0].style;
  o.WebkitFilter = a, o.MozFilter = a, o.OFilter = a, o.MsFilter = a, o.filter = a, $(".modal-visible").removeClass("modal-visible"), $(i)[0].classList.add("modal-visible"), alignCenter($(".modal-visible .modal-vertical")), $("html,body").css("overflow", "hidden"), $(".modal-visible .scrollbar-inner").scrollbar();
}

$(document).ready(function () {
  function t() {
    var t = $(this);
    t.css({
      width: "100%"
    });
    var i = t.closest(".image-n-gradient-root"),
        e = parseFloat(i.closest(".main-block-image").innerWidth().toFixed(2)),
        a = parseFloat(t.innerWidth().toFixed(2)),
        o = parseFloat(t.innerHeight().toFixed(2));

    if (t.css({
      height: "auto",
      width: "100%"
    }), i.css({
      height: "auto",
      width: "100%"
    }), a && o) {
      var s = i.data("max-value-input-height");

      try {
        s = parseFloat(parseInt(s, 10).toFixed(2));
      } catch (t) {
        s = 0, console.error("Error convert value to int");
      }

      a > e && 0 !== e && (s = e), i.css({
        width: s,
        height: s
      });
      var n = 1;
      a = parseFloat(t.innerWidth().toFixed(2)), s > (o = parseFloat(t.innerHeight().toFixed(2))) ? (n = s / o, o = s, a *= n) : s > a && (n = s / a, a = s, o *= n), (s < o || s < a) && t.css({
        height: o,
        width: a
      });
    }
  }

  if ($(window).on("load", function () {
    $("img").each(function () {
      this.complete && void 0 !== this.naturalWidth && 0 != this.naturalWidth || (this.src = "https://dsovc51kv2br8.cloudfront.net/media/common/imageNotAvailable.jpg");
    }), calculateVideoSize();
  }), $("[data-disabled]").mousedown(function (t) {
    t.preventDefault(), t.stopPropagation();
  }), $(window).on("resize", function () {
    $(".image-shape-circle img").resize(), $(".is-testimonial-section").length && $(".is-testimonial-section").each(function () {
      $(this);
      var t = 0,
          i = $(this).find(".row.is-active-testimonial-row").first().attr("id");
      $(this).find(".row").each(function (e, a) {
        $(a).addClass("is-active-testimonial-row").removeClass("is-pre-active-testimonial-row").removeClass("is-post-active-testimonial-row");
        var o = $(a).find(".image-shape-circle img");
        o.length && o.resize(), t < $(a).height() + 30 && (t = $(a).height() + 30), $(a).attr("id") !== i && $(a).removeClass("is-active-testimonial-row");
      }), $(this).height(t);
    });
  }), $(".section-class-link .navigation-ul").each(function (t, i) {
    $(i).clone().addClass("smart-section-nav__list visually-hidden").appendTo($(this).closest(".section-class-link")).attr("id", i.id + "_cloned");
  }), $(".image-shape-circle img").one("load", function () {
    t.bind(this)();
  }).each(function () {
    this.complete && t.bind(this)();
  }), $(".image-shape-circle img").on("resize", function (i) {
    i.stopPropagation(), t.bind(this)();
  }), $(".videoplayer-container").length > 0) {
    var o = function o(t) {
      var i = t.divObj.offsetWidth + 200,
          e = t.divObj.offsetHeight;
      if (i / e > 16 / 9) t.playerObj.setSize(i, i / 16 * 9), $("#" + t.playerId).css({
        left: -100
      });else {
        var a = (i - $("#" + t.playerId).width()) / 2 - 100;
        $("#" + t.playerId).css({
          left: a
        }), t.playerObj.setSize(e / 9 * 16, e);
      }
    };

    var i = document.createElement("script");
    i.src = "https://www.youtube.com/iframe_api";
    var e = document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(i, e);
    var a = [];
    window.onYouTubeIframeAPIReady = function () {
      var t = {
        autoplay: 1,
        autohide: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 0,
        iv_load_policy: 3
      };

      function i(t) {
        t.target.mute && t.target.mute(), a.forEach(function (t) {
          var i = t.playerObj;
          i.playVideo && (i.playVideo(), i.isMuted && !i.isMuted() && i.mute()), o(t);
        });
      }

      function e(t) {
        t.data === YT.PlayerState.ENDED && t.target.playVideo();
      }

      $(".videoplayer-container").each(function (o, s) {
        var n = "videoplayer-container-" + $(s).attr("data-section"),
            r = s,
            l = new YT.Player(n, {
          videoId: $(s).attr("data-youtube-id"),
          events: {
            onReady: i,
            onStateChange: e
          },
          playerVars: t
        });
        a.push({
          playerId: n,
          playerObj: l,
          divObj: r
        });
      });
    }, $(window).on("load resize", function () {
      a.forEach(o);
    });
  }

  var s = $(".navigationPage");
  s && s.length && s.each(function () {
    var t = $(this),
        i = t.closest(".row");
    !t.hasClass("custom-navigation") || t.hasClass("text-align-center") || i.hasClass("navigation-page-row") ? i.hasClass("navigation-page-row") && i.removeClass("navigation-page-row") : i.addClass("navigation-page-row");
  }), $('[data-stripe="handler"]').length && (window.stripeBillingComplete = function (t, i, e) {
    $.ajax({
      url: "/api/stripe-billing/" + t + "/send/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(i),
      success: function success() {
        var t = $("#" + e + ' [data-stripe="handler"]');
        t.attr("data-stripe-disable", !0), t[0].click(), t.removeAttr("data-stripe-disable");
      },
      error: function error(t) {
        alert("An error has occurred stripe: " + t.responseText);
      }
    });
  });
}), $('[data-stripe="handler"]').click(function (t) {
  var i = $(this),
      e = i.closest(".button-item").attr("id"),
      a = window.stripeBilling[e];

  if (a && !i.attr("data-stripe-disable")) {
    t.preventDefault();
    var o = "Pay",
        s = parseFloat(i.data("amount")),
        n = i.data("currency");

    if ("true" === i.data("subscription").toLowerCase()) {
      o = "Subscribe {{amount}}";
      var r = i.data("subscription_interval");
      r && (o += "/" + r.toUpperCase());
    }

    a.open({
      name: i.data("form_name"),
      description: i.data("form_description"),
      amount: 100 * s,
      currency: n,
      panelLabel: o
    });

    var l = function l() {
      a.close(), window.removeEventListener("popstate", l);
    };

    window.addEventListener("popstate", l);
  }
}), $("a[data-integration-id][data-integration-action][data-integration-pk][data-captcha]").click(function (t) {
  var i = $(this).attr("data-captcha");
  if ("v2" == i) t.stopImmediatePropagation(), grecaptcha.getResponse() ? submitCustomForm.call(this, t) : (t.preventDefault(), $(this).parent().find(".heroik-recaptcha-error").length || $(this).before('<span class="heroik-recaptcha-error" style="color: red;">reCAPTCHA is not valid</p>'));else if ("invisible" == i && !grecaptcha.getResponse()) {
    t.stopImmediatePropagation(), t.preventDefault();
    var e = $("#" + $(this).parent().first().attr("id") + "-inv-recaptcha");
    e.length && $(e)[0].click();
  }
}), $("a[data-integration-id][data-integration-action][data-integration-pk]").click(function (t) {
  submitCustomForm.call(this, t);
}), $("a[data-integration-type][data-integration-list-id][data-captcha]").click(function (t) {
  var i = $(this).attr("data-captcha");
  if ("v2" == i) t.stopImmediatePropagation(), grecaptcha.getResponse() ? submitForm.call(this, t) : (t.preventDefault(), $(this).parent().find(".heroik-recaptcha-error").length || $(this).before('<span class="heroik-recaptcha-error" style="color: red;">reCAPTCHA is not valid</p>'));else if ("invisible" == i && !grecaptcha.getResponse()) {
    t.stopImmediatePropagation(), t.preventDefault();
    var e = "#" + $(this).parent()[0].id + "-inv-recaptcha";
    $(e).click();
  }
}), $("a[data-integration-type][data-integration-list-id]").click(function (t) {
  submitForm.call(this, t);
}), $(".newmodal-close-element, .modal-close-element").click(function () {
  var t = $(".contentWrapper")[0].style;
  t.WebkitFilter = "", t.MozFilter = "", t.OFilter = "", t.MsFilter = "", t.filter = "", $(this).closest(".modal-element").removeClass("modal-visible"), $("html").css("overflow", "auto"), $("body").css("overflow", "initial");
}), $(window).resize(function () {
  alignCenter($(".modal-visible .modal-vertical")), calculateVideoSize();
}), $('.btn-element[href^="#popup"], .image-a-wripper[href^="#popup"], .text-block-editor-p a[href^="#popup"], .target-action-tiny a[href^="#popup"], .navigation-link[href^="#popup"]').click(function (t) {
  t.preventDefault();
  var i = t.currentTarget.getAttribute("href");
  openPopup(t, i);
}), $("div [data-blog-url]").click(function (t) {
  window.location.href = $(this)[0].dataset.blogUrl;
}), $(".blog-paginator a").click(function (t) {
  blogsCount > 0 && !t.currentTarget.hasAttribute("data-disabled") && (t.preventDefault(), window.location.href = $(this).attr("href") + "&blogs_count=" + blogsCount);
}), $("a.btn-element, .text-block-editor-p a, .target-action-tiny a").click(function (t) {
  var i = !1;
  this.dataset.hideButtonIds && (i = !0, this.dataset.hideButtonIds.split(",").forEach(function (t, i, e) {
    $(t).fadeOut(500);
  }));
  this.dataset.showButtonIds && (i = !0, this.dataset.showButtonIds.split(",").forEach(function (t, i, e) {
    var a = $(t);
    a.fadeIn(500), a.removeClass("hide-section"), (a.hasClass("vertical-align-top") || a.hasClass("vertical-align-middle") || a.hasClass("vertical-align-bottom")) && a.css("display", "block");
  }));

  if (i && t.preventDefault(), location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
    var e = $(this.hash);
    if ((e = e.length ? e : $("[name=" + (this.hash.slice(1) || '""') + "]")).length) return $("html, body").animate({
      scrollTop: e.offset().top
    }, 500), !1;
  }
}), $(document).on("keyup", "input[data-integration-type]", function (t) {
  if (13 === t.keyCode) {
    var i = $(this).attr("data-integration-type"),
        e = $(this).closest(".section-class-link").find('a[data-integration-type="' + i + '"]').first();
    i && e.length > 0 && e[0].click();
  }
});

var windowClickCallback = function windowClickCallback(t) {
  var i = t.target;
  $(i).closest(".smart-section-nav__list").length || $(i).hasClass("smart-section-nav__list") || closeDropDown();
};

function updateQueryStringParameter(t, i, e) {
  var a = new RegExp("([?&])" + i + "=.*?(&|$)", "i"),
      o = -1 !== t.indexOf("?") ? "&" : "?";
  return t.match(a) ? t.replace(a, "$1" + i + "=" + e + "$2") : t + o + i + "=" + e;
}

if ($("i.mobile-menu").click(function (t) {
  var i;
  t.stopPropagation();
  var e = $(this).closest("nav")[0].id + "-ul",
      a = $("#" + e),
      o = $(this).closest(".section-class-link");

  if (o.hasClass("smart-section-nav-dropdown")) {
    i = "#" + e + "_cloned";
    var s = $(i);
    s.length && (s.toggleClass("visually-hidden"), s.hasClass("visually-hidden") ? window.removeEventListener("click", windowClickCallback) : window.addEventListener("click", windowClickCallback), s.css("top", o.outerHeight()));
  } else a.toggleClass("mobile-menu-show");

  closeDropDown(i), $(this).closest(".section-class-link").toggleClass("navigation-is-active"), $(this).closest(".navigationPage").toggleClass("navigation-is-active"), $(this).toggleClass("open");
}), $(".video-preview-image").click(function (t) {
  t.stopPropagation(), $(this).css("display", "none");
  var i = $(this).siblings()[0];
  i.src.length && i.src.includes("?") && !i.src.includes("autoplay") ? i.src = i.src + "&autoplay=1" : i.src.length && !i.src.includes("?") && (i.src = i.src + "?autoplay=1");
}), $(".swipebox").click(function () {
  var t = $(this);
  setTimeout(function () {
    var i = t.attr("data-background"),
        e = t.attr("data-opacity");
    i ? $(".mfp-bg").css("background", i) : $(".mfp-bg").css("background", "#0b0b0b"), e ? $(".mfp-bg").css("opacity", e) : $(".mfp-bg").css("opacity", .85);
  }, 1);
}), $(".featherlight-video").click(function () {
  var t = $(this);
  setTimeout(function () {
    var i = $(t).attr("data-featherlight"),
        e = $(t).attr("data-autoplay");

    if (i) {
      var a = $("iframe.featherlight-inner").first(),
          o = a.parent(),
          s = $.parseHTML(i),
          n = $(s).attr("src");
      e && ("true" === e.toLowerCase() || !0 === e ? n = updateQueryStringParameter(n, "autoplay", 1) : "false" !== e.toLowerCase() && !1 !== e || (n = updateQueryStringParameter(n, "autoplay", 0))), $(s).attr("src", n), a.remove(), o.append(s);
    }
  }, 1);
}), cookieData && "undefined" !== cookieData) {
  var cookieDataObj = JSON.parse(cookieData)[0].fields;
  cookieDataObj.consent_bar_visible && (window.cookieconsent_options = {
    message: cookieDataObj.text_to_display,
    dismiss: cookieDataObj.button_text,
    learnMore: "More info",
    link: null
  });
}

function sliderHandler(t, i) {
  var e = t.find(".row.is-active-testimonial-row"),
      a = null,
      o = null;
  if ("fade_in" == i && (a = "slide-fade-in", o = "slide-fade-out"), e.hasClass("is-active-testimonial-row-clicked")) e.removeClass("is-active-testimonial-row-clicked");else {
    if (t.find(".fake-testimonial-row").length) {
      var s = t.find(".row.is-active-testimonial-row").children().clone(!0, !0),
          n = t.find(".row.is-pre-active-testimonial-row");
      n.empty(), $(s).appendTo(n);
    }

    var r = e.prev();
    0 === r.length && (r = t.find(".row").last()), r.hasClass("is-pre-active-testimonial-row") && r.removeClass("is-pre-active-testimonial-row").removeClass(o), e.length || (e = t.find(".row").first());
    var l = e.removeClass("is-active-testimonial-row").removeClass(a).addClass("is-pre-active-testimonial-row").addClass(o).next();
    0 === l.length && (l = t.find(".row").first()), l.hasClass("is-post-active-testimonial-row") && l.removeClass("is-post-active-testimonial-row");
    var c = l.addClass("is-active-testimonial-row").addClass(a).next();

    var _i = $(l).find(".image-shape-circle img");

    if (_i.length && _i.resize(), 0 === c.length && (c = t.find(".row").first()), c.addClass("is-post-active-testimonial-row"), t.find(".slider-testimonial").length) {
      var d = t.find(".slider-testimonial span.active").removeClass("active").next();
      0 === d.length && (d = t.find("div.slider-testimonial span").first()), d.addClass("active");
    }
  }
}

function throttle(t, i) {
  void 0 === i && (i = 100);
  var e = null;
  return function () {
    if (null === e) {
      var a = this,
          o = arguments;
      e = setTimeout(function () {
        t.apply(a, o), e = null;
      }, i);
    }
  };
}

if ($(".pre-built-navigation").each(function () {
  $(this).parents(".col").first().addClass("column-navigation");
}), $(".slider-testimonial span").click(function (t) {
  var i,
      e = $(this).index(),
      a = $(this).closest(".is-testimonial-section");
  if ($(this).hasClass("active")) (i = a.find(".row")[e]).classList.add("is-active-testimonial-row-clicked");else {
    var o,
        s,
        n,
        r = a.find(".row").length - 1;

    if (0 === e ? (o = r, s = 1) : e === r ? (o = r - 1, s = 0) : (o = e - 1, s = e + 1), a.find(".fake-testimonial-row").length) {
      var l = a.find(".row.is-active-testimonial-row");
      l.length && l[0].classList.remove("is-active-testimonial-row-clicked"), sliderHandler(a), (n = a.find(".row.is-active-testimonial-row"))[0].classList.add("is-active-testimonial-row-clicked");
    } else {
      $(this).closest(".slider-testimonial").find(".active")[0].classList.remove("active"), $(this)[0].classList.add("active"), (i = a.find(".is-active-testimonial-row")).length && i[0].classList.remove("is-active-testimonial-row");
      var c = a.find(".is-pre-active-testimonial-row");
      c.length && c[0].classList.remove("is-pre-active-testimonial-row");
      var d = a.find(".is-post-active-testimonial-row");
      d.length && d[0].classList.remove("is-post-active-testimonial-row"), a.find(".row")[s].classList.add("is-post-active-testimonial-row"), a.find(".row")[o].classList.add("is-pre-active-testimonial-row"), (n = a.find(".row")[e]).classList.add("is-active-testimonial-row", "is-active-testimonial-row-clicked");

      var _t = $(n).find(".image-shape-circle img");

      _t.length && _t.resize();
    }
  }
}), $(".is-testimonial-section").length && $(".is-testimonial-section").each(function () {
  var t = $(this),
      i = this;
  $(this).find('[data-element-testimonials="is_deleted"]').each(function (t, e) {
    var a = e.closest(".row");
    a && -1 !== $(a).index() && ($(i).find(".slider-testimonial span")[$(a).index()].remove(), a.remove());
  }), 1 === $(i).find(".slider-testimonial span").length && $(i).find(".slider-testimonial span").remove();
  var e = 0,
      a = $(this).find(".row.is-active-testimonial-row").first().attr("id");
  a || (a = $(this).find(".row").first().attr("id")), $(this).find(".row").each(function (t, i) {
    $(i).addClass("is-active-testimonial-row");
    var o = $(i).find(".image-shape-circle img");
    o.length && o.resize(), $(i).find(".col").each(function (t, i) {
      e < $(i).height() + 30 && (e = $(i).height() + 30);
    }), e < $(i).height() && (e = $(i).height()), $(i).attr("id") !== a && $(i).removeClass("is-active-testimonial-row");
  }), $(this).height(e);
  var o = $(this).closest(".is-testimonial-section").find(".row").length,
      s = parseInt($(this)[0].dataset.testimonialdelay);
  s || (s = 2e3);
  var n = $(this)[0].dataset.transitiontype,
      r = $(this).closest(".is-testimonial-section.testimonial-01").find(".is-post-active-testimonial-row.is-pre-active-testimonial-row");

  if (r.length) {
    var l = r.clone();
    r.removeClass("is-pre-active-testimonial-row"), l.removeClass("is-post-active-testimonial-row").addClass("fake-testimonial-row"), $(l).insertAfter(r);
  }

  o && o > 1 && setInterval(function () {
    sliderHandler(t, n);
  }, s);
}), $('.navigation-link[href^="#"]').click(function () {
  if (this.hash && "#" != this.hash) {
    var t = $(this.hash);
    t.length && $("html, body").animate({
      scrollTop: t.offset().top
    }, 300);
  }
}), $(".stick-to-top").length) {
  var checkScroll = function checkScroll() {
    var t = $(window).scrollTop(),
        i = $(".stick-to-top"),
        e = i.height();
    i && i.length && $("body").css({
      "padding-top": e
    }), t < e && i.hasClass("fix__top") ? (i.removeClass("stick-to-top__to-bottom").removeClass("stick-to-top__to-top"), i.addClass("stick-to-top__top")) : i.removeClass("stick-to-top__top"), t > e && t < scrollLast && i.hasClass("fix__top") ? i.addClass("stick-to-top__to-top") : i.removeClass("stick-to-top__to-top"), t > e && t > scrollLast && i.hasClass("fix__bottom") ? i.addClass("stick-to-top__to-bottom") : i.removeClass("stick-to-top__to-bottom"), scrollLast = t;
  };

  var scrollLast;
  checkScroll(), $(window).on("scroll", throttle(checkScroll, 250));
}

$(window).scroll(function () {
  var t = $(".fixed-top-position");
  t.length && $(this).scrollTop() ? t.addClass("sticked-nav-after-scroll") : t.length && t.removeClass("sticked-nav-after-scroll");
}), $(".section-class-link").hover(function (t) {
  $(this).addClass("active-section-nav");
}, function (t) {
  $(this).removeClass("active-section-nav");
});
