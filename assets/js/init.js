(function($) {

    "use strict";

    /*
    |
    | NAV FIXED ON SCROLL
    |
    */
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $(".nav-scroll").addClass("strict");
        } else {
            $(".nav-scroll").removeClass("strict");
        }
    });

    /*
    |
    | OWL CAROUSEL
    |
    */
      $('.owl-carousel').owlCarousel({
          loop: true,
          nav: true,
          autoplay: 700,
          navText: [
          "<i class='fa fa-long-arrow-left fa_black'></i>",
          "<i class='fa fa-long-arrow-right fa_black'></i>"],
          responsive:{
              0:{
                  items: 1
              },
              600:{
                  items: 1
              },
              1000:{
                  items: 1
              }
          }
      })

    $( document ).ready(function() {
    /*
    |
    | Mobile NAv trigger
    |
    */

      var trigger = $('.navbar-toggle'),
      overlay     = $('.overlay'),
      active      = false;

      $('.navbar-toggle, #navbar-nav li a, .overlay').on('click', function () {
          $('.navbar-toggle').toggleClass('active')
          $('#js-navbar-menu').toggleClass('active');
          overlay.toggleClass('active');
      });

    /*
    |
    | WOW ANIMATION
    |
    */
    	var wow = new WOW({
          mobile: false  // trigger animations on mobile devices (default is true)
      });
      wow.init();






    /*
    |
    | Onepage Nav
    |
    */

      $('#navbar-nav').onePageNav({
          currentClass: 'active',
          changeHash: false,
          scrollSpeed: 750,
          scrollThreshold: 0.5,
      });

      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });



    /*
    |
    | MAILCHIMP NEWSLETTER SUBSCRIPTION
    |
    */

      $("#mailchimp-subscribe").ajaxChimp({
          callback: mailchimpCallback,
          url: "//qanairy.us14.list-manage.com/subscribe/post?u=225a784e2ef12feaedd499cd3&amp;id=c7b83df928" // Replace your mailchimp post url inside double quote "".
      });

      function mailchimpCallback(resp) {
            var subscriptionSuccess = $('.subscription-success');
            var subscriptionFailed = $('.subscription-failed');
           if(resp.result === 'success') {
             subscriptionSuccess
                  .html('<i class="fa fa-check"></i>' + "&nbsp;" + resp.msg)
                  .delay(500)
                  .fadeIn(1000);

              subscriptionFailed.fadeOut(500);

          } else if(resp.result === 'error') {
              subscriptionFailed
                  .html('<i class="fa fa-close"></i>' + "&nbsp;" + resp.msg)
                  .delay(500)
                  .fadeIn(1000);

              subscriptionSuccess.fadeOut(500);
          }
      };

    /**
     * ====================================
     * LOCAL NEWSLETTER SUBSCRIPTION
     * ====================================
     */
      $("#local-subscribe").on('submit', function(e) {
          e.preventDefault();
          var data = {
              email: $("#subscriber-email").val()
          },
          postUrl = $(this).attr('action');

          if ( isValidEmail(data['email']) ) {
              $.ajax({
                  type: "POST",
                  url: postUrl,
                  data: data,
                  success: function() {
                      $('.subscription-success').fadeIn(1000);
                      $('.subscription-failed').fadeOut(500);
                  }
              });
          } else {
              $('.subscription-failed').fadeIn(1000);
              $('.subscription-success').fadeOut(500);
          }

          return false;
      });

    /*
    |
    | CONTACT FORM
    |
    */

      $("#contactForm").validator().on("submit", function (event) {
          if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
          } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
          }
       });

      function submitForm(){
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        $.ajax({
            type: "POST",
            url: "process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success : function(text){
                if (text == "success"){
                    formSuccess();
                  } else {
                    formError();
                    submitMSG(false,text);
                  }
              }
          });
      }
      function formSuccess(){
          $("#contactForm")[0].reset();
          submitMSG(true, "Message Sent!")
      }
  	  function formError(){
  	    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  	        $(this).removeClass();
  	    });
  	  }
      function submitMSG(valid, msg){
        if(valid){
          var msgClasses = "h3 text-center fadeInUp animated text-success";
        } else {
          var msgClasses = "h3 text-center shake animated text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
      }
    });
}(jQuery));
