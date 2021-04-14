import { detailCensorship } from "./detailCensorship";
import { inteligenseSearchCensorship } from "./inteligenseSearchCensorship";
import { productCensorship } from "./productCensorship";

declare global {
    interface Window {
        productCensorship:Function;
        inteligenseSearchCensorship:Function;
        detailCensorship:Function;

    }
}

window.productCensorship=productCensorship
window.inteligenseSearchCensorship=inteligenseSearchCensorship
window.detailCensorship=detailCensorship


