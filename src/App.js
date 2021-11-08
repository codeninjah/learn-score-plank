import React from 'react'
import * as R from 'ramda'
import {Link, Route} from "wouter"
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { ref, getDatabase } from "firebase/database"

import { useObject } from 'react-firebase-hooks/database';


const firebaseConfig = {
	apiKey: "AIzaSyA3i92OjcKKmBZFlUnRKUt3SJf8dWQe64A",
	authDomain: "learn-score-plank-d8b3f.firebaseapp.com",
	databaseURL: "https://learn-score-plank-d8b3f-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "learn-score-plank-d8b3f",
	storageBucket: "learn-score-plank-d8b3f.appspot.com",
	messagingSenderId: "114726019474",
	appId: "1:114726019474:web:72207d023435708881214b"
  };
  
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
console.log(database)


function App() {

	return (
		<div className="App">
			<Route path="/">
				<StartPage />
			</Route>
			<Route path="/score">
				<ScorePage />
			</Route>
			<Route path="/judge">
				<JudgePage />
			</Route>
		</div>
	);
}

const StartPage = () => {
	return (
		<div className="start-page">
			<Link href="/score">
				<a  className="link fs8 fw4">Score view</a>
			</Link>
			<div className="fs5">Open this on your TV</div>
			<div className="h15"></div>
			<Link href="/judge">
				<a  className="link fs8 fw4">Judge view</a>
			</Link>
			<div className="fs5">Let the judge open this on their smartphone</div>
		</div>
	)
}

const ScorePage = () => {
	const [snapshot, loading, error] = useObject(ref(database));
	
	if(loading == true) {
		return "loading"
	}
	const data = snapshot.val()
	console.log(data)
	return (
		<div className="score-page">
			<div className="player-score">
				<div className="score blue">{data.player1.score}</div>
				<div className="player blue">{data.player1.name}</div>
			</div>
			<div className="player-score">
				<div className="score red">{data.player2.score}</div>
				<div className="player red">{data.player2.name}</div>
			</div>
		</div>	
	)
}


const JudgePage = () => {
	//const [settingNames, setSettingNames] = React.useState(false)
	const [snapshot, loading, error] = useObject(ref(database));
	
	if(loading == true) {
		return "loading"
	}
	const data = snapshot.val()
	console.log(data)

	function test(){
		console.log("HEY!")
	}

	//useful: https://reactjs.org/docs/faq-functions.html

		return (
			<div className="judge-page">
				<div className="ju-name-row ju-name-row-blue">
				<div className="ju-name">{data.player1.name}</div>
					<div className="ju-points">{data.player1.score}</div>
					<div className="ju-minus">-</div>
					<div className="ju-plus" onClick={test}>+</div>
				</div>
				<div className="ju-name-row ju-name-row-red">
					<div className="ju-name">{data.player2.name}</div>
					<div className="ju-points">{data.player2.score}</div>
					<div className="ju-minus">-</div>
					<div className="ju-plus">+</div>
				</div>
				<div className="settings-row">
					<div className="ju-set">Cancel</div>
					<div className="ju-set">Save</div>
				</div>
			</div>
		)
	

	return (
		<div className="judge-page">
			<div className="ju-player-row ju-blue">
				<div className="ju-minus">-</div>
				<div className="ju-player">
					<div className="ju-points">12</div>
					<div className="ju-name">Malin</div>
				</div>
				<div className="ju-plus">+</div>
			</div>
			<div className="ju-player-row ju-red">
				<div className="ju-minus">-</div>
				<div className="ju-player">
					<div className="ju-points">5</div>
					<div className="ju-name">Nova</div>
				</div>
				<div className="ju-plus">+</div>
			</div>
			<div className="settings-row">
				<div className="ju-set">Set player names</div>
				<div className="ju-set">Reset score</div>
				<div className="ju-set">Switch sides</div>
			</div>
		</div>
	)
}


export default App;







