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

$(document).ready(function () {
  $("#rowProduct").on("click", ".add-to-cart-btn", function (e) {
    e.preventDefault();

    var productId = $(this).data("product-id");
    var productName = $(this).data("product-name");
    var productPrice = $(this).data("product-price");
console.log({productPrice})
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
        console.log('item.id', item.id)
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
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">
                ${quantityList}
              </ul>
            </div>
          </td>
          <td>
            <a class="delete-item text-center d-flex justify-content-center align-items-center" href="#" id="deleteItemButton${index}" data-index="${index}">🅇</a> 
          </td>
        </tr>`;


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Update Price with Dropdown ~~~~~~~~~~~~~~~~~~~~~~~~~~~


      
      $(document).on("click", ".dropdown-item", function () {
        const selectedProductId = $(this).data("product-id");
        const selectedProductPrice = $(this).data("product-price");
      
        console.log('selectedProductId', selectedProductId);
        console.log('selectedProductPrice', selectedProductPrice);
      
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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Delete Cart Items ~~~~~~~~~~~~~~~~~~~~~~~~~~~


    $(".delete-item").on("click", function (e) {
      e.preventDefault();
      var container = $("#container");
      var goShoppingMsg = ` <div class="d-flex justify-content-center align-items-center empty-cart-container position-relative top-0 start-0 end-0 bottom-0">
      <img
        src="./assets/seabubble.png"
        alt="seabubble Image"
        class="img-fluid empty-cart-image"
      /><h2 class="text-center pg-title-wrapper p-4 text-overlay position-absolute top-50 start-50 translate-middle text-center text-white mt-5">
      As you set forth on your shopping adventure, your cart eagerly awaits its first treasure to be added.</h2></div>
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


$(document).ready(function() {
  $("#btnPurchase").click(function(e) {
    e.preventDefault();
    purchaseItems();
  });

  function purchaseItems() {
    localStorage.removeItem("cartItems");
    $("#cartItemsContainer").empty();
    $("#cartItemsContainerTotalPrice").empty();

    $("#congratsModal").modal("show");
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Contact Form ~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(document).ready(function () {
  $("#contactForm").submit(function (event) {
    event.preventDefault();

    if (!$("#name").val() || !$("#email").val() || !$("#message").val()) {
      alert("Please fill out all the fields.");
    } else {
      // Clear the form fields
      $("#name").val("");
      $("#email").val("");
      $("#message").val("");

      // Redirect to the #submitForm section
      $("html, body").animate(
        {
          scrollTop: $("#submitForm").offset().top,
        },
        800
      );
    }
  });
});
