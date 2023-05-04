function handleShowProduct() {

    $(".category").load("/handledanhmuc/ProductAdmin.html");

    setTimeout(() => {
        fetchListProductAdmin();
    }, 200)



}
function handleShowCategory() {
    $(".category").load("/handledanhmuc/Category.html");
}
function handleShowManufacturer() {
    $(".category").load("/handledanhmuc/Manufacturer.html");
}
function handleShowAccount() {
    $(".category").load("/handledanhmuc/Account.html");
}
listProduct = [];
var idProductUpdate = "";
function handleCreateNewProduct() {

    v_Id = document.getElementById("Id").value;
    v_Name = document.getElementById("Name").value;
    v_Price = document.getElementById("Price").value;
    v_Info = document.getElementById("Info").value;
    v_Detail = document.getElementById("Detail").value;
    v_Star = document.getElementById("Star").value;
    // v_Image = getImageName($("#Image").val());
    v_Manufacturer = document.getElementById("Manufacturer").value;
    v_Category = document.getElementById("Category").value;

    v_Image = document.getElementById("Image").value;
    // console.log("v_Image value = ", v_Image)
    imageArray = v_Image.split("\\")
    // console.log("imageArray = v_Image.split()", imageArray)
    imageName = imageArray[imageArray.length - 1];
    // console.log("imageName = imageArray[imageArray.length -1];", imageName)
    productNew = {
        id: v_Id,
        name: v_Name,
        price: v_Price,
        info: v_Info,
        detail: v_Detail,
        star: v_Star,
        image: imageName,
        manufacturer: v_Manufacturer,
        category: v_Category
    }
    listProduct.push(productNew);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    handleResetForm();
    fetchListProductAdmin();


};
function fetchListProductAdmin() {
    listProduct = [];

    if (localStorage && localStorage.getItem("listProduct")) {
        var listProductLocalStorage = JSON.parse(localStorage.getItem("listProduct"));
        listProduct = listProductLocalStorage;
        console.log("listProduct = ", listProduct)
    }
    // Xóa bảng dữ liệu hiện tại
    $("#tbodyProductAdmin").empty();
    // Dùng vòng lặp for để tạo product

    for (let index = 0; index < listProduct.length; index++) {
        $("#tbodyProductAdmin").append(
            `
        <tr>
      <td>${listProduct[index].id}</td>
      <td>${listProduct[index].name}</td>
      <td>${listProduct[index].price}</td>
      <td>${listProduct[index].info}</td>
      <td>${listProduct[index].detail}</td>
      <td>${listProduct[index].star}</td>
      <td>${listProduct[index].image}</td>
      <td>${listProduct[index].manufacturer}</td>
      <td>${listProduct[index].category}</td>
      <td>
        <button type="button" class="btn btn-warning" onclick ="handleEdit(${listProduct[index].id})" >Edit</button>
      </td>
      <td>
        <button type="button" class="btn btn-danger" onclick="handleDelete(${listProduct[index].id})" >Delete</button>
      </td>
  </tr>
         `
        );
    };
};
function handleResetForm() {
    $("#Id").val("");
    $("#Name").val("");
    $("#Price").val("");
    $("#Info").val("");
    $("#Detail").val("");
    $("#Star").val("");
    $("#Image").val("");
    $("#Manufacturer").val("");
    $("#Category").val("");
};

function getImageName(pathImage) {
    var itemArray = pathImage.split("\\");
    var ImageName = itemArray[itemArray.length - 1];
    return ImageName;
}

function handleDelete(idDelete) {
    var confirmDelete = confirm("Bạn có chắc chắn muốn xóa bỏ sản phẩm này")
    if (confirmDelete) {
        var indexProductDelete = listProduct.findIndex((product) => product.id == idDelete);
        if (indexProductDelete !== -1) {
            listProduct.splice(indexProductDelete, 1);
            localStorage.setItem("listProduct", JSON.stringify(listProduct))
            fetchListProductAdmin();
        } else {
            alert("Không thể xóa sản phẩm này")
        }
    }
};

function handleEdit(idEditProduct) {
    idProductUpdate = idEditProduct;

    var index = listProduct.findIndex((product) => product.id == idProductUpdate);

    $("#IdUpdate").val(listProduct[index].id);
    $("#NameUpdate").val(listProduct[index].name);
    $("#PriceUpdate").val(listProduct[index].price);
    $("#InfoUpdate").val(listProduct[index].info);
    $("#DetailUpdate").val(listProduct[index].detail);
    $("#StarUpdate").val(listProduct[index].star);
    $("#ManufacturerUpdate").val(listProduct[index].manufacturer);
    $("#CategoryUpdate").val(listProduct[index].category);

    $("#ModalUpdateProduct").modal("show")
}

// Hàm xử lý Reset trên Form Update
function handleResetUpdate() {
    $("#NameUpdate").val("");
    $("#PriceUpdate").val("");
    $("#InfoUpdate").val("");
    $("#DetailUpdate").val("");
    $("#StarUpdate").val("");
    $("#ImageUpdate").val("");
    $("#ManufacturerUpdate").val(0);
    $("#CategoryUpdate").val(0);
}

function handleUpdateProduct() {
    var index = listProduct.findIndex((product) => product.id == idProductUpdate);


    v_Name = document.getElementById("NameUpdate").value;
    v_Price = document.getElementById("PriceUpdate").value;
    v_Info = document.getElementById("InfoUpdate").value;
    v_Detail = document.getElementById("DetailUpdate").value;
    v_Star = document.getElementById("StarUpdate").value;
    v_Image = getImageName($("#ImageUpdate").val());
    v_Manufacturer = document.getElementById("ManufacturerUpdate").value;
    v_Category = document.getElementById("CategoryUpdate").value;

    // Thực hiện Update thông tin Sản phẩm vào listProduct
    listProduct[index].name = v_Name;
    listProduct[index].price = v_Price;
    listProduct[index].info = v_Info;
    listProduct[index].detail = v_Detail;
    listProduct[index].star = v_Star;
    // Kiểm tra nếu người dùng chọn lại ảnh thì mới Set dữ liệu mới
    // TH Người dùng không chọn lại ảnh sẽ lấy ảnh hiện tại của sản phẩm
    if (v_Image !== null && v_Image !== "") {
        listProduct[index].image = v_Image;
    };
    listProduct[index].manufacturer = v_Manufacturer;
    listProduct[index].category = v_Category;

    // Lưu lại dữ liệu vào LocalStorage
    localStorage.setItem("listProduct", JSON.stringify(listProduct));

    // Reset Form Update
    handleResetUpdate();
    // Đóng Modal Update
    $("#ModalUpdateProduct").modal("hide");
    // Hiển thị lại dữ liệu sau Update
    fetchListProductAdmin();
}


