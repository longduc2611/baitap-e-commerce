var listProduct = [];


$(function () {
  loadComponent();

  setTimeout(() => {
    loadProductList();
    fetchListUserCard();
    cartTotal();
  }, 200)

})

function loadComponent() {
  $("header").load("/HOME/header.html");
  $(".carousel-banner").load("/HOME/banner.html");
  $(".ProductList").load("/HOME/PRODUCT.html");
  $(".footer").load("/HOME/footer.html");
}
// function fetchListProduct(){
//   listProduct = [];
//   if(localStorage && localStorage.getItem("listProduct")){
//     var listProductLocalStorage = JSON.parse(localStorage.getItem("listProduct"));
//     listProduct = listProductLocalStorage;
//   }

//      for (let index = 0; index < listProduct.length; index++) {
//          $(".ProductList").append(
//              `
//              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="text-align: left">
//      <!-- Ảnh  -->
//      <div class="row">
//        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
//          <img src="/asset/${listProduct[index].image}" alt="" style="width: 160px; height: 190px" />
//        </div>
//      </div>
//      <!-- Tên sản phẩm  -->
//      <div class="row">
//        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
//          <h3 style="font-weight: bold">${listProduct[index].name}</h3>
//        </div>
//      </div>
//      <!-- Hãng sản xuất -->
//      <div class="row">
//        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
//          <h4>Hãng sản xuất: ${listProduct[index].manufacturer}</h4>
//        </div>
//      </div>
//      <!-- Đánh giá  -->
//      <div class="row">
//        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
//          <ul class="rating" style="list-style: none; display: flex; font-size: 20px; padding-inline-start: 0px">
//            ${showStarRating(listProduct[index].star)}
//          </ul>
//        </div>
//      </div>
//      <!-- Thêm vào giỏ hàng  -->
//      <div class="row">
//        <div class="col-sm-4 col-md-4 col-lg-4">
//          <h4>${listProduct[index].price}</h4>
//        </div>
//        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
//          <button onclick="handleAddtoCart()" type="button" class="btn btn-default btnaddcart" style="border: 0px">
//            <i class="fa fa-shopping-cart" style="color: red; font-size: 35px"></i>
//          </button>
//        </div>
//      </div>
//      <br />
//      <br />
//      <br />
//    </div>
//              `
//          )

//      };
// };

function loadProductList() {
  $.ajax({
    type: "GET",
    url: "https://645644852e41ccf169183062.mockapi.io/product",
    success: function (response,) {
      listProduct = response;
      // console.log(listProduct)

      for (let index = 0; index < listProduct.length; index++) {
        $(".ProductList").append(
          `
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="text-align: left">
    <!-- Ảnh  -->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <img src="/asset/Asset/Product/${listProduct[index].imageName}" alt="" style="width: 160px; height: 190px" />
      </div>
    </div>
    <!-- Tên sản phẩm  -->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <h3 class="productName" style="font-weight: bold">${listProduct[index].name}</h3>
      </div>
    </div>
    <!-- Hãng sản xuất -->

    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <h4>Hãng sản xuất: ${listProduct[index].manufacturerId}</h4>
      </div>
    </div>
    <!-- Đánh giá  -->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <ul class="rating" style="list-style: none; display: flex; font-size: 20px; padding-inline-start: 0px">
          ${showStarRating(listProduct[index].ratingStar)}
        </ul>
      </div>
    </div>
    <!-- Thêm vào giỏ hàng  -->
    <div class="row">
      <div class="col-sm-4 col-md-4 col-lg-4">
        <h4 class="productPrice" ><span>${listProduct[index].price}</span>đ</h4>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <button id="btnaddcart" onclick="handleAddCart(event)" type="button" class="btn btn-default" style="border: 0px">
          <i class="fa fa-shopping-cart" style="color: red; font-size: 35px"></i>
        </button>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
            `
        )

      };
    }
  });
};


userCart = [];
function handleAddCart(event) {
  var btnItem = event.target;
  var product = btnItem.parentElement.parentElement.parentElement.parentElement
  console.log(product)
  productImage = product.querySelector("img").src;
  productName = product.querySelector(".productName").innerText;
  productPrice = product.querySelector(".productPrice span").innerText;

  // console.log(productName);
  // console.log(productImage);
  productImageArray = productImage.split("/");
  productImageName = productImageArray[productImageArray.length - 1];
  // console.log(productPrice);
  pricestring = productPrice.split(".").join("")
  // console.log(pricestring);
   priceNumber = Number(pricestring);
  // console.log("pricenumber = ", priceNumber)
  // console.log(typeof productPrice)

  newProductCart = {
    name: productName,
    imageName: productImageName,
    price: priceNumber,
  };
  userCart.push(newProductCart);
  localStorage.setItem("userCart", JSON.stringify(userCart));
  fetchListUserCard();
  cartTotal()
};


function fetchListUserCard() {
  userCart = [];
  if (localStorage && localStorage.getItem("userCart")) {
    var listUserCart = JSON.parse(localStorage.getItem("userCart"));
    userCart = listUserCart;
  };
  $("#tbodyProductCart").empty();
  for (let index = 0; index < userCart.length; index++) {
    $("#tbodyProductCart").append(`
    <tr>
                  <td class="w-25">
                    <img src="/asset/Asset/Product/${userCart[index].imageName}" class="img-fluid img-thumbnail" alt="Sheep">
                  </td>
                  <td>${userCart[index].name}</td>
                  <td>${userCart[index].price.toLocaleString("de-DE")}đ</td>
                  <td class="qty"><input type="text" class="form-control" id="input1" value="1" disabled ></td>
                  <td class="price-cartitem"> <span>${userCart[index].price.toLocaleString("de-DE")}đ</span></td>
                  <td>
                    <a href="#" class="btn btn-danger btn-sm">
                      <i class="fa fa-times"></i>
                    </a>
                  </td>
                </tr>
    `);
  }
};

function cartTotal() {
  var pricecartitem = document.querySelectorAll(".price-cartitem");
  var input = document.querySelectorAll(".qty");

  var totalC = 0
  for (let index = 0; index < pricecartitem.length; index++) {
    let productcartprice = pricecartitem[index].querySelector("span").innerText;
    let inputvalue = input[index].querySelector("input").value;

    let stringpricecart = productcartprice.split(".").join("");
    stringpricecart = stringpricecart.split("đ").join("")
    console.log(stringpricecart);
    let numberpricecart = Number(stringpricecart);
    let inputNumber = Number(inputvalue);

    console.log(productcartprice);
    console.log(inputvalue);
    
    console.log(inputNumber);
    totalA = numberpricecart*inputNumber
    console.log(totalA);
    totalC = totalC + totalA;
    console.log(totalC)
  }
  var spantotalprice = document.querySelector(".price")
  console.log(spantotalprice)
  spantotalprice.innerText = totalC.toLocaleString('de-De');

}



function showStarRating(star) {
  let starRating = "";

  for (index = 0; index < star; index++) {
    starRating +=
      `
    <li>
             <i class="fa fa-star selected" style="color: orange"></i>
           </li>

    `
  };

  for (index = 1; index <= 5 - star; index++) {
    starRating +=
      `
    <li>
             <i class="fa fa-star"></i>
           </li>
    `
  };
  return starRating;
}
