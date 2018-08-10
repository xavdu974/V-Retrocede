import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "../../models/product.model";
import { ProfilUserService } from '../../services/profil-user/profil-user.service';


@Injectable()
export class ProductsListService {
    private productsListRef = this.db.list<Product>('product-list');
    user = this.currentUser.getUID();
    //private productsListRef = this.db.list<Product>(`profile/${this.user}/products`);

    constructor(private db: AngularFireDatabase, private currentUser: ProfilUserService){

    }

    getProductList(){
        return this.productsListRef;
    }

    addProduct(product: Product){
        return this.productsListRef.push(product);
    }
}