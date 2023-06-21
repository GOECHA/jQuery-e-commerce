//$(selector).action() jQuery function formatting


// $(function() {
//   // Get the favicon URL
//   var faviconUrl = '/favicon.ico';

//   // Add the favicon to the document head
//   $('head').append('<link rel="shortcut icon" href="' + faviconUrl + '">');
// });



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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Display Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~

function displayProducts(data) {
  var productContainer = $('#mainProductWrapper');

  data.forEach(function(product) {
    console.log('product', product);
    var productHtml = '<div class="product">' +
      '<div class="row">' +
      '<div class="col-lg-4 col-md-6 col-sm-12">' +
      '<img class="img-fluid" src="' + product.image + '" alt="' + product.name + '">' +
      '<h3>' + product.title + '</h3>' +
      '<p>' + product.description + '</p>' +
      '</div>' +
      '</div>' +
      '</div>';

    productContainer.append(productHtml);
  });
}


