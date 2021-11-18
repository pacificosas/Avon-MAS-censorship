import { env } from "./env";

function eraseCuponElement() {
  document.querySelector(".Cart-NoCoupon").remove()
}

function getProductsNames() {
  return Array.from(document.querySelectorAll(".Cart-Products .Cart-ProductName a"))
  .map((item:HTMLElement)=>item.innerText)
  
}

function viewReader(patt,cb) {
  const targets=getProductsNames().filter(name => {
    return name.match(patt)
  })
  if (targets.length > 0) {
    cb()
  }
}


export function cuponsCensorship(patt) {

  if (!window.location.pathname.match(new RegExp('\/cart\/?'))) {
    return;
 }
 
 var timer=setInterval(()=>{

     if(document.readyState =="interactive" && !env.reader){
         env.reader = viewReader(patt,eraseCuponElement);

     }

     if (document.readyState == "complete" && getProductsNames().length > 0) {

         if(!env.reader){
             
             env.reader = viewReader(patt, eraseCuponElement);
         }

         clearInterval(timer)
     }
 },500)

}