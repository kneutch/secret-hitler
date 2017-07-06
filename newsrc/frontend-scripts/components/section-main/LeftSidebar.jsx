import React from 'react';
import SidebarGame from './SidebarGame.jsx';
var ons = require('onsenui');
var Ons = require('react-onsenui');

export default class LeftSidebar extends React.Component {
	constructor() {
		super();
		this.createGameClick = this.createGameClick.bind(this);
		this.clickLoginButton = this.clickLoginButton.bind(this);

	}

	createGameClick() {
		console.log(this.props);
		this.props.onCreateGameButtonClick('createGame');
	}


	clickLoginButton() {
		console.log(this.props);
			this.props.onLoginButtonClick('home');
	}

	renderGameList() {
		const {gameList} = this.props;

		if (gameList.length) {
			return gameList.sort((a, b) => {
				const aGameStatus = a.gameStatus,
					bGameStatus = b.gameStatus;

				if (aGameStatus === 'notStarted' && bGameStatus === 'notStarted') {
					return a.seatedCount - b.seatedCount;
				}

				if (aGameStatus === 'notStarted' && bGameStatus !== 'notStarted') {
					return -1;
				}

				if (aGameStatus !== 'notStated' && bGameStatus === 'notStarted') {
					return 1;
				}

				if (aGameStatus === 'isStarted' && bGameStatus !== 'isStarted') {
					return -1;
				}

				if (aGameStatus !== 'isStarted' && bGameStatus === 'isStarted') {
					return 1;
				}

				return 0;
			}).map((game, index) => {
				return (
					<SidebarGame
						key={index}
						game={game}
						socket={this.props.socket}
					/>
				);
			});
		}
	}

	render() {
		return (
		<Ons.Page>
			<section className="leftsidebar">
				{(() => {
					const {userName} = this.props.userInfo,
					gameBeingCreated = this.props.midSection === 'createGame';

					console.log(userName);
					if (userName){
						return (!gameBeingCreated) ? <button className="ui button primary" onClick={this.createGameClick}>Create a new game</button> : <button className="ui button disabled">Creating a new game..</button>;
						
					}
					return (<button className="ui button primary" onClick={this.clickLoginButton}>Sign in</button>);


				})()}
				<div className="games-container">
					{this.renderGameList()}
				</div>
			</section>
		</Ons.Page>
		);
	}
}

LeftSidebar.propTypes = {
	userInfo: React.PropTypes.object,
	midSection: React.PropTypes.string,
	gameList: React.PropTypes.array,
	onCreateGameButtonClick: React.PropTypes.func,
	onLoginButtonClick: React.PropTypes.func,
	socket: React.PropTypes.object
};