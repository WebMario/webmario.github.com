/**
 * @author vmadmin
 */
window.onload = function() {
	Crafty.init(640, 480).canvas.init();
	Crafty.background("black");

	Crafty.c("Mario", {
		lives : 2,
		unbreakable: false,
		unbreakableStart : 0,
		unbreakableEnd: 0,
		init : function() {

		},
		die : function() {
			this.lives--;
			if(new Date().getSeconds() >= this.unbreakableEnd){
				this.unbreakable = false;
			}
			if(this.lives <= 0 && this.unbreakable != true) {
				alert("Gameover");
				Crafty.pause();
			}else{
				this.makeunbreakable();
			}
		},
		goodie : function() {
			this.lives++;
		},
		makeunbreakable: function(){
			this.unbreakable = true;
			this.unbreakableEnd = new Date().getSeconds() + 1;
		}
	});
	
	
	Crafty.c("Enemy", {
		_live : true,
		init : function() {

		},
		die : function() {
			alert("test");
			this.lives = false;
			if(this.lives == false) {
				alert("Gameover");
			}
		},
		goodie : function() {
			this.lives++;
		}
	});

	Crafty.c("Camera", {
		init : function() {
		},
		camera : function(obj) {
			this.set(obj);
			var that = this;
			obj.bind("Moved", function(location) {
				that.set(location);
			});
		},
		set : function(obj) {
			Crafty.viewport.x = -obj.x + Crafty.viewport.width / 2;
			Crafty.viewport.y = -obj.y + Crafty.viewport.height / 2;
		}
	});

	var player = Crafty.e("2D, Mario, Canvas, Color, Player, Physics").color("white").attr({
		w : 50,
		h : 50,
		x : 126,
		y : 350
	});
	
	player.addComponent("Collision").onHit("Enemy", function(obj){
		player.die();
	});
	
	player.addComponent('Gravity').gravity("Floor");
	player.addComponent("Twoway").twoway(2)
	player.addComponent("Collision");
	var camera = Crafty.e("Camera").camera(player);

	var floor = Crafty.e("2D, Canvas, Color, Collision, Floor").color("blue").attr({
		h : 30,
		w : 400,
		x : 0,
		y : 380

	})
	var block = Crafty.e("Enemy, 2D, Canvas, Color, Collision, Floor").color("blue").attr({
		w : 50,
		h : 50,
		x : 190,
		y : 350

	})

};
