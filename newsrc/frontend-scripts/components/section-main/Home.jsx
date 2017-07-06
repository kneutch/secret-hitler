import React from 'react';
import $ from 'jquery';
var ons = require('onsenui');
var Ons = require('react-onsenui');


export default class Home extends React.Component {
	constructor() {
		super();
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleTwitter(e){
		e.preventDefault();
		window.location.assign('/auth/twitter');	
	}

	handleGoogle(e){
		e.preventDefault();
		window.location.assign('/auth/google');	
	}

	handleReddit(e){
		e.preventDefault();
		window.location.assign('/auth/reddit');	
	}

	handleTumblr(e){
		e.preventDefault();
		window.location.assign('/auth/tumblr');	
	}

	handleLogin(event){
		console.log(event);
		event.preventDefault();
		const username = $('#signin-username').val(),
			password = $('#signin-password').val(),
			$loader = $(this).next(),
			$message = $loader.next(),
			submitErr = message => {
				$loader.removeClass('active');
				$message.text(message).removeClass('hidden');
			};

		$loader.addClass('active');

		$.ajax({
			url: '/account/signin',
			method: 'POST',
			contentType: 'application/json; charset=UTF-8',
			data: JSON.stringify({username, password}),
			statusCode: {
				200() {
					if (window.location.pathname === '/observe') {
						window.location.pathname = '/game';
					} else {
						window.location.reload();
					}
				},
				400() {
					submitErr('Sorry, that request did not look right.');
				},
				401() {
					submitErr('Sorry, that was not the correct password for that username.');
				}
			}
		}); 
	}

	render() {
		return (
		<Ons.Page className="login-page">
			<section >
				<div>
					<img className='loginIcon' src="/stop-snitching.png" />
				</div>
				<h2 style={{textAlign: 'center', color:'black', backgroundColor:'yellow', boxShadow:'0px 0px 40px black' }} >Sign in to your account</h2>
  				<form style={{textAlign: 'center', maxWidth: '200px', margin: 'auto'}} className="">
    				<div className="field">
      					<div className="ui left icon input">
							<i className="user icon"></i>
        					<input id="signin-username" placeholder="Username"/>
      					</div>
    				</div>
    				<div className="field">
      					<div className="ui left icon input">
							<i className="lock icon"></i>
        					<input id="signin-password" placeholder="Password" type="password"/>
      					</div>
    				</div>
    				<button className="ui primary button fluid large" onClick={this.handleLogin}>Submit</button>   				<div className="ui dimmer inverted">
	      				<div className="ui text loader">Signing in..</div>
    				</div>
    				<div className="ui negative hidden message"></div>
					<hr/>
					<button onClick={this.handleTwitter} className="loginBtn loginBtn--twitter">Login with Twitter</button>
					<button onClick={this.handleGoogle} className="loginBtn loginBtn--google">Login with Google</button>
					<button onClick={this.handleReddit} className="loginBtn loginBtn--reddit">Login with Reddit</button>
					<button onClick={this.handleTumblr} className="loginBtn loginBtn--tumblr">Login with Tumblr</button>


 				</form>
			</section>
			<section className="password-reset-modal ui modal small segment column">
  				<h2 className="header">Request a password reset</h2>
  				<form className="ui form">
    				<div className="field">
      					<div className="ui left icon input">
							<i className="user icon"></i>
        					<input id="password-reset-email" placeholder="Verified email address" spellCheck="false"/>
      					</div>
    				</div>
    				<button id="password-reset-submit" className="ui primary button fluid large">Submit</button>
    				<div className="ui dimmer inverted">
      					<div className="ui text loader">Checking your account..</div>
    				</div>
    				<div className="ui negative hidden message"></div>
    				<div className="ui info hidden message"></div>
  				</form>
			</section>
			<section className="signup-modal ui modal small segment column">
  				<h2 className="header">Sign up for an account</h2>
  				<form className="ui form">
    				<div className="field">
      					<div className="ui left icon input">
							<i className="user icon"></i>
        					<input id="signup-username" placeholder="Username" spellCheck="false"/>
      						</div>
      						<div className="ui info message hidden"></div>
    					</div>
    					<div className="field">
      					<div className="ui left icon input">
							<i className="lock icon"></i>
    	    				<input id="signup-password1" placeholder="Password" type="password" maxLength="255"/>
      					</div>
      					<div className="ui info message hidden"></div>
    				</div>
    				<div className="field">
      					<div className="ui left icon input">
							<i className="lock icon"></i>
        					<input id="signup-password2" placeholder="Repeat password" type="password" maxLength="255"/>
      					</div>
      					<div className="ui info message hidden"></div>
    				</div>
    				<button className="ui primary button fluid large signup-submit">Submit</button>
    				<div className="ui dimmer inverted">
      					<div className="ui text loader">Signing up..</div>
    				</div>
    				<div className="ui negative hidden message"></div>
    			</form>
			</section> 
		</Ons.Page>
		);
	}
}

Home.propTypes = {
	userInfo: React.PropTypes.object,
	midSection: React.PropTypes.string,
	gameList: React.PropTypes.array,
	onCreateGameButtonClick: React.PropTypes.func,
	onLoginButtonClick: React.PropTypes.func,
	socket: React.PropTypes.object
};