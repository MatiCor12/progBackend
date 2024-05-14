const socketClient=io()

socketClient.on("shippingofproducts",(obj)=>{
    updateProductList(obj)
})

function updateProductList(productList) {
    let productosHTML = "";
    productList.forEach((product) => {
        productosHTML += `code: ${product.code}
            <h4>${product.title}</h4>
            <li>id: ${product.id}</li>
            <li>description: ${product.description}</li>
            <li>price: $${product.price}</li>
            <li>category: ${product.category}</li>
            <li>status: ${product.status}</li>
            <li>stock: ${product.stock}</li>
            thumbnail: <img src="${product.thumbnail}">
            </p>
        <button type="button"onclick="deleteProduct(${product.id})">Eliminar</button>`
    })
}

let form = document.getElementById("formProduct")
form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let title = form.elements.title.value
    let description = form.elements.description.value
    let stock = form.elements.stock.value
    let thumbnail = form.elements.thumbnail.value
    let category = form.elements.category.value
    let price = form.elements.price.value
    let code = form.elements.code.value
    let status = form.elements.status.checked
    socketClient.emit("addProduct", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,
    status,
    })
    form.reset()
})

document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod")
    const deleteid = parseInt(deleteidinput.value)
    socketClient.emit("deleteProduct", deleteid)
    deleteidinput.value = ""
})

function deleteProduct(productId) {
socketClient.emit("deleteProduct", productId)
}