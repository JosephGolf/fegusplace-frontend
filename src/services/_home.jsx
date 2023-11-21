import axios from "axios";
export const homeServices = {
  getAllProducts,
  getAllCats,
  getProduct,
  getByCatName,
  addReview,
  getProductReview,
  getSiteSettings,
  getProductsByMainCat,
  getProductsBySubCat,
  getProductsByType,
  
};


function getAllProducts() {
  return axios.get("https://fegusplacebackend.onrender.com/product/get-all");
}

function getProduct(nameEn) {
  return axios.post("https://fegusplacebackend.onrender.com/product/get-product", {
    nameEn: nameEn,
  });
}

function getAllCats() {
  return axios.get("https://fegusplacebackend.onrender.com/category/getAllCategories");
}

function getByCatName() {
  return axios.get("https://fegusplacebackend.onrender.com/product/getbycat");
}


function addReview(productID, userName, rating, reviewText, createdAt) {
  const token = localStorage.getItem("token");
  return axios({
    method: "POST",
    url: "https://fegusplacebackend.onrender.com/review/add",
    data: { productID, userName, rating, reviewText, createdAt },
    headers: { Authorization: `Bearer ${token}` },
  });
}

function getProductReview(proID) {
  console.log("proId form Home Serves", proID);
  return axios.get(`https://fegusplacebackend.onrender.com/review/product-review/${proID}`);
}
function getSiteSettings() {
  return axios.get("https://fegusplacebackend.onrender.com/settings/get-settings");
}


// list page

function getProductsByMainCat(cat) {
  return axios.get(`https://fegusplacebackend.onrender.com/product/main/${cat}`);
}

function getProductsBySubCat(cat) {
  return axios.get(`https://fegusplacebackend.onrender.com/product/sub/${cat}`);
}

function getProductsByType(cat) {
  return axios.get(`https://fegusplacebackend.onrender.com/product/type/${cat}`);
}


