import React from 'react';
import CardFlinger from './CardFlinger.jsx';
import EnactedPolicies from './EnactedPolicies.jsx';

export default class Tracks extends React.Component {
	constructor() {
		super();
		this.renderElectionTracker = this.renderElectionTracker.bind(this);
		// this.handleClickedReportGame = this.handleClickedReportGame.bind(this);
	}

	renderElectionTracker() {
		const { gameInfo } = this.props;

		let classes = 'electiontracker';

		if (gameInfo.trackState.electionTrackerCount === 1) {
			classes += ' fail1';
		} else if (gameInfo.trackState.electionTrackerCount === 2) {
			classes += ' fail2';
		} else if (gameInfo.trackState.electionTrackerCount === 3) {
			classes += ' fail3';
		}

		if (gameInfo.gameState.isTracksFlipped) {
			return <div className={classes} />;
		}
	}

	render() {
		const { gameInfo, userInfo, socket } = this.props;

		return (
			<section className="tracks-container">
				<CardFlinger
					userInfo={this.props.userInfo}
					gameInfo={this.props.gameInfo}
					socket={this.props.socket} 
				/>
				<EnactedPolicies
					gameInfo={gameInfo}
				/>
				<ol className="progress-track-lib">
					<li className="progress-done first">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-done second">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-todo third">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-todo fourth">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-todo fifth">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
				</ol>
				<ol className="progress-track-fasc">
					<li className="progress-done first">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-done second ">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-todo third">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-todo fourth">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-todo fifth">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
					<li className="progress-todo sixth">
						<center>
							<div className="icon-wrap">
								<svg className="icon-state icon-check-mark">
								</svg>
								<svg className="icon-state icon-down-arrow">
								</svg>
							</div>
						</center>
					</li>
				</ol>

			
			{/*}	<section className={
					(() => {
						let classes = 'tracks';
						return classes;
					})()
				}>
					<div className={
						(() => {
							let classes = 'track-flipper track-flipper-top';

							if (gameInfo.gameState.isTracksFlipped) {
								classes += ' flipped';
							}

							return classes;
						})()
					}>
						<div className="track top-track-front" />
						<div className="track top-track-back" />
					</div>
					<div className={
						(() => {
							let classes = 'track-flipper track-flipper-bottom';

							if (gameInfo.gameState.isTracksFlipped) {
								classes += ' flipped';
							}

							return classes;
						})()
					}>
						<div className="track bottom-track-front" />
						<div className={
							(() => {
								let classes = 'track bottom-track-back';

								if (gameInfo.general.playerCount < 7) {
									classes += ' track0';
								} else if (gameInfo.general.playerCount < 9) {
									classes += ' track1';
								} else {
									classes += ' track2';
								}

								return classes;
							})()
						} />
					</div>
					{this.renderElectionTracker()}
				</section>*/}
				{this.renderElectionTracker()}
			</section>
		);
	}
}

Tracks.propTypes = {
	onUpdateReportGame: React.PropTypes.func,
	onSeatingUser: React.PropTypes.func,
	onLeaveGame: React.PropTypes.func,
	userInfo: React.PropTypes.object,
	gameInfo: React.PropTypes.object,
	socket: React.PropTypes.object
};