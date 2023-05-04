var listProduct = [];


$(function(){
    loadComponent();

    setTimeout(() => {
        fetchListProduct();
    }, 200)
})

function loadComponent(){
    $("header").load("/HOME/header.html");
    $(".carousel-banner").load("/HOME/banner.html");
    $(".ProductList").load("/HOME/PRODUCT.html");
    $(".footer").load("/HOME/footer.html");
}
function fetchListProduct(){
  listProduct = [];
  if(localStorage && localStorage.getItem("listProduct")){
    var listProductLocalStorage = JSON.parse(localStorage.getItem("listProduct"));
    listProduct = listProductLocalStorage;
  }

     for (let index = 0; index < listProduct.length; index++) {
         $(".ProductList").append(
             `
             <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="text-align: left">
     <!-- Ảnh  -->
     <div class="row">
       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         <img src="/asset/${listProduct[index].image}" alt="" style="width: 160px; height: 190px" />
       </div>
     </div>
     <!-- Tên sản phẩm  -->
     <div class="row">
       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         <h3 style="font-weight: bold">${listProduct[index].name}</h3>
       </div>
     </div>
     <!-- Hãng sản xuất -->
     <div class="row">
       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         <h4>Hãng sản xuất: ${listProduct[index].manufacturer}</h4>
       </div>
     </div>
     <!-- Đánh giá  -->
     <div class="row">
       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         <ul class="rating" style="list-style: none; display: flex; font-size: 20px; padding-inline-start: 0px">
           ${showStarRating(listProduct[index].star)}
         </ul>
       </div>
     </div>
     <!-- Thêm vào giỏ hàng  -->
     <div class="row">
       <div class="col-sm-4 col-md-4 col-lg-4">
         <h4>${listProduct[index].price}</h4>
       </div>
       <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
         <button type="button" class="btn btn-default" style="border: 0px">
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
};

function showStarRating(star){
  let starRating = "";

  for (index = 0;index < star; index++){
    starRating += 
    `
    <li>
             <i class="fa fa-star selected" style="color: orange"></i>
           </li>

    `
  };

  for (index = 1;index <= 5 - star; index++){
    starRating += 
    `
    <li>
             <i class="fa fa-star"></i>
           </li>
    `
  };
  return starRating;
}
