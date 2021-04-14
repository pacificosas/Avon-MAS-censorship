import { IappConfig } from "../models/appConfig"

export function productEraser(products,opts:IappConfig){
   
    products.forEach(prod=>{
        var prodName=prod.querySelector(".ProductName").innerText.toLowerCase()
        if(opts.productPattern && prodName.match(new RegExp(opts.productPattern.toLowerCase())) ){
            console.log(prod);
            
            prod.remove()
        }
        if(opts.productsNames && opts.productsNames.map(item=>item.toLowerCase()).indexOf(prodName) >= 0){
            console.log(prod);
            prod.remove()
        }
    })
}