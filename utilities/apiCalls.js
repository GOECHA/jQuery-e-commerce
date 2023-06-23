// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


$.ajax({
    url: 'https://fakestoreapi.com/products',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log('data', data)
      displayProducts(data) 
    },
    error: function(xhr, status, error) {
      alert('error', xhr, status, error);
      
    }
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



function addToCart(productId) {
  var data = { productId: productId };

  $.ajax({
    url: "#cartItems",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function(response) {
      console.log("Product added to cart successfully.");
    },
    error: function(xhr, status, error) {
      console.log("Error adding product to cart:", error);
    }
  });
}