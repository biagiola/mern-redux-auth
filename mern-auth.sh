#! /bin/bash

# if $1 === folder
# then
# 	cd codes/mern-redux-auth/ && ls
# else

	cd codes/mern-redux-auth

	# open vs code here
	code .

	# start back-end
	gnome-terminal --tab -- sh -c  "cd backendLocal && npm start"

	# start front-end
	npm start
    
