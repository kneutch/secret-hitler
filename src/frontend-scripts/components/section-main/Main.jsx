import React from 'react'; // eslint-disable-line
import Menu from '../menu/Menu.jsx';
import Defaultmid from './Defaultmid.jsx';
import Creategame from './Creategame.jsx';
import Settings from './Settings.jsx';
import Game from './Game.jsx';
import Profile from './Profile.jsx';
import Replay from './replay/Replay.jsx';
import Changelog from './Changelog.jsx';
import Moderation from './Moderation.jsx';
<<<<<<< HEAD
import Home from './Home.jsx'; 
import Lobby from './Lobby.jsx';
import LeftSidebar from './LeftSidebar.jsx';

export default class Main extends React.Component {

	handleCreateGameSubmit(game) {
		const {dispatch, userInfo} = this.props;

		userInfo.isSeated = true;
		dispatch(updateUser(userInfo));
		dispatch(updateMidsection('game'));
		dispatch(updateGameInfo(game));
		socket.emit('addNewGame', game);
	}

	render() {
		return (
			<section>
				{(() => {
					const { gameInfo, userInfo } = this.props;
					switch (this.props.midSection) {
					case 'createGame':
						return (
							<Creategame
								userList={this.props.userList}
								userInfo={this.props.userInfo}
								onCreateGameSubmit={this.props.onCreateGameSubmit}
								onLeaveCreateGame={this.props.onLeaveCreateGame}
							/>
						);
					case 'changelog':
						return (
							<Changelog
								onLeaveChangelog={this.props.onLeaveChangelog}
								version={this.props.version}
							/>
						);
					case 'lobby':	
						return (
							<Lobby
								gameInfo={this.props.gameInfo}
								userInfo={this.props.userInfo}
								userList={this.props.userList}
								generalChats={this.props.generalChats}
								onModerationButtonClick={this.handleRoute}
								socket={this.props.socket}
							/>
						);
					case 'game':
						return (
							<Game
								onUserNightActionEventSubmit={this.props.onUserNightActionEventSubmit}
								onUpdateTruncateGameSubmit={this.props.onUpdateTruncateGameSubmit}
								onUpdateSelectedForEliminationSubmit={this.props.onUpdateSelectedForEliminationSubmit}
								onUpdateReportGame={this.props.onUpdateReportGame}
								onClickedTakeSeat={this.props.onClickedTakeSeat}
								onNewGameChat={this.props.onNewGameChat}
								onSeatingUser={this.props.onSeatingUser}
								onLeaveGame={this.props.onLeaveGame}
								userInfo={this.props.userInfo}
								gameInfo={this.props.gameInfo}
								userList={this.props.userList}
								socket={this.props.socket}
							/>
						);
					case 'moderation':
						return (
							<Moderation
								userInfo={this.props.userInfo}
								socket={this.props.socket}
								userList={this.props.userList}
								onLeaveModeration={this.props.onLeaveModeration}
							/>
						);
					case 'settings':
						return (
							<Settings
								onLeaveSettings={this.props.onLeaveSettings}
								userInfo={this.props.userInfo}
								socket={this.props.socket}
							/>
						);
					case 'home':	
						return (
							<LeftSidebar
								userInfo={this.props.userInfo}
								midSection={this.props.midSection}
								gameList={this.props.gameList}
								onCreateGameButtonClick={this.props.onCreateGameButtonClick}
								onGameClick={this.handleGameClick}
								socket={this.props.socket}
							/>
						);
					case 'profile':
						return <Profile />;
					case 'replay':
						return <Replay />;
					default:
						return !userInfo.userName ? 
							<Home
								userInfo={this.props.userInfo}
								midSection={this.props.midSection}
								gameList={this.props.gameList}
								onCreateGameButtonClick={this.props.onCreateGameButtonClick}
								onGameClick={this.handleGameClick}
								socket={this.props.socket}
							/>:
							<LeftSidebar
								userInfo={this.props.userInfo}
								midSection={this.props.midSection}
								gameList={this.props.gameList}
								onCreateGameButtonClick={this.props.onCreateGameButtonClick}
								onGameClick={this.handleGameClick}
								socket={this.props.socket}
							/>;
=======
import PropTypes from 'prop-types';

const Main = props =>
	(
		<section
			className={
				(() => {
					let classes = '';

					if (props.midSection === 'game' || props.midSection === 'replay') {
						if (props.gameInfo.general && props.gameInfo.general.experiencedMode) {
							classes = 'experienced ';
						}

						if (props.userInfo.gameSettings && props.userInfo.gameSettings.enableRightSidebarInGame) {
							classes += 'thirteen';
						} else {
							classes += 'sixteen';
						}
					} else if (props.midSection === 'replay') {
						classes += 'sixteen';
					} else {
						classes = 'ten';
					}

					classes += ' wide column section-main';  // yes semantic requires classes in specific order... ascii shrug

					if (props.midSection === 'game') {
						classes += ' ingame';
>>>>>>> upstream/master
					}
					return classes;
				})()
			}
		>
			<Menu
				userInfo={props.userInfo}
				onLeaveGame={props.onLeaveGame}
				onSettingsButtonClick={props.onSettingsButtonClick}
				gameInfo={props.gameInfo}
			/>
			{(() => {
				switch (props.midSection) {
				case 'createGame':
					return (
						<Creategame
							userList={props.userList}
							userInfo={props.userInfo}
							onCreateGameSubmit={props.onCreateGameSubmit}
							onLeaveCreateGame={props.onLeaveCreateGame}
						/>
					);
				case 'changelog':
					return (
						<Changelog
							onLeaveChangelog={props.onLeaveChangelog}
							version={props.version}
						/>
					);
				case 'game':
					return (
						<Game
							onUserNightActionEventSubmit={props.onUserNightActionEventSubmit}
							onUpdateTruncateGameSubmit={props.onUpdateTruncateGameSubmit}
							onUpdateSelectedForEliminationSubmit={props.onUpdateSelectedForEliminationSubmit}
							onUpdateReportGame={props.onUpdateReportGame}
							onClickedTakeSeat={props.onClickedTakeSeat}
							onNewGameChat={props.onNewGameChat}
							onSeatingUser={props.onSeatingUser}
							onLeaveGame={props.onLeaveGame}
							userInfo={props.userInfo}
							gameInfo={props.gameInfo}
							userList={props.userList}
							socket={props.socket}
						/>
					);
				case 'moderation':
					return (
						<Moderation
							userInfo={props.userInfo}
							socket={props.socket}
							userList={props.userList}
							onLeaveModeration={props.onLeaveModeration}
						/>
					);
				case 'settings':
					return (
						<Settings
							onLeaveSettings={props.onLeaveSettings}
							userInfo={props.userInfo}
							socket={props.socket}
						/>
					);
				case 'profile':
					return <Profile />;
				case 'replay':
					return <Replay />;
				default:
					return (
						<Defaultmid quickDefault={props.quickDefault} />
					);
				}
			})()}
		</section>
	);

Main.propTypes = {
	midSection: PropTypes.string,
	userInfo: PropTypes.object,
	gameInfo: PropTypes.object,
	socket: PropTypes.object,
	userList: PropTypes.object
};

export default Main;