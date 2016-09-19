// start fadeout
function preloadFunc()
    {
        $('.container').fadeOut(0);
        $('.active_picture').fadeOut(0);
    }
    window.onpaint = preloadFunc();

    // slide

    $('.slider').each(function(){
      var $this = $(this);
      var $group = $this.find('.slide-group');
      var $slides = $this.find('.slide');
      var buttonArray = [];
      var currentIndex = 0;
      var timeout;

      function move(newIndex){
        var animateTop, slideTop;

        if($group.is(':animated') || currentIndex === newIndex) {
          return;
        }

        buttonArray[currentIndex].removeClass('active');
        buttonArray[newIndex].addClass('active');

        if(newIndex > currentIndex) {
          slideTop = '100%';
          animateTop = '-100%';
        } else {
          slideTop = '-100%';
          animateTop = '100%';
        }

        $slides.eq(newIndex).css( {top: slideTop, display: 'block'});
        $group.animate( {top: animateTop} , function(){
          $slides.eq(currentIndex).css( {display: 'none'} );
          $slides.eq(newIndex).css( {top: 0} );
          $group.css( {top: 0} );
          currentIndex = newIndex;
        });

        var source = $slides.eq(newIndex).children().attr('src');
          $(window).ready(function (){
              getImageBrightness(source,function(brightness) {

              });
        });

      }

      $.each($slides, function(index){

        var $button = $('<button type="button" class="slide-btn"><div></div></button>');
        if(index === currentIndex){
          $button.addClass('active');
        }
        $button.on('click', function(){
          move(index);
        }).appendTo('.slide-buttons');
        buttonArray.push($button);
      });

    });

// loader
  ;(function(){
    function id(v){ return document.getElementById(v); }
    function loadbar() {
      var ovrl = id("overlay"),
          prog = id("progress"),
          stat = id("progstat"),
          img = document.images,
          c = 0,
          tot = img.length;

      if(tot == 0) return doneLoading();

      function imgLoaded(){
        c += 1;
        var perc = ((100/tot*c) << 0) +"%";
        prog.style.width = perc;
        stat.innerHTML = "Wczytuję "+ perc;
        if(c===tot) return doneLoading();
      }
      function doneLoading(){
        ovrl.style.opacity = 0;
        $('.container').delay(500).fadeIn(1500);
        $('.active_picture').delay(500).fadeIn(1500);

        setTimeout(function(){
          ovrl.style.display = "none";
        }, 500);
      }
      for(var i=0; i<tot; i++) {
        var tImg     = new Image();
        tImg.onload  = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src     = img[i].src;
      }
    }
    document.addEventListener('DOMContentLoaded', loadbar, false);
  }());


// color pick
function getImageBrightness(imageSrc,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";

    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

          for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness);
        if(brightness < 160){
           $("#color_opction").attr("href", "css/front.css");
        } else{
          $("#color_opction").attr("href", "css/front_black.css");
        }
        img.remove();
    }
}
var imgs = document.body.getElementsByClassName('active_picture');
var source = imgs[0];
  $(window).ready(function (){
      getImageBrightness(source,function(brightness) {

      });
});

$(document).ready(function(){
  var elements = document.getElementById('navigation').getElementsByTagName('a');
  $(elements).clone().appendTo("#menu");
  $('#menu a').css('display: none;');


	$('#nav').click(function(){
		$(this).toggleClass('open');
    if ($(window).width() > 992) {
      $(".navigation a").fadeToggle(300, 'swing');
    }
    $(".slide-buttons").fadeToggle(300, 'swing');
    $(".description").fadeToggle(300, 'swing');
    $(".slider").fadeToggle(300, 'swing');
    $('#menu').slideToggle(300, 'swing');
	});
  $('#menu').on('click', 'a',function(){
		$('#nav').toggleClass('open');
    if ($(window).width() > 992) {
      $(".navigation a").fadeToggle(300, 'swing');
    }
    $(".slide-buttons").fadeToggle(300, 'swing');
    $(".description").fadeToggle(300, 'swing');
    $(".slider").fadeToggle(300, 'swing');
    $('#menu').slideToggle(300, 'swing');
	});

});
