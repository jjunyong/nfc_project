import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../form/user';
import firebase from 'firebase'


@Injectable()
export class AuthData {
  userData: any;
  public user: Observable<User>
  public userDetails: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.user = this.afAuth.authState
      .switchMap(user =>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        }
        else{
          return Observable.of(null)
        }
      })
   

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential)=>{
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user){
    const userRef = this.afs.doc(`users/${user.uid}`);
    const data : User={
      uid: user.uid,
      email: user.email,
      roles : {
        subscriber: true,
        editor : false,
        admin : false
      }
    }
    return userRef.set(data, { merge : true })
  }

  private checkAuthorization(user : User, allowedRoles : string[]):boolean {
    if(!user) return false
    for (const role of allowedRoles){
      if(user.roles[role]){
        return true;
      }
    }
    return false;
  }

  canRead(user:User):boolean{
    const allowed = ['admin','editor','subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user:User):boolean{
    const allowed = ['admin','editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user:User):boolean{
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }




  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword)
  }

  logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut();
  }


  // registerUser(name: string, email: string, password: string, phone: number): Promise<any> {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
  //     this.afs.collection('users').doc(newUser.uid).set({
  //       uid : newUser.uid,
  //       email: email,
  //       name: name,
  //       phone: phone,
  //       roles : {
  //         subscriber: true,
  //         editor : false,
  //         admin : false
  //       }
  //     });
  //   });
  // }




  // signInWithPopupFacebook(): Promise<any> {
  //   return this.afAuth.auth
  //     .signInWithPopup(new firebase.auth.FacebookAuthProvider())
  //     .then(res => console.log(res));
  // }

  // signInWithFacebook(): Promise<any> {

  //     return this.facebook.login(['email', 'public_profile']).then(res => {
  //       const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  //       return firebase.auth().signInWithCredential(facebookCredential);
  //     })


  // }

  // signInWithGoogle(): Promise<any> {

  //     return this.googleplus.login({
  //       // ***** Don't forgot to change webClientId ******//
  //       'webClientId':'134053776757-rj2vajjm340t2bilpencqq4hh1j76sv5.apps.googleusercontent.com',
  //       'offline': true}).then(res =>{
  //       return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)) 
  //     }) 
  // }


  //  updateUserProfile(uid,displayName,email,photo,phone){
  //   firebase.database().ref('/userProfile').child(uid).once('value', function(snapshot) {
  //     var exists = (snapshot.val() !== null);

  //       if (exists) {
  //         console.log('user ' + uid + ' exists!');
  //         firebase.database().ref('userProfile/'+uid).update({ 
  //           name: displayName,
  //           email: email,
  //           photo: photo,
  //           phone:phone
  //         });

  //       } else {
  //         console.log('user ' + uid + ' does not exist!');
  //         firebase.database().ref('/userProfile').child(uid).set({  
  //           name: displayName,
  //           email: email,
  //           photo: photo,
  //           phone:phone
  //         });

  //       }
  //   });

  //  }


  // resetPassword(email: string):Promise<any> {
  //   return this.afAuth.auth.sendPasswordResetEmail(email);
  // }


}

