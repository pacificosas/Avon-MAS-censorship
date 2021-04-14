
declare var $;
export function productEventCleaner(){
    eventCleaner(".ProductName")
    eventCleaner(".ProductImage")
    eventCleaner(".ProductImage img")
   
}


export function eventCleaner(target){
    document.querySelectorAll(target).forEach(item=>{
        item.removeAttribute("href")
        $(item).off("click")
        item.onclick=()=>false
        item.removeAttribute("prevent-click")
        item.removeAttribute("ng-click")
        item.removeAttribute("ng-bind")
        item.classList.remove("ng-binding")
    
    })
}

