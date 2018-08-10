import { Injectable } from "../../../node_modules/@angular/core";
import { auth } from "../../../node_modules/firebase";
import { AngularFireDatabase } from "../../../node_modules/angularfire2/database";

@Injectable()
export class ProfilUserService {

    constructor(private afDatabase: AngularFireDatabase){
    }

    getUID(){
        return auth().currentUser.uid;
    }

    getCurrentUser(){
        return auth().currentUser;
    }

    getProfile(){
        return this.afDatabase.object(`profile/${this.getUID()}`).valueChanges();
    }
}