import app from 'firebase';
import 'firebase/auth';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)


    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    resetPassword = (email) =>
        this.auth.sendPasswordResetEmail(email)

    doSignOut = () => this.auth.signOut();

}

export default new Firebase();
