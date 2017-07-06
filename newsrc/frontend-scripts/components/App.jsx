import React from 'react';
import { connect } from 'react-redux';
import LeftSidebar from './section-left/LeftSidebar.jsx';
import Main from './section-main/Main.jsx';
import RightSidebar from './section-right/RightSidebar.jsx';
import { updateUser, updateMidsection, updateGameList, updateGameInfo, updateUserList, updateGeneralChats, updateVersion } from '../actions/actions.js';
import socket from '../socket';
require('onsenui'); // This needs to be imported to bootstrap the components.
var Ons = require('react-onsenui');

const select = state => state;

export class App extends React.Component {
	constructor() {
		super();
		this.handleRoute = this.handleRoute.bind(this);
		this.handleCreateGameSubmit = this.handleCreateGameSubmit.bind(this);
		this.handleRoute = this.handleRoute.bind(this);
		this.handleSeatingUser = this.handleSeatingUser.bind(this);
		this.handleLeaveGame = this.handleLeaveGame.bind(this);
		this.makeQuickDefault = this.makeQuickDefault.bind(this);
	    this.renderToolbar = this.renderToolbar.bind(this);
		this.clickLoginButton = this.clickLoginButton.bind(this);
   	    this.clickLogoutButton = this.clickLogoutButton.bind(this);    	 
   	    this.clickHomeButton = this.clickHomeButton.bind(this);    	 
   	    this.clickSettingsButton = this.clickSettingsButton.bind(this);    	 
	}

	clickLoginButton() {
		const {gameInfo, dispatch, userInfo} = this.props,
		{gameState} = gameInfo;
		dispatch(updateMidsection('home'));
	}

	clickHomeButton() {
		const {gameInfo, dispatch, userInfo} = this.props,
		{gameState} = gameInfo;
		dispatch(updateMidsection('home'));
	}

	clickSettingsButton() {
		const {gameInfo, dispatch, userInfo} = this.props,
		{gameState} = gameInfo;
		dispatch(updateMidsection('settings'));
	}

	clickLogoutButton() {
		const {gameInfo, dispatch, userInfo} = this.props,
		{gameState} = gameInfo;
		window.location.pathname = '/observe';	
	}

	openMenu() {
  		var menu = document.getElementById('menu');
		menu.toggle();
	}

	componentDidMount() {
		const { dispatch } = this.props,
			{ classList } = document.getElementById('game-container');

		if (classList.length) {
			const username = classList[0].split('username-')[1],
				info = { userName: username };

			socket.emit('getUserGameSettings', username);

			// ** begin devhelpers **
			const devPlayers = ['Jaina', 'Rexxar', 'Malfurian', 'Thrall', 'Valeera', 'Anduin', 'aaa', 'bbb']; // eslint-disable-line one-var
			if (devPlayers.includes(username)) {
				const data = {
					uid: 'devgame',
					userName: username
				};

				// info.isSeated = true;
				socket.emit('updateSeatedUser', data);
				socket.emit('getGameInfo', 'devgame');
			}
			// ** end devhelpers **
			dispatch(updateUser(info));
		}

		socket.on('manualDisconnection', () => {
			window.location.pathname = '/observe';
		});

		socket.on('manualReload', () => {
			window.location.reload();
		});

		socket.on('gameSettings', settings => {
			const { userInfo } = this.props;

			userInfo.gameSettings = settings;
			dispatch(updateUser(userInfo));
		});

		socket.on('gameList', list => {
			dispatch(updateGameList(list));
		});

		socket.on('version', v => {
			dispatch(updateVersion(v));
		});

		socket.on('gameUpdate', (game, isSettings, toReplay = false) => {
			if (this.props.midSection !== 'game' && Object.keys(game).length) {
				dispatch(updateGameInfo(game));
				dispatch(updateMidsection('game'));
			} else if (!Object.keys(game).length) {
				if (isSettings) {
					dispatch(updateMidsection('settings'));
				} else if (!toReplay) {
					dispatch(updateMidsection('default'));
				}
				dispatch(updateGameInfo(game));
			} else {
				dispatch(updateGameInfo(game));
			}
		});

		socket.on('userList', list => {
			dispatch(updateUserList(list));
		});

		socket.on('updateSeatForUser', () => {
			const { userInfo } = this.props;

			userInfo.isSeated = true;
			dispatch(updateUser(userInfo));
		});

		socket.on('generalChats', chats => {
			dispatch(updateGeneralChats(chats));
		});
	}

	handleRoute(route) {
		const { dispatch } = this.props;

		dispatch(updateMidsection(route));
	}

	handleCreateGameSubmit(game) {
		const { dispatch, userInfo } = this.props;
		userInfo.isSeated = true;
		dispatch(updateUser(userInfo));
		dispatch(updateMidsection('game'));
		dispatch(updateGameInfo(game));
		socket.emit('addNewGame', game);
	}



	// ***** begin dev helpers *****

