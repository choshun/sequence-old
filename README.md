## warShark

### Setup

1. make sure you have node, npm, and mongodb installed
2. Go to root
3. $ npm install
4. $ npm install -g bower
5. $ bower install
6. $ npm start
7. $ mongod (you may need to go to dir the executable is located, in my case /usr/local/Cellar/mongodb/2.6.5/bin since I installed via homebrew)
8. Go to  http://localhost:3000

### Helpful reading

* [MEAN stack intro tutorial (what I based the stack on)](https://thinkster.io/angulartutorial/mean-stack-tutorial/)
* [ui-router tutorial (what we're using for views/wiring controllers)](https://scotch.io/tutorials/angular-routing-using-ui-router)
* [mongoose docs (what we're using to create schemas for services))](http://mongoosejs.com/docs/index.html)
* [a pretty good tutorial on directives!, hopefully most of the stuff will be in directives and services](https://amitgharat.wordpress.com/2013/06/08/the-hitchhikers-guide-to-the-directive/)

### Hopes and Dreams

So I'm hoping all dom logic will be in a directive, that then sets the model from a call to a controller method from the directive (have a working example). All object logic will be in services. Because we load controllers based on states, I really hope there will be NO logic in the controller, only setting the model values the controller owns. dare 2 dream