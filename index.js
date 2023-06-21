//$(selector).action()

$(document).ready(function(){
    
    $(".btn").click(function(e){
        e.preventDefault();
        $("form").hide();
    });
});

// $('form').submit(function(e) {
//     e.preventDefault();
//   });


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