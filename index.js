
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


    var roundedNum = roundToTwoDecimalPlaces(product.price);
    
    
    var productHtml = 
    // `<div class="col productItem">
    `<div class="col card shadow p-3 mb-5 bg-white rounded" style="width: 13rem; height:18rem; align-items: center">
    <img src=${product.image} class="card-img-top object-fit-contain border rounded" alt=${product.title} style="width: 80%; height: 35%;>
    <div class="card-body" style="width: 90%; height: 30%;">
      <div class="card-title-wrapper justify-content-center align-items-center">
      <p class="font-weight-bold card-title">${product.title}</p>
      </div>
      <div class="card-description-wrapper">
      <p class="card-text p-description">${product.description}</p>
      </div>
      <p class="card-text price"> $${roundedNum} </p>
      <p class="card-text price ⭑${product.rating.rate}</p
    </div>
    </div>`
  // </div>`
    productContainer.append(productHtml);
  });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Helper Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~

function roundToTwoDecimalPlaces(number) {
  return number.toFixed(2);
}