import firebase from 'firebase';


export class AuthService {
    /* nouvelle inscription */
    signup(email: string, password: string) {
       /* je vais avoir un retour message qui <=> à une promise */
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    signin(email: string, password: string){
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    logOut(){
        firebase.auth().signOut();
    }
/* méthode pour récupérer le user */
    getActiveUser(){
        return firebase.auth().currentUser;
    }
}