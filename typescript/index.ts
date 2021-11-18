import { detailCensorship } from "./detailCensorship";
import { inteligenseSearchCensorship } from "./inteligenseSearchCensorship";
import { productCensorship } from "./productCensorship";
import { cuponsCensorship } from "./cuponsCensorship"

declare global {
    interface Window {
        productCensorship:Function;
        inteligenseSearchCensorship:Function;
        detailCensorship:Function;
        cuponsCensorship:Function
    }
}

window.productCensorship=productCensorship
window.inteligenseSearchCensorship=inteligenseSearchCensorship
window.detailCensorship = detailCensorship
window.cuponsCensorship=cuponsCensorship


