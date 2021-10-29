import { env } from "./env";
import { IappConfig } from "./models/appConfig";
import { viewReader } from "./modules/viewReader";
import { productEraser } from "./tools/productEraser.tool";

export function productCensorship(opts: IappConfig) {
    
    if( !window.location.pathname.match( new RegExp(opts.pathname) ) ){
       return;
    }
   
    var timer=setInterval(()=>{

        if(document.readyState =="interactive" && !env.reader){
            env.reader = viewReader(opts,productEraser);
  
        }

        if (document.readyState == "complete" && env.products.length > 0) {
   
            if(!env.reader){
                productEraser(env.products, opts)
                env.reader = viewReader(opts, productEraser);
            }

            document.querySelectorAll(".PagingButtons a").forEach(item=>{
                item.addEventListener("click",()=>{
                    viewReader(opts,productEraser)
                })
            })

            clearInterval(timer)
        }
    },500)


}

