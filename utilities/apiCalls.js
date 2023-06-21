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

  
