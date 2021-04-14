import { env } from "./env";
import { IappConfig } from "./models/appConfig";
import { viewReader } from "./modules/viewReader";
import { productEraser } from "./tools/productEraser.tool";
import { productEventCleaner } from "./tools/productEventCleaner";



export function detailCensorship(pathname:string){
    
    if( !window.location.pathname.match( new RegExp(pathname) ) ){
       return;
    }
    console.log("detail");
    

    var reader;
    var timer=setInterval(()=>{
        
        if(document.readyState =="interactive" && !env.reader){
            reader=viewReader(new IappConfig(),()=>{productEventCleaner});
  
        } 
        if(document.readyState == "complete"){
            
            if(!reader){
                productEventCleaner()
            }else{
                reader.disconnect()
            }
            
            document.querySelectorAll(".PagingButtons a").forEach(item=>{
                console.log("click");
                
                item.addEventListener("click",()=>{
                    viewReader(new IappConfig(),productEventCleaner)
                })
            })

            clearInterval(timer)
        }
    },500)


}

