import firebase from 'firebase'

const config = {
      apiKey: "AIzaSyDdNXcHpTyR1kaKzsSLhF2lU0lgy_0-Vn8",
			authDomain: "stop-snitchin-d5aa0.firebaseapp.com",
			databaseURL: "https://stop-snitchin-d5aa0.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth