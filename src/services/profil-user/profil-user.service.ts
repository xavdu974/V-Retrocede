import { Injectable } from "../../../node_modules/@angular/core";
import { auth } from "../../../node_modules/firebase";
import { AngularFireDatabase } from "../../../node_modules/angularfire2/database";
import { AngularFireAuth } from "../../../node_modules/angularfire2/auth";

@Injectable()
export class ProfilUserService {
    authState: any = null

    constructor(private afAuth: AngularFireAuth,
        private afDatabase: AngularFireDatabase){
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth
          });
    }

    authenticated(): boolean {
        return this.authState !== null;
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

    getProfileByUid(user){
        return this.afDatabase.object(`profile/${user}`).valueChanges();
    }
}