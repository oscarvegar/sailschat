/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	add:function (req,res) {
		var data_from_client = req.params.all();
		if(req.isSocket){
			Chat.create(data_from_client).exec(function(error,data_from_client){
					console.info(data_from_client);
					Chat.publishCreate(data_from_client);
				}); 
		}else{
			Chat.publishCreate({});
		}
	},
	suscribe:function(req,res){
		if(req.isSocket){
			Chat.watch(req.socket);
			console.info( 'User subscribed to ' + req.socket.id );
		}else{
			res.json(500,{error:"Get out!"})
		}
	}
};

