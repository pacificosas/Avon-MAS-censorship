import { productCensorship } from "./productCensorship";

declare global {
    interface Window {
        productCensorship:Function;
    }
}

window.productCensorship=productCensorship
