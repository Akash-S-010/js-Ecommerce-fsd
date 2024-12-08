let form = document.querySelector(".form");

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    let inputField = document.querySelector('.input-box')
    let inpValue = inputField.value.trim().toLowerCase()

    // -----Fetch products from API-----
    try {
        let response = await fetch('https://fakestoreapi.com/products')
        let data = await response.json()

        let filteredProducts = data.filter(product =>
            product.title.toLowerCase().includes(inpValue)
        )
        console.log(data)
        displayProducts(filteredProducts);

    } catch (error) {
        console.error("Error fetching products:",error)
    }
})

// -------Function to display products----------
function displayProducts(products) {
    let productContainer = document.querySelector('.product-container')
    productContainer.innerHTML = ""

    if (products.length === 0) {
        productContainer.innerHTML = 
            `<div class="col-12 mt-5 text-center">
                <p class="text-danger fs-5 fw-bold">Sorry no products found.</p>
            </div>`
        return
    }

    products.forEach(product => {
        let productCard = 
            ` <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                    <div class="card">
                        <img src="${product.image}" class="product-img" alt="">
                        <div class="card-body">
                          <h5 class="card-title">${product.title}</h5>
                          <p class="price text-success">$${product.price}</p>
                          <p class="card-text">${product.description}</p>
                          <a href="#" class="btn btn-warning">View Product</a>
                          <a href="#" class="btn btn-primary">Add to cart</a>
                        </div>
                      </div>
                </div>`
        productContainer.innerHTML += productCard
    });
}
