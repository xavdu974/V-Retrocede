import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "../../models/product.model";

@Injectable()
export class ProductsListService {
    private productsListRef = this.db.list<Product>('product-list');

    constructor(private db: AngularFireDatabase){

    }

    getProductList(){
        return this.productsListRef;
    }

    addProduct(product: Product){
        return this.productsListRef.push(product);
    }
}