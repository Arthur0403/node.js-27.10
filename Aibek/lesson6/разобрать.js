/*passport.use(new LocalStrategy((username,password,done)=>{
	if(username!==User.findOne('username')){
		return done(null,false);
	}
	if(!isValidPassword(user,password)){
		return done(null,false);
	}
	done(null, {username:User.username, name:User.name, age:'25'})
}));*/