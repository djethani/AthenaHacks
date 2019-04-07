import Firebase from 'firebase';  
var config = {
    apiKey: "AIzaSyBfibjzNTnHmAG0Ie2wv_SsQkJeZNw57UE",
    authDomain: "athenahacks-61d10.firebaseapp.com",
    databaseURL: "https://athenahacks-61d10.firebaseio.com",
    projectId: "athenahacks-61d10",
    storageBucket: "athenahacks-61d10.appspot.com",
    messagingSenderId: "849769796667"
};
let app = Firebase.initializeApp(config);  
export const db = app.database();