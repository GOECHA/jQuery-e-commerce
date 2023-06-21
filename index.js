
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
    `<div class="col card shadow p-3 mb-5 bg-white rounded" style="width: 13rem; height:18rem; align-items: center">
    <img src=${product.image} class="card-img-top object-fit-contain border rounded" alt=${product.title} style="width: 80%; height: 35%;>
    <div class="card-body" style="width: 90%; height: 30%;">
      <div class="card-title-wrapper">
      <p class="card-title">${product.title}</p>
      </div>
      <p class="card-text p-description">${product.description}</p>
     
      <p class="card-text price"> $${product.price} </p>
      <p class="card-text price ⭑${product.rating.rate}</p
      
      <div class="card-footer">
        <small class="text-body-secondary">Add to Cart</small>
      </div>
     
    </div>
    </div>`
  // </div>`
    productContainer.append(productHtml);
  });
}