	makeQuickDefault() {
		const { dispatch, userInfo } = this.props,
			game = {
				gameState: {
					previousElectedGovernment: [],
					undrawnPolicyCount: 17,
					discardedPolicyCount: 0,
					presidentIndex: -1
				},
				chats: [],
				general: {
					uid: 'devgame',
					name: 'New Game',
					minPlayersCount: 5,
					maxPlayersCount: 5,
					private: false,
					rainbowgame: true,
					experiencedMode: true,
					disableChat: false,
					disableGamechat: false,
					status: 'Waiting for more players..',
					electionCount: 0
				},
				publicPlayersState: [{
					userName: userInfo.userName,
					connected: true,
					isDead: false,
					cardStatus: {
						cardDisplayed: false,
						isFlipped: false,
						cardFront: 'secretrole',
						cardBack: {}
					}
				}],
				playersState: [],
				cardFlingerState: [],
				trackState: {
					liberalPolicyCount: 0,
					fascistPolicyCount: 0,
					electionTrackerCount: 0,
					enactedPolicies: []
				}
			};

		userInfo.isSeated = true;
		dispatch(updateUser(userInfo));
		dispatch(updateMidsection('game'));
		dispatch(updateGameInfo(game));
		socket.emit('addNewGame', game);
	}

	// ***** end dev helpers *****

	handleSeatingUser(password) {
		const { gameInfo, userInfo } = this.props,
			data = {
				uid: gameInfo.general.uid,
				userName: userInfo.userName,
				password
			};

		socket.emit('updateSeatedUser', data);
	}

	handleLeaveGame(isSeated, isSettings = false, badKarma, toReplay) {
		const { dispatch, userInfo, gameInfo } = this.props;

		if (userInfo.isSeated) {
			userInfo.isSeated = false;
			dispatch(updateUser(userInfo));
		}

		socket.emit('leaveGame', {
			userName: userInfo.userName,
			isSeated,
			isSettings,
			uid: gameInfo.general.uid,
			badKarma,
			toReplay
		});
	}

	renderToolbar() {
		const { gameInfo, userInfo } = this.props;
		return (
			<Ons.Toolbar>
				<div className="left"><img src='/stop-snitching.png' style={{ height: '100%' }} /></div>
				<div className="center" style={{ textAlign: 'center' }}><span style={{ fontSize: '1.5em' }}>Stop Snitchin'</span></div>
				<div className="right">
					{(() => {
						const { gameInfo, userInfo } = this.props;
						return (
							<div>
								<div className="loggedin">
									<span className="playername" style={{ float: 'left' }}></span>
								</div>
								<Ons.ToolbarButton onClick={this.openMenu}>
									<Ons.Icon icon='ion-navicon, material:md-menu' style={{ fontSize: '1.5em' }} />
								</Ons.ToolbarButton>
							</div>);
					})()}
				</div>
			</Ons.Toolbar>
		);
	}

	render() {
		return (
			<section className="ui grid">
				<Ons.Splitter>
					<Ons.SplitterSide
						style={{
							// boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
						}}
						side='right'
						width={200}
						collapse={true}
						isSwipeable={true}
						isOpen={false}
						onClose={this.hide}
						onOpen={this.show}
						id="menu"
					>
						<Ons.Page>
							<Ons.List>
								<Ons.ListTitle key="" style={{ textAlign: "right !important", display: 'block !important' }} onClick={this.openMenu} tappable chevron>Close</Ons.ListTitle>
								{(() => {
									const { gameInfo, userInfo } = this.props;
									return !userInfo.userName ? (
										<Ons.ListItem key="Login" onClick={this.clickLoginButton} tappable>Log In</Ons.ListItem>

									) : (
										<Ons.ListItem key="Logout" onClick={this.clickLogoutButton} tappable>Log Out</Ons.ListItem>

										);
								})()}
								<Ons.ListItem key="Settings" onClick={this.clickSettingsButton} tappable>Settings</Ons.ListItem>
								<Ons.ListItem key="Home" onClick={this.clickHomeButton} tappable>Home</Ons.ListItem>
								<Ons.ListItem key="Lobby" onClick={this.clickLobbyButton} tappable>Lobby</Ons.ListItem>

							</Ons.List>

						</Ons.Page>
					</Ons.SplitterSide>
					<Ons.SplitterContent>
						<Ons.Page renderToolbar={this.renderToolbar}>
							<Main
								userInfo={this.props.userInfo}
								midSection={this.props.midSection}
								onCreateGameSubmit={this.handleCreateGameSubmit}
								onLeaveCreateGame={this.handleRoute}
								gameInfo={this.props.gameInfo}
								gameList= {this.props.gameList}
								onLeaveSettings={this.handleRoute}
								onSeatingUser={this.handleSeatingUser}
								onLeaveGame={this.handleLeaveGame}
								quickDefault={this.makeQuickDefault}
								onLeaveChangelog={this.handleRoute}
								onSettingsButtonClick={this.handleRoute}
								onChangelogButtonClick={this.handleRoute}
								onLeaveModeration={this.handleRoute}
								onClickedTakeSeat={this.handleSeatingUser}
								generalChats={this.props.generalChats}
								userList={this.props.userList}
								socket={socket}
								version={this.props.version}
								onModerationButtonClick={this.handleRoute}
								onCreateGameButtonClick={this.handleRoute}
								onGameClick={this.handleGameClick}
							/>
						</Ons.Page>
					</Ons.SplitterContent>
				</Ons.Splitter>
			</section>
		);
	}
}

App.propTypes = {
	dispatch: React.PropTypes.func,
	userInfo: React.PropTypes.object,
	midSection: React.PropTypes.string,
	gameInfo: React.PropTypes.object,
	gameList: React.PropTypes.array,
	generalChats: React.PropTypes.array,
	userList: React.PropTypes.object
};

export default connect(select)(App);
