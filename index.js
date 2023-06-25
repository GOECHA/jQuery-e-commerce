// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Navigation ~~~~~~~~~~~~~~~~~~~~~~~~~~~



$(function () {
  $(document).on("click", ".navbar-brand", function (e) {
    e.preventDefault();

    $(".page").hide();
    $("#home").show();
  });
});

$(function () {
  $(document).on("click", ".btn-primary", function (e) {
    e.preventDefault();

    $(".page").hide();
    $("#products").show();
  });
});

$(function () {
  $("a.nav-link").on("click", function (e) {
    e.preventDefault();

    var target = $(this).attr("href");
    $(".page").hide();
    $(target).show();
  });

  $(".page").hide();
  $("#home").show();
});



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Helper Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~

function roundToTwoDecimalPlaces(number) {
  return number.toFixed(2);
}

function totalItemPrice(qty, price) {
  return qty * price;
}

function subtractItemPrice(totalPrice, qty, price) {
  return totalPrice - totalItemPrice(qty, price);
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Display Products ~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
          <p class="card-text price" id="cardRating">⭑${product.rating.rate}</p>
        </div>
          <button class="btn-grad2 add-to-cart-btn" data-product-id="${product.id}" data-product-name="${product.title}" data-product-price="${product.price}" >Add to Cart</button>
      </div>`;

    productContainer.append(productHtml);
  });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$("#searchByName").on("input", function () {
  var searchTerm = $(this).val().toLowerCase();
  var cards = $(".card");

  cards.each(function () {
    var title = $(this).find(".card-title").text().toLowerCase();

    if (title.includes(searchTerm)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
});

$("#btnSort").click(function () {
  var cards = $(".card");

  var titles = cards
    .map(function () {
      return $(this).find(".card-title").text();
    })
    .get();

  titles.sort();

  var productContainer = $("#rowProduct");
  productContainer.empty();

  titles.forEach(function (title) {
    var card = cards.filter(function () {
      return $(this).find(".card-title").text() === title;
    });

    productContainer.append(card);
  });
});

$("#btnRating").click(function () {
  var cards = $(".card");

  var ratings = cards
    .map(function () {
      return parseFloat($(this).find("#cardRating").text().substring(1));
    })
    .get();

  ratings.sort(function (a, b) {
    return b - a;
  });

  var productContainer = $("#rowProduct");
  productContainer.empty();

  ratings.forEach(function (rating) {
    var card = cards.filter(function () {
      return (
        parseFloat($(this).find("#cardRating").text().substring(1)) === rating
      );
    });
    productContainer.append(card);
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Display Cart Items ~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(function () {
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
    console.log("cartItems", cartItems);
    var cartItemsContainer = $("#cartItemsContainer");
    var cartItemsContainerTotalPrice = $("#cartItemsContainerTotalPrice");

    cartItemsContainer.empty();

    cartItems.forEach(function (item, index) {
      var roundedNum = roundToTwoDecimalPlaces(item.price);
      let itemPrice = totalItemPrice(item.quantity, roundedNum);
      var itemQty = item.quantity;


      function qtyNums(qty) {
        const numbers = Array.from({ length: qty }, (_, index) => index + 1);
        const listItems = numbers.map(
          (number) =>
            `<a class="dropdown-item" data-product-id="${item.id}" data-product-price="${roundedNum}" href="#">${number}</a>`
        );
    
        return listItems;
      }
      
      const quantityList = qtyNums(itemQty);
      console.log("quantityList", quantityList);
      var cartItemHtml = `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${item.name}</td>
          <td class="single-itm-price" data-product-id="${item.id}" data-product-price="${roundedNum}">$${roundedNum}</td>
          <td class="total-qty-price" id="totalQtyPrice${index}">$${itemPrice.toFixed(2)}</td>
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
              <ul class="dropdown-menu" data-product-id="${item.id}" aria-labelledby="dropdownMenuButton${index}">
                ${quantityList}
              </ul>
            </div>
          </td>
          <td>
          <button class="increase-itm-btn" id="increaseItmBtn" data-product-id="${item.id}">⬆</button>
          <button class="decrease-itm-btn" id="decreaseItmBtn" data-product-id="${item.id}">⬇</button>
          </td>
          <td>
            <a class="delete-item text-center d-flex justify-content-center align-items-center" href="#" id="deleteItemButton${index}" data-index="${index}">🅇</a> 
          </td>
        </tr>`;
        


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Update Price with Dropdown ~~~~~~~~~~~~~~~~~~~~~~~~~~~


      
      $(document).on("click", ".dropdown-item", function () {
        const selectedProductId = $(this).data("product-id");
        const selectedProductPrice = $(this).data("product-price");
      
      
        const selectedItemQty = parseFloat($(this).text()) || 0;
      
        let selectedCartItem = cartItems.find((item) => item.id === selectedProductId);
      
        if (selectedCartItem) {
          selectedCartItem.quantity = selectedItemQty;
          selectedCartItem.totalPrice = (selectedItemQty * selectedCartItem.price).toFixed(2);
        }
      
        var dropdownMenu = $(this).closest(".dropdown").find(".dropdown-toggle");
        dropdownMenu.text(selectedItemQty);
      
        var rowIndex = $(this).closest("tr").index(); 
        var newTotalPrice = (selectedCartItem.price * selectedItemQty).toFixed(2);
        $("#totalQtyPrice").text(newTotalPrice);
      
        $("#totalQtyPrice" + rowIndex).text("$" + newTotalPrice); 


        localStorage.setItem("selectedQuantity", selectedItemQty.toString());
      });
      


      cartItemsContainer.append(cartItemHtml);
  
    });

    cartItemsContainerTotalPrice.empty();

    let totalPrice = cartItems.reduce(
      (total, item) => (total += item.price * item.quantity),
      0
    );

    var cartTotalPriceItemHtml = `$${roundToTwoDecimalPlaces(totalPrice)}`;

    cartItemsContainerTotalPrice.append(cartTotalPriceItemHtml);



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Increase || Decrease Cart Items ~~~~~~~~~~~~~~~~~~~~~~~~~~~
function increaseQuantity(productId) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var cartItem = cartItems.find(function (item) {
    return item.id === productId;
  });

  if (cartItem) {
    cartItem.quantity++;
    cartItem.totalPrice = (cartItem.quantity * cartItem.price).toFixed(2);
    updateCartItem(cartItem);
  }
}

function decreaseQuantity(productId) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var cartItem = cartItems.find(function (item) {
    return item.id === productId;
  });

  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      cartItem.totalPrice = (cartItem.quantity * cartItem.price).toFixed(2);
      updateCartItem(cartItem);
    } else {
      removeCartItem(productId);
    }
  }
}


function updateCartItem(cartItem) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var existingCartItemIndex = cartItems.findIndex(function (item) {
    return item.id === cartItem.id;
  });

  if (existingCartItemIndex !== -1) {
    cartItems[existingCartItemIndex] = cartItem;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    displayCartItems();
  }
}

function removeCartItem(productId) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var updatedCartItems = cartItems.filter(function (item) {
    return item.id !== productId;
  });

  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  displayCartItems();
}

$(document).off("click", ".increase-itm-btn").on("click", ".increase-itm-btn", function() {
  var productId = $(this).data("product-id");
  increaseQuantity(productId);
});

$(document).off("click", ".decrease-itm-btn").on("click", ".decrease-itm-btn", function() {
  var productId = $(this).data("product-id");
  decreaseQuantity(productId);
});



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Delete Cart Items ~~~~~~~~~~~~~~~~~~~~~~~~~~~


    $(".delete-item").on("click", function (e) {
      e.preventDefault();
      var container = $("#container");
      var goShoppingMsg = ` <div class="d-flex flex-column justify-content-center align-items-center empty-cart-container position-relative top-0 start-0 end-0 bottom-0">
      <img
        src="./assets/seabubble.png"
        alt="seabubble Image"
        class="img-fluid shadow empty-cart-image"
      /><h2 class="text-center pg-title-wrapper p-4 text-overlay position-absolute text-white cart-empty-msg">
      As you set forth on your shopping adventure, your cart eagerly awaits its first treasure to be added.</h2>
      <a class="nav-link btn btn-grad position-absolute empty-cart-explore-btn" href="#products"> Explore </a>
      </div>
      `;

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Submit Cart Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~


$(function() {
  $(document).on("click", "#btnPurchase", function(e) {
    e.preventDefault();
    purchaseItems();
  });


  function purchaseItems() {
    localStorage.removeItem("cartItems");
    $("#cartItemsContainer").empty();
    $("#cartItemsContainerTotalPrice").empty();

    $("#congratsModal").modal("show");
  }
  $(document).on("click", "#congratsModal .close", function() {
    $("#congratsModal").modal("hide");
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Contact Form ~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(function () {
  $(document).on("#contactForm", function (event) {
    event.preventDefault();

    if (!$("#name").val() || !$("#email").val() || !$("#message").val()) {
      alert("Please fill out all the fields.");
    } else {
      $("#name").val("");
      $("#email").val("");
      $("#message").val("");
    }
  });
});
