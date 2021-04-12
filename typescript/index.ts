import { inteligenseSearchCensorship } from "./inteligenseSearchCensorship";
import { productCensorship } from "./productCensorship";

declare global {
    interface Window {
        productCensorship:Function;
        inteligenseSearchCensorship:Function
    }
}

window.productCensorship=productCensorship
window.inteligenseSearchCensorship=inteligenseSearchCensorship
