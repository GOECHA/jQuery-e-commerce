//$(selector).action() jQuery function formatting


// $(function() {
//   // Get the favicon URL
//   var faviconUrl = '/favicon.ico';

//   // Add the favicon to the document head
//   $('head').append('<link rel="shortcut icon" href="' + faviconUrl + '">');
// });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$.ajax({
  url: 'https://fakestoreapi.com/products',
  method: 'GET',
  success: function(data) {
    console.log('data', data)
  },
  error: function(error) {
    alert(error);
  }
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Navigation ~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(document).ready(function(){
    
  $(".navbar-brand").click(function(e){
      e.preventDefault();
      
      $('.page').hide(); 
      $('#home').show(); 
  });
});

$(document).ready(function(){
    
    $(".btn-primary").click(function(e){
        e.preventDefault();
        
        $('.page').hide(); 
        $('#products').show(); 
    });
});



$(document).ready(function() {
  $('a.nav-link').on('click', function(e) {
    e.preventDefault(); 

    var target = $(this).attr('href'); 
    $('.page').hide(); 
    $(target).show(); 
  });

  $('.page').hide();
  $('#home').show();

});
