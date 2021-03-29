export const env={
    reader:null,
    get productsContainer(){
        return document.querySelector(".ProductList")
    },
    get products(){
        return this.productsContainer.querySelectorAll(".ProductListCell")
    }

    
}