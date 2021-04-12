export function inteligenseSearchCensorship(pattern:string) {

    var observer=new MutationObserver((m)=>{        
        var products=document.querySelector("#SearchProductSummary")
            if( products){
                console.log("inteligese aparece");
                
                    try {
                        var lines=products.querySelectorAll(".product-panel-item")
                        if(lines.length > 0){
                            // console.log("inteligese: hay productos");
                            lines.forEach(item=>{
                                var itemName=item.querySelector(".cell-name")

                                if(itemName.innerHTML.toLowerCase().match(new RegExp(pattern.toLowerCase()))){
                                    // console.log("inteligese: se remueve un producto", item);
                                    item.remove()
                                }else{
                                    // console.log("inteligese: se ignora", item);
                                }
                            })
                        }

                    } catch (error) {
                        // console.error("viewReader: error while erasing products", error)
                    }

            }

        
    });
    
    observer.observe(document.body,{
        childList: true, subtree: true
    });

}