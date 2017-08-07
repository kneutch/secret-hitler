var passport = require('passport');
var Account = require('../models/account');


module.exports.authTumblr = function (token, tokenSecret, profile, done) {
    var searchQuery = {
      username: profile.username
    };

    var NewUser = new Account({
      username: profile.username,
      gameSettings: {
        disablePopups: false,
        enableTimestamps: false,
        disableRightSidebarInGame: false,
        enableDarkTheme: false
      },
      verification: {
        email: '',
        verificationToken: '',
        verificationTokenExpiration: null,
        passwordResetToken: '',
        passwordResetTokenExpiration: null
      },
      verified: true,
      games: [],
      wins: 0,
      losses: 0,
      created: new Date(),
      signupIP: '127.0.0.1'
    });

	Account.findOne(searchQuery,
	 function (err, user) {
      	if (err) {
        	return done(err);
      	}
  	  	if (!user){
			    NewUser.save(function(err) {
            if (err) console.log(err);
                return done(null, user);
            });
	  	  } 	  
  		  else {
        	return done(null, user);
      	}
    })
  };



module.exports.authTwitter = function (token, tokenSecret, profile, done) {
   
    var searchQuery = {
      username: profile.username
    };
		console.log(profile);

    var NewUser = new Account({
				username : profile.username,
				avatar : profile._json.profile_image_url_https,
				gameSettings: {
					disablePopups: false,
					enableTimestamps: false,
					disableRightSidebarInGame: false,
					enableDarkTheme: false
				},
				verification: {
					email:  '',
					verificationToken: '',
					verificationTokenExpiration: null,
					passwordResetToken: '',
					passwordResetTokenExpiration: null
				},
				verified: true,
				games: [],
				wins: 0,
				losses: 0,
				created: new Date(),
				signupIP: '127.0.0.1'
			});

console.log(NewUser);
    // update the user if s/he exists or add a new user
  	Account.findOne(searchQuery,
	 	function (err, user) {
      		if (err) {
        		return done(err);
      		}
	  		if (!user){
				NewUser.save(function(err) {
            		if (err) console.log(err);
                	return done(err, user);
            	});
	  		} 	  
			else {
        		return done(null,user);
      		}
    	})
  };
module.exports.authGoogle = function (token, tokenSecret, profile, done) {

    var searchQuery = {
      username: profile.displayName
    };

    var NewUser = new Account({
				username : profile.displayName,
				gameSettings: {
					disablePopups: false,
					enableTimestamps: false,
					disableRightSidebarInGame: false,
					enableDarkTheme: false
				},
				verification: {
					email:  '',
					verificationToken: '',
					verificationTokenExpiration: null,
					passwordResetToken: '',
					passwordResetTokenExpiration: null
				},
				verified: true,
				games: [],
				wins: 0,
				losses: 0,
				created: new Date(),
				signupIP: '127.0.0.1'
			});

    // update the user if s/he exists or add a new user
  	Account.findOne(searchQuery,
	 	function (err, user) {
      		if (err) {
        		return done(err);
      		}
	  		  if (!user){
				    NewUser.save(function(err) {
              if (err) console.log(err);
                return done(err, user);
            	});
	  		} 	  
			else {
        		return done(null, user);
      		}
    	})
  	};


module.exports.authReddit = function (token, tokenSecret, profile, done) {
  var searchQuery = {
      username: profile.name
    };

    var NewUser = new Account({
				username : profile.name,
				gameSettings: {
					disablePopups: false,
					enableTimestamps: false,
					disableRightSidebarInGame: false,
					enableDarkTheme: false
				},
				verification: {
					email:  '',
					verificationToken: '',
					verificationTokenExpiration: null,
					passwordResetToken: '',
					passwordResetTokenExpiration: null
				},
				verified: true,
				games: [],
				wins: 0,
				losses: 0,
				created: new Date(),
				signupIP: '127.0.0.1'
			});


	Account.findOne(searchQuery,
	 	function (err, user) {
      		if (err) {
        		return done(err);
      		}
	  		if (!user){
				NewUser.save(function(err) {
            		if (err) console.log(err);
                	return done(err, user);
            	});
	  		} 	  
			else {
        		return done(null, user);
      		}
    	})
	};
