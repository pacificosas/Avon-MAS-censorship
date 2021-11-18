import { env } from "./env";

function eraseCuponElement() {
  let el:any=document.querySelector(".Cart-NoCoupon")
    el.style.display = "none"
}

function displayCuponElement() {
  let el:any=document.querySelector(".Cart-NoCoupon")
    el.style.display = "block"
}

function getProductsNames() {
  return Array.from(document.querySelectorAll(".Cart-Products .Cart-ProductName a"))
  .map((item:HTMLElement)=>item.innerText)
  
}

function viewReader(patt) {
  const targets=getProductsNames().filter(name => {
    return name.match(patt)
  })
  if (targets.length > 0) {
    eraseCuponElement()
  } else {
    displayCuponElement()
  }
}

function observe(patt) {
   
    
  let observer = new MutationObserver((m)=>{
    var productsContainer=document.querySelector(".Cart-Products")
    
    
    try {
        var products=getProductsNames()
        if( products.length> 0){
                try {

                  viewReader(patt)
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

export function cuponsCensorship(patt) {

  if (!window.location.pathname.match(new RegExp('\/cart\/?'))) {
    return;
 }
 
 var timer=setInterval(()=>{

     if(document.readyState =="interactive" && !env.reader){
         env.reader = viewReader(patt);
         observe(patt)
     }

     if (document.readyState == "complete" && getProductsNames().length > 0) {

         if(!env.reader){
             
           env.reader = viewReader(patt);
           observe(patt)
         }

         clearInterval(timer)
     }
 },500)

}