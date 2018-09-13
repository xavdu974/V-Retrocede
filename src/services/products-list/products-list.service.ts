import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Product } from "../../models/product.model";
import { ProfilUserService } from '../../services/profil-user/profil-user.service';
import { ToastService } from "../toast/toast.service";


@Injectable()
export class ProductsListService {
    private productsListRef = this.db.list<Product>('product-list');
    user = this.currentUser.getUID();
    private favoritesListRef = this.db.list<Product>(`profile/${this.user}/favorites`);
    //private productsListRef = this.db.list<Product>(`profile/${this.user}/products`);

    constructor(private toast: ToastService, private db: AngularFireDatabase, private currentUser: ProfilUserService){

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

    isFavoriteProduct(productRef){
        let isFavorite: Boolean;
        var that = this;
        //return this.db.database.ref(`profile/${this.user}/favorites`).once("value").then(snapshot => snapshot.hasChild(productRef)); faire fonctionner le return !!!
        this.db.database.ref(`profile/${this.user}/favorites`).once("value").then(function(snapshot) {
            isFavorite = snapshot.hasChild(productRef);
            if(isFavorite){
                that.deleteProductListFavorites(productRef)
            }else{
                that.addProductListFavorites(productRef)
            }
        });
    }

    addProductListFavorites(productRef){
        let result: string;
        this.favoritesListRef.set(productRef, productRef)
        .then(res => this.toast.show("Ajout à la liste des favoris"))
    }

    deleteProductListFavorites(productRef){
        this.db.database.ref(`profile/${this.user}/favorites/${productRef}`).remove();
        this.toast.show("Supprimé de la liste des favoris");
    }

    getFavorites(){
        return this.db.list<any>(`profile/${this.user}/favorites`)
    }

    getProducts(start, end): AngularFireList<any> {
        return this.db.list('/profile', ref =>
            ref.startAt(start).endAt(end),
        );
    }
}

