// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Navigation ~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(document).ready(function () {
  $(".navbar-brand").click(function (e) {
    e.preventDefault();

    $(".page").hide();
    $("#home").show();
  });
});

$(document).ready(function () {
  $(".btn-primary").click(function (e) {
    e.preventDefault();

    $(".page").hide();
    $("#products").show();
  });
});

$(document).ready(function () {
  $("a.nav-link").on("click", function (e) {
    e.preventDefault();

    var target = $(this).attr("href");
    $(".page").hide();
    $(target).show();
  });

  $(".page").hide();
  $("#home").show();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Display Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~

function displayProducts(data) {
  var productContainer = $("#rowProduct");

  data.forEach(function (product) {
    var roundedNum = roundToTwoDecimalPlaces(product.price);

    var productHtml = `<div class="col card shadow p-3 mb-5 bg-white rounded" style="width: 13rem; height: 18rem; align-items: center">
        <img src=${product.image} class="card-img-top object-fit-contain border rounded" alt=${product.title} style="width: 80%; height: 35%;">
        <div class="card-body" style="width: 90%; height: 30%;">
          <div class="card-title-wrapper justify-content-center align-items-center">
            <p class="font-weight-bold card-title">${product.title}</p>
          </div>
          <div class="card-description-wrapper">
            <p class="card-text p-description">${product.description}</p>
          </div>
          <p class="card-text price"> $${roundedNum} </p>
          <p class="card-text price">⭑${product.rating.rate}</p>
        </div>
          <button class="btn-grad2 add-to-cart-btn" data-product-id="${product.id}" data-product-name="${product.title}" data-product-price="${product.price}" >Add to Cart</button>
      </div>`;

    productContainer.append(productHtml);
  });
}

$(document).ready(function () {
  $("#rowProduct").on("click", ".add-to-cart-btn", function (e) {
    e.preventDefault();

    var productId = $(this).data("product-id");
    var productName = $(this).data("product-name");
    var productPrice = $(this).data("product-price");

    var cartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    };

    var existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    var existingCartItem = existingCartItems.find(function (item) {
      return item.id === cartItem.id;
    });

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      existingCartItems.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    alert("Product added to cart!");
    console.log("it worked!");
    displayCartItems();
  });

 
  
  displayCartItems();

  function displayCartItems() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
console.log('cartItems', cartItems)
    var cartItemsContainer = $("#cartItemsContainer");
    var cartItemsContainerTotalPrice = $("#cartItemsContainerTotalPrice");
    
    cartItemsContainer.empty();

    cartItems.forEach(function (item, index) {

      var roundedNum = roundToTwoDecimalPlaces(item.price);
      let itemPrice = totalItemPrice(item.quantity, roundedNum);
      var itemQty = item.quantity


     function qtyNums(qty) {
      const numbers = Array.from({ length: qty }, (_, index) => index + 1);
      const listItems = numbers.map((number) => `<li className="dropNum"><a class="dropdown-item" id="${number}" href="#">${number}</a></li>`);
      return listItems;
    }

   
     const quantityList = qtyNums(itemQty)
    

    
      var cartItemHtml = `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${item.name}</td>
          <td>$${roundedNum}</td>
          

          <td>
           
          <div class="dropdown">
          <button
             class="btn btn-secondary dropdown-toggle"
             type="button"
             id="dropdownMenuButton1"
             data-bs-toggle="dropdown"
             aria-expanded="false"
          >
          ${itemQty}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
         ${quantityList}
          </ul>
       </div>
          </div>
          </td>
          <td> $${itemPrice}</td>
          <td>
          <a class="delete-item text-center d-flex justify-content-center align-items-center" href="#" id="deleteItemButton${index}" data-index="${index}">🅇</a> 
          </td>
        </tr>`;


    var dropDownQty = $("#dropdownMenuButton1");

    console.log('quantityList', quantityList)

    $("<li>").on("change", function() {
     // Get the selected value
     var value = $(this).val();
   
     // Update the qty
     $("#dropdownMenuButton1").text(value);
   });


      cartItemsContainer.append(cartItemHtml);
      // dropDownQty.append();
    
    });


    cartItemsContainerTotalPrice.empty();

    let totalPrice = cartItems.reduce((total, item) =>  total += (item.price * item.quantity), 0)


    var cartTotalPriceItemHtml = `$${roundToTwoDecimalPlaces(totalPrice)}`
    
    
     cartItemsContainerTotalPrice.append(cartTotalPriceItemHtml);

   
    $(".delete-item").on("click", function (e) {
      e.preventDefault();
      var container = $("#container")
      var goShoppingMsg = 
      `<h2 class="text-center pg-title-wrapper p-4 text-overlay position-absolute top-50 start-50 translate-middle text-center text-white">
      As you set forth on your shopping adventure, your cart eagerly awaits its first treasure to be added.</h2>
      `
      
      
      
      var index = $(this).data("index");
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      $("#cartItemsContainerTotalPrice").empty();  
      if (cartItems.length === 0) {
        container.empty().append(goShoppingMsg);
      } else {
        displayCartItems();
      }
    });

  }
 
});




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Helper Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~

function roundToTwoDecimalPlaces(number) {
  return number.toFixed(2);
}

function totalItemPrice(qty, price){
  return qty * price;
}

function subtractItemPrice(totalPrice, qty, price){
return totalPrice - totalItemPrice(qty, price);
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Error Handling ~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(document).ready(function () {
  $("#contactForm").submit(function (event) {
    if (!$("#name").val() || !$("#email").val() || !$("#message").val()) {
      event.preventDefault();
      alert("Please fill out all the fields.");
    } else {
      window.location.href = "#submitForm.html";
    }
  });
});
