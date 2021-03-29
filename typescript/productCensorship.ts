import { env } from "./env";
import { IappConfig } from "./models/appConfig";
import { viewReader } from "./modules/viewReader";
import { productEraser } from "./tools/productEraser.tool";

export function productCensorship(opts:IappConfig){
    
    if( !window.location.pathname.match( new RegExp(opts.pathname) ) ){
       return;
    }

   

    var timer=setInterval(()=>{
        
        if(document.readyState =="interactive" && !env.reader){
            env.reader=viewReader(opts);
  
        } 
        if(document.readyState == "complete"){
            
            if(!env.reader){
                productEraser(env.products,opts)
            }else{
                env.reader.disconnect()
            }
            
            document.querySelectorAll(".PagingButtons a").forEach(item=>{
                console.log("click");
                
                item.addEventListener("click",()=>{
                    viewReader(opts)
                })
            })

            clearInterval(timer)
        }
    },500)


}

