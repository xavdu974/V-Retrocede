import { Injectable } from "../../../node_modules/@angular/core";
import { auth } from "../../../node_modules/firebase";
import { Observable } from '../../../node_modules/rxjs/Observable';
import { AngularFireDatabase } from "../../../node_modules/angularfire2/database";

@Injectable()
export class ProfilUserService {
    currentUser = auth().currentUser.uid;
    profile: Observable<any> = this.afDatabase.object(`profile/${this.currentUser}`).valueChanges();

    constructor(private afDatabase: AngularFireDatabase){
    }

    getUID(){
        return this.currentUser;
    }

    getProfile(){
        return this.profile
    }
}