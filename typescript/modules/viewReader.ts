import { env } from "../env";
import { IappConfig } from "../models/appConfig";
import { productEraser } from "../tools/productEraser.tool";

export function viewReader(opts:IappConfig,action:Function){

   
    
    let observer = new MutationObserver((m)=>{
        var productsContainer=env.productsContainer

        
        try {
            var products=env.products
            if( products.length> 0){
                    try {

                            action(products,opts);
                    } catch (error) {
                        console.error("viewReader: error while erasing products", error)
                    }

            }

        } catch (error) {
            console.log("viewReader:",error);
            
        }
       

        
    });
    
    observer.observe(document.body,{
        childList: true, subtree: true
    });
    return observer
}