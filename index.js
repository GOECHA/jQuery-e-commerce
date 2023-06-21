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
  var productContainer = $('#rowProduct');

  data.forEach(function(product) {
    console.log('product', product);
    var productHtml = 
    // `<div class="col productItem">
    `<div class="col card" style="width: 13rem; height:18rem; align-items: center">
    <img src=${product.image} class="card-img-top object-fit-contain border rounded" alt=${product.title} style="width: 80%; height: 35%;>
    <div class="card-body" style="width: 90%; height: 30%;">
      <div class="card-title-wrapper">
      <p class="card-title">${product.title}</p>
      </div>
      <p class="card-text">${product.description}</p>
      <p class="card-text price"> $${product.price}</p>
      <p class="card-text price">  ${product.rating.rate}⭑</p>
      <p class="card-text price">  ${product.category}</p>
      <div class="card-footer">
      <a href="#cart" class="btn btn-cart">Add to Cart</a>
      </div>
     
    </div>
    </div>`
  // </div>`
    productContainer.append(productHtml);
  });
}


