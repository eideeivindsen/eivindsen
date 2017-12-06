// // Change style of navbar on scroll
// window.onscroll = function() {myFunction()};
// function myFunction() {
//     var navbar = document.getElementById("myNavbar");
//     if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//         navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
//     } else {
//         navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
//     }
// }

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Scrolling down from landing-page
$(".scroll-down").click(function() {
    $('html,body').animate({
        scrollTop: $("#about").offset().top},
        'slow');
});

// Scrolling down from landing-page
$(".scroll-up").click(function() {
    $('html,body').animate({
        scrollTop: $("#home").offset().top},
        'slow');
});


// Import and processing from treehouse// edit username here
$.ajax('https://teamtreehouse.com/joachimeivindsen.json')
  .done(function(data) {
 // pull was a success
  var items = [];
  $.each( data, function( key, val ) {
    if (key.toLowerCase() === 'points') {
      $.each(val, function( key2, val2 ) {
        if (val2 !== 0) {
          if (key2.toLowerCase() !== 'total') {
            items.push([key2,val2]);
          } else {
            $('strong.total').text(val2);
          }
        }
      });
    }
  });

  // sort
  var sorted = [];
  if (items.length === 0) {
    sorted = items;
  } else {
    sorted = [items.shift()];
  }

  while (items.length > 0) {
    for (i = 0; i < sorted.length; i++) {
      if (items[0][1] > sorted[i][1]) {
        sorted.splice(i,0,items.shift());
        break;
      }
      if (i === sorted.length-1) {
        sorted.push(items.shift());
        break;
      }
    }
  }
  // make into html
  html = [];
  max = sorted[0][1];
  html.push("<div>");
  for (s in sorted) {
    value = Math.round((sorted[s][1]/max) * 100);
    html.push('<p class="w3-narrow w3-left-align w3-margin-0">' + sorted[s][0] + '</p>');
    html.push('<div class="w3-light-grey w3-margin-bottom">');
    html.push('<div class="w3-container w3-padding-small w3-center w3-khaki" style="width:' + value.toString() + '%">' + sorted[s][1] + '</div>');
    html.push("</div>");
  }
  html.push("</div>");

  // make legend
  $('.legend').append(html.join(""));
  })
  .fail(function() {
    $('.team-treehouse > a > h2').text("Could not connect. Username my be incorrect.");
  })
