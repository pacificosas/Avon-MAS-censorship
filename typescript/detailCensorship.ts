import { env } from "./env";
import { IappConfig } from "./models/appConfig";
import { viewReader } from "./modules/viewReader";
import { productEraser } from "./tools/productEraser.tool";
import { productEventCleaner } from "./tools/productEventCleaner";



var reader=null;
var currentProducts=[];
export function detailCensorship(pathname:string){
    
    if( !window.location.pathname.toLowerCase().match( new RegExp(pathname.toLowerCase()) ) ){
       return;
    }
    console.log("detail");
    


    var timer=setInterval(()=>{
        
        if(document.readyState =="interactive" && !env.reader){
            reader=viewReader(new IappConfig(),productEventCleaner);
  
        } 
        if(document.readyState == "complete"){
            
            if(!reader){
                reader=viewReader(new IappConfig(),productEventCleaner)
            }else{
            }
            
            document.querySelectorAll(".PagingButtons a").forEach(item=>{
                
                item.addEventListener("click",()=>{
                    viewReader(new IappConfig(),productEventCleaner)
                })
            })
            clearInterval(timer)
        }
    },500)


}


