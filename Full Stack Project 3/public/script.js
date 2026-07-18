document.addEventListener("DOMContentLoaded", () => {


const API = "http://localhost:3000/api";

const productGrid = document.getElementById("product-grid");
const toast = document.getElementById("toast");

let allProducts = [];



// ===============================
// LOAD PRODUCTS FROM MYSQL
// ===============================


async function loadProducts(){


try{


const response = await fetch(`${API}/products`);

const result = await response.json();


allProducts = result.data;


displayProducts(allProducts);



}
catch(error){

console.log("Database Error:",error);

showToast("❌ Cannot connect to server");

}


}





// ===============================
// DISPLAY PRODUCTS
// ===============================


function displayProducts(products){


productGrid.innerHTML="";


products.forEach(product=>{


const card=document.createElement("div");


card.className="product-card";


card.dataset.category =
product.category.toLowerCase();



card.innerHTML=`

<img src="${product.image ? product.image.replace('.jpg','.png') : 'hero_bakery.png'}" 
alt="${product.name}">


<div class="product-info">


<h3>${product.name}</h3>


<p>
${product.description}
</p>


<div class="price">
$${product.price}
</div>


<button 
class="order-btn"
data-id="${product.id}"
data-name="${product.name}"
data-price="${product.price}">

Order Now

</button>


</div>

`;



productGrid.appendChild(card);


});



attachOrderEvents();


}





// ===============================
// ORDER SAVE TO MYSQL
// ===============================


function attachOrderEvents(){


const buttons=document.querySelectorAll(".order-btn");



buttons.forEach(button=>{


button.addEventListener("click", async()=>{


const order={


customer_name:"Website Customer",

email:"customer@gmail.com",

product_id:button.dataset.id,

quantity:1,

total_price:button.dataset.price


};




try{


const response = await fetch(
`${API}/orders`,
{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(order)


});



const result = await response.json();



if(result.success){


showToast(
"🛒 "+button.dataset.name+" Ordered Successfully!"
);


}


else{


showToast("❌ Order Failed");

}


}

catch(error){


console.log(error);

showToast("❌ Server Error");


}



});


});



}





// ===============================
// CATEGORY FILTER
// ===============================


const filters=document.querySelectorAll(".filter");



filters.forEach(filter=>{


filter.addEventListener("click",()=>{


filters.forEach(btn=>{

btn.classList.remove("active");

});


filter.classList.add("active");



const category =
filter.dataset.category;



if(category==="all"){


displayProducts(allProducts);


}

else{


const filtered =
allProducts.filter(product=>

product.category.toLowerCase()
.includes(category)

);


displayProducts(filtered);


}



});


});





// ===============================
// TOAST MESSAGE
// ===============================


function showToast(message){


toast.innerText=message;


toast.style.display="block";


setTimeout(()=>{


toast.style.display="none";


},3000);



}




// START APP

loadProducts();



});