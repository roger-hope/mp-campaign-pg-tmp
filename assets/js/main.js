(function ($) {
  "use strict";

  // Get Device width
  let device_width = window.innerWidth;

  /////////////////////////////////////////////////////
  // 00. Preloader
  $(document).ready(function () {
    $(".preloader").hide();
  });

  /////////////////////////////////////////////////////
  // 03. Scroll Top
  let scroll_top = document.getElementById("scroll_top");
  if (scroll_top) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        scroll_top.style.display = "block";
      } else {
        scroll_top.style.display = "none";
      }
    };

    scroll_top.addEventListener("click", function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }

  /////////////////////////////////////////////////////

  // 18. Button Hover Animation
  $(".btn-hover").on("mouseenter", function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;

    $(this).find("span").css({
      top: y,
      left: x,
    });
  });

  $(".btn-hover").on("mouseout", function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;

    $(this).find("span").css({
      top: y,
      left: x,
    });
  });

  /////////////////////////////////////////////////////
  // 19. Button Move Animation
  const all_btns = gsap.utils.toArray(".btn_wrapper");
  if (all_btns.length > 0) {
    var all_btn = gsap.utils.toArray(".btn_wrapper");
  } else {
    var all_btn = gsap.utils.toArray("#btn_wrapper");
  }
  const all_btn_cirlce = gsap.utils.toArray(".btn-item");
  all_btn.forEach((btn, i) => {
    $(btn).mousemove(function (e) {
      callParallax(e);
    });
    function callParallax(e) {
      parallaxIt(e, all_btn_cirlce[i], 80);
    }

    function parallaxIt(e, target, movement) {
      var $this = $(btn);
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      gsap.to(target, 0.5, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
        ease: Power2.easeOut,
      });
    }
    $(btn).mouseleave(function (e) {
      gsap.to(all_btn_cirlce[i], 0.5, {
        x: 0,
        y: 0,
        ease: Power2.easeOut,
      });
    });
  });

  /////////////////////////////////////////////////////
  // 20. Register GSAP
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);
  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////
  // 21. Config GSAP
  gsap.config({
    nullTargetWarn: false,
  });

  /////////////////////////////////////////////////////
  // 22. Service 6
  if (device_width > 1200) {
    gsap.to(".service__list-6", {
      scrollTrigger: {
        trigger: ".service__area-6",
        pin: ".service__list-6",
        pinSpacing: true,
        start: "top top",
        end: "bottom bottom",
      },
    });

    gsap.to(".service__image-wrap", {
      scrollTrigger: {
        trigger: ".service__area-6",
        pin: ".mid-content",
        pinSpacing: true,
        start: "top top",
        end: "bottom bottom",
        markers: false,
      },
    });

    let service_images = gsap.utils.toArray(".service__image");
    let service_imagess = gsap.utils.toArray(".service__image img");
    let service_items = gsap.utils.toArray(".service__item-6");

    if (service_items) {
      service_items.forEach((image, i) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: image,
            scrub: 1,
            start: "top top-=600",
            markers: false,
          },
        });
        tl.to(service_images[i], {
          zIndex: "1",
        });
        tl.to(
          service_imagess[i],
          {
            opacity: 0,
            duration: 1,
            scale: 1.2,
            ease: "power4.out",
          },
          "-=1"
        );
      });
    }

    let navItems = gsap.utils.toArray(".service__list-6 li a");
    if (navItems) {
      navItems.forEach((nav) => {
        nav.addEventListener("click", (e) => {
          e.preventDefault();
          const ids = nav.getAttribute("href");
          gsap.to(window, { duration: 0.5, scrollTo: ids, ease: "power4.out" });
        });
      });
    }
  }

  /////////////////////////////////////////////////////
  // CTA: Animation used when text appears | https://greensock.com/docs/v3/GSAP/Timeline

  if (device_width > 100) {
    let splitTitleLines = gsap.utils.toArray(".title-anim");

    splitTitleLines.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        },
      });

      const itemSplitted = new SplitText(splitTextLine, {
        type: "words, lines",
      });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: "lines" });
      tl.from(itemSplitted.lines, {
        duration: 1,
        delay: 0.3,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    });
  }
  /////////////////////////////////////////////////////
  // BUTTONS: Target all buttons to animate when scrolled into view | https://greensock.com/docs/v3/Plugins/ScrollTrigger

  let arr1 = gsap.utils.toArray("#btn_wrapper");
  let arr2 = gsap.utils.toArray(".btn_wrapper");
  const all_buttons = arr1.concat(arr2);

  all_buttons.forEach((btn) => {
    if (!btn.classList.contains("hero__button")) {
      gsap.from(btn, {
        scrollTrigger: {
          trigger: btn,
          start: "top center+=150",
          markers: false,
        },
        opacity: 0,
        y: -70,
        ease: "bounce",
        duration: 1.5,
      });
    }
  });

  /////////////////////////////////////////////////////

  // ANIMATION: HERO BLOCK

  /////////////////////////////////////////////////////
  //  Service Section Animation
  let animation__service_page = gsap.utils.toArray(".animation__service_page");
  if (animation__service_page) {
    animation__service_page.forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top center+=20%",
          markers: false,
        },
        opacity: 0,
        x: -50,
        ease: "power2.out",
        duration: 2,
      });
    });
  }

  // Home One Hero Animation
  let HomeHero = gsap.timeline();

  // Animation: Character appears gradually
  let mark = document.querySelector(".hero__area-3 .title-left");
  let eting = document.querySelector(".hero__area-3 .title-right");
  let hero__text_animation = document.querySelector(".hero__text-animation");

  let split_creatives = new SplitText(mark, { type: "chars" });
  let split_solutions = new SplitText(eting, { type: "chars" });
  let split_text_animation = new SplitText(hero__text_animation, {
    type: "chars words",
  });

  HomeHero.from(split_creatives.chars, {
    duration: 2,
    x: 100,
    autoAlpha: 0,
    stagger: 0.2,
  });
  HomeHero.from(
    split_solutions.chars,
    { duration: 1, x: 100, autoAlpha: 0, stagger: 0.1 },
    "-=1"
  );
  HomeHero.from(
    split_text_animation.words,
    { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
    "-=1"
  );

  /////////////////////////////////////////////////////
})(jQuery);
