export const env={
    reader:null,
    get productsContainer(){
        return document.querySelector(".ProductList")
    },
    get products(){
        return Array.from(this.productsContainer.querySelectorAll(".ProductListCell"))
    }

    
}