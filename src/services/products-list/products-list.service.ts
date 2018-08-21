import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
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

    getFilterProductList(column, value){
        return this.db.list('product-list/', ref => ref.orderByChild(column).startAt(value).endAt(value + "\uf8ff"));
    }

    addProduct(product: Product){
        return this.productsListRef.push(product);
    }

    getProducts(start, end): AngularFireList<any> {
        return this.db.list('/profile', ref =>
            ref.startAt(start).endAt(end),
        );
    }
}