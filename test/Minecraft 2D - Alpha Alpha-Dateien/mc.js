//MC
var TILE = 32,
	MAP = {},
	players = {},
	inventory = [],
	selected = 0,
	me,
	W = 512,
	H = 416,
	TW = W / TILE,
	TH = H / TILE,
	GRIDPORT = "",
	LIGHT = 10,
	surface = {},
	socket = io.connect("http://webtop.co:8056");

function toGrid(n) {
	if(!(n % TILE)) return n;
	return Math.floor(n / TILE) * TILE;
};

function setupPlayer() {
	me = Crafty.e("2D, Canvas, player, Controls, Twoway, Collision")
			.crop(6,0,20,64)
			.twoway(2,6.5)
			.attr({x: Crafty.viewport.width / 2, z: 2, chunk: [0, 0], location: "", loading: 0, _gy: 0, _gravity: 0.2, _falling: true})
			.bind("KeyDown", function(e) {
				if(this.isDown(Crafty.keys.A) || this.isDown(Crafty.keys.LEFT_ARROW));
					//this.sprite(36,2,1,2);
				if(this.isDown(Crafty.keys.D) || this.isDown(Crafty.keys.RIGHT_ARROW));
					//this.sprite(37,2,1,2);
			})
			.bind("EnterFrame", function() {
				if(this._falling) {
					//if falling, move the players Y
					if(this._gy < 15) this._gy += this._gravity * 2;
					this.y += this._gy;
				} else {
					this._gy = 0; //reset change in y
				}
				
				var collision = this.hit("Solid"),
					dx, dy, i = 0, l = collision.length, box;
					
				//if colliding with a block
				if(collision) {
					
					for(; i < l; ++i) {
						box = collision[i].obj;
						
						//object must be solid
						dx = Math.abs(box._x - this._x);
						dy = Math.abs(box._y - (this._y + this._h));
						
						//check gravity first
						if(dy <= TW && this._falling) {
							this.y = box._y - this._h;
							this._falling = false;
							if(this._up) this._up = false;
						} else {
							//if sticking out of the ground
							if(dy > TW) {
								//check for above blocks
								if(dy - this._h > TW) {
									this.y = box._y + TILE;
								} else {
									//check for player walking left
									if(dx > TW && this._x > box._x) {
										this.x = box._x + TILE;
									}
									
									//check for player walking right
									if(dx - this._w < TW && this._x < box._x) {
										this.x = box._x - this._w;
									}
								}
							}
						}
					}
				} else {
					this._falling = true;
				}
				
				var key = toGrid(this._x) + "," + toGrid(this._y); 
				if(key !== this.location) {
					this.location = key;
					
					//send to the server
					socket.emit("updatepos", {chunk: this.chunk, pos: {x: this._x, y: this._y}});
				}
				
				if(this._x + Crafty.viewport._x < Crafty.viewport.width / 4) {
					Crafty.viewport.x += 2;
				}
				
				if(this._x + this._h + Crafty.viewport._x > Crafty.viewport.width - (Crafty.viewport.width / 4)) {
					Crafty.viewport.x -= 2;
				}
				
				if(this._y + Crafty.viewport._y < Crafty.viewport.height / 4) {
					Crafty.viewport.y += this._gy;
				}
				
				if(this._y + this._h + Crafty.viewport._y > Crafty.viewport.height - (Crafty.viewport.height / 4)) {
					Crafty.viewport.y -= this._gy;
					this._up = false;
				}
				
				//check if the viewport is in another grid block
				var currentChunk = Math.floor(-Crafty.viewport._x / TILE) + ',' + Math.floor(-Crafty.viewport._y / TILE);
				if(currentChunk !== GRIDPORT) {
					GRIDPORT = currentChunk;
					sunLight();
				}
				
				if(this.loading) return;
				
				//look further to account for network lag
				var w = Math.floor((-Crafty.viewport._x + W) / W),
					e = Math.floor((-Crafty.viewport._x) / W),
					s = Math.floor((-Crafty.viewport._y + H) / H),
					n = Math.floor((-Crafty.viewport._y) / H),
					count = 0;
					
				
				if(e != this.chunk[0] && !MAP[e + "," + this.chunk[1]]) {
					socket.emit("newchunk", e, this.chunk[1]);
					count++;
				}
				
				if(w != this.chunk[0] && !MAP[w + "," + this.chunk[1]]) {
					socket.emit("newchunk", w, this.chunk[1]);
					count++;
				}
				
				if(n != this.chunk[1] && !MAP[this.chunk[0] + "," + n]) {
					socket.emit("newchunk", this.chunk[0], n);
					count++;
				}
				
				if(s != this.chunk[1] && !MAP[this.chunk[0] + "," + s]) {
					socket.emit("newchunk", this.chunk[0], s);
					count++;
				}
				
				if(n != this.chunk[1] && e != this.chunk[0] && !MAP[e + "," + n]) {
					socket.emit("newchunk", e, n);
					count++;
				}
				
				if(n != this.chunk[1] && w != this.chunk[0] && !MAP[w + "," + n]) {
					socket.emit("newchunk", w, n);
					count++;
				}
				
				if(s != this.chunk[1] && e != this.chunk[0] && !MAP[e + "," + s]) {
					socket.emit("newchunk", e, s);
					count++;
				}
				
				if(s != this.chunk[1] && w != this.chunk[0] && !MAP[w + "," + s]) {
					socket.emit("newchunk", w, s);
					count++;
				}
				
				this.chunk[0] = Math.floor(this._x / W);
				this.chunk[1] = Math.floor(this._y / H);
				
				this.loading = count;
			});
}

function loadMap(chunk, data) {
	var c = chunk.split(","),
		x = 0, xlen, y, ylen,
		cx = +c[0] * W, cy = +c[1] * H,
		block,
		flag = false;
		
	//set or get the data
	if(MAP[chunk] && !data) data = MAP[chunk];
	else MAP[chunk] = data;
	
	xlen = data.length;	
	
	//loop over x
	for(; x < xlen; ++x) {
		flag = false;
		
		//loop y
		for(y = 0, ylen = data[x].length; y < ylen; ++y) {
			//skip if no block
			if(!data[x][y]) continue;
			
			//if flag is false or no surface or current surface block lower than this
			if(!flag && (!surface[+c[0] * TW + x] || surface[+c[0] * TW + x] > +c[1] * TH + y)) {
				
				
				//save the surfaces for lighting
				surface[+c[0] * TW + x] = +c[1] * TH + y;
				flag = true;
			}
			
			block = SpriteMap[data[x][y]];
			
			data[x][y] = Crafty.e("Block").block(block, chunk, cx + x * TILE, cy + y * TILE, x, y);
		}
	}
	
	sunLight();
}

$(function() {
	Crafty.init(512, 416);
	
	//preload all assets
	Crafty.load(["assets/Blockworld.png"], function() {
		$("#login").show();
		
		$("#subm").click(function() {
			var name = $("#nick").val();
			socket.on("error", function() {
				$("#login .msg").show();
			});
			
			socket.on("generate", function(data) {
				$("#login").hide();
				$("#subm").unbind();
				
				MAP["0,0"] = data;
				
				Crafty.scene("main");
			});
			
			socket.emit("name", name);
		});
		
		generateSprites();
		initList();
	});
	
	Crafty.scene("main", function() {
		$("#inventory").show();
		setupPlayer();
		loadMap("0,0");
		
		socket.on("playermove", function(data) {
			//create player if not exists
			var p, x, y, chunk, pos;
			if(!players[data.name]) 
				players[data.name] = Crafty.e("NPC").npc(data.name);
				
			p = players[data.name];
			chunk = data.pos.chunk;
			pos = data.pos.pos;
			
			x = pos.x;
			y = pos.y;
			
			p.attr({x: x, y: y});
		});
		
		socket.on("playerleave", function(name) {
			if(players[name]) {
				players[name].destroy();
				delete players[name];
			}
		});
		
		socket.on("newchunk", function(data) {
			me.loading--;
			loadMap(data.key, data.data);
		});
		
		socket.on("blockchange", function(data) {
			//don't care
			if(!MAP[data.chunk]) return;
			var c = data.chunk.split(",");
			
			//if it was a surface block
			console.log("BC", c[0], data.x, c[1], data.y);
			if(surface[c[0] * 15 + data.x] >= c[1] * 12 + data.y) {
				//increment or decrement the surface block
				if(data.a === 0) {
					surface[c[0] * TW + data.x]++;
				} else {
					surface[c[0] * TW + data.x] = c[1] * TH + data.y;
				}
			}
			
			if(data.a === 0) {
				var b = MAP[data.chunk][data.x][data.y];
				if(b) b.destroy();
				delete MAP[data.chunk][data.x][data.y];
			} else if(data.a === 1) {
				var c = data.chunk.split(","),
					cx = +c[0] * W, cy = +c[1] * H,
					x = data.x, y = data.y,
					block = SpriteMap[data.b],
					b;
					
				//remove it if it exists
				if(MAP[data.chunk][x][y]) MAP[data.chunk][x][y].destroy();
				delete MAP[data.chunk][x][y];
				
				MAP[data.chunk][x][y] = Crafty.e("Block").block(block, data.chunk, cx + x * TILE, cy + y * TILE, x, y);
			}
			
			sunLight();
		});
		
		$(Crafty.stage.elem).mousedown(clickHandler);
		$(document).mousewheel(scroll);
		
		var open = false;
		$(document).keydown(function(e) {
			if(e.which === Crafty.keys.E || e.which === Crafty.keys.I) {
				if(open) {
					$(Crafty.stage.elem).mousedown(clickHandler);
					$("#list").hide();
					open = false;
				} else {
					$(Crafty.stage.elem).unbind("mousedown", clickHandler);
					$("#list").show();
					open = true;
				}
			}
		});
	});
});

function initList() {
	var i = 0, s = SpriteMap, l = s.length,
		html = "", o;
	
	for(; i < l; ++i) {
		o = SpriteMap[i];
		
		html += "<li data-id='"+i+"' style='background: url(assets/Blockworld.png) no-repeat ";
		html += "-" + (Sprites[o][0] * TILE) + "px -" + (Sprites[o][1] * TILE) +"px";
		html += "'></li>"
	}
	
	$("#list ul").html(html);
	var list = $("#list li");
	list.click(function() {
		var i = +$(this).attr("data-id"),
			s = Sprites[SpriteMap[i]];
			
		inventory[selected] = i;
		$("#inventory a").eq(selected).css("background", "url(assets/Blockworld.png) no-repeat -" + (s[0] * TILE) + "px -" + (s[1] * TILE) +"px");
	});
}

function clickHandler(e) {
	var block,
		type = SpriteMap[inventory[selected]],
		c;
	
	if(e.which === 1) {
		block = findBlock(e);
		if(block) {
            if(block.chunk === "0,0") return;
			socket.emit("updatemap", {a: 0, x: block.col, y: block.row, chunk: block.chunk});
			c = block.chunk.split(',');
			
			delete MAP[block.chunk][block.col][block.row];
			block.destroy();
			
			//if the block destroyed was a surface block, decrement the position
			if(surface[c[0] * TW + block.col] === c[1] * TH + block.row) {
				//increment or decrement the surface block
				surface[c[0] * TW + block.col]++;
			}
			
			sunLight();
		}
	} else if(e.which === 3) {
		//if nothing selected, don't place anything
		if(inventory[selected] === undefined) {
			return;
		}
		
		block = Crafty.DOM.translate(e.clientX, e.clientY);
		
		var c1 = Math.floor(block.x / W),
			c2 = Math.floor(block.y / H),
			chunk = c1 + "," + c2,
			cx = Math.floor(block.x / W) * W,
			cy = Math.floor(block.y / H) * H,
			x = Math.floor((block.x - cx) / TILE),
			y = Math.floor((block.y - cy) / TILE),
			test = false;
		
        if(chunk === "0,0") return;
		//within reach 
		if(Math.abs(block.x - (me._x + 10)) < 60 && Math.abs(block.y - (me._y + TILE)) < 60) {
			//if block contained
			if(!MAP[chunk][x] || MAP[chunk][x][y]) {
				console.log("no chunkm");
				return;
			}
			
			//check in other chunks
			if(x === 0) {
				test = !!MAP[(c1 - 1) + "," + c2][15][y];
			}
			
			if(!test && y === 0) {
				test = !!MAP[c1 + "," + (c2 - 1)][x][12];
			}
			
			if(!test && x === 15) {
				test = !!MAP[(c1 + 1) + "," + c2][0][y];
			}
			
			if(!test && y === 12) {
				test = !!MAP[c1 + "," + (c2 + 1)][x][0];
			}
				
			//check in current chunk
			if(!test && x > 0 && x < 15 && y > 0 && y < 12 && !MAP[chunk][x-1][y] && !MAP[chunk][x][y-1] && !MAP[chunk][x+1][y] && !MAP[chunk][x][y+1]) {
				return;
			}
			
			MAP[chunk][x][y] = Crafty.e("Block").block(type, chunk, block.x, block.y, x, y);
			
			console.log("check surface", surface[c1 * TW + x] > c2 * TH + y, surface[c1 * TW + x], c2 * TH + y);
			if(surface[c1 * TW + x] > c2 * TH + y) {
				//increment or decrement the surface block
				surface[c1 * TW + x] = c2 * TH + y;
			}
							
			sunLight();
			socket.emit("updatemap", {a: 1, x: x, y: y, b: inventory[selected], chunk: chunk});
		}
	}
}

function scroll(e,d) { //Scroll through inventory
	var s = selected;
	
	function select(i) {
		var list = $("#inventory a");
		list.parent().removeClass('over');
		list.eq(i).parent().addClass('over');
		selected = i;
	}
	
	if(d < 0) {
		if(s + 1 >= 9) s = -1;
		select(s + 1 % 9);
	} else {
		if(s - 1 < 0) s = 9;
		select(s - 1 % 9);
	}
	
	e.preventDefault();
	return false;
}

function findBlock(e) {
	//starting point
	var x0 = me._x + 10,
		y0 = me._y + TILE,
		//get the position on the stage (not the document)
		trans = Crafty.DOM.translate(e.clientX, e.clientY),
		//end point
		x1 = trans.x,
		y1 = trans.y,
		dx = Math.abs(x1 - x0),
		dy = Math.abs(y1 - y0),
		x = x0,
		y = y0,
		n = 100,
		x_inc = (x1 > x0) ? 1 : -1,
		y_inc = (y1 > y0) ? 1 : -1,
		error = dx - dy;
		
	dx *= 2;
	dy *= 2;

	for (; n > 0; n-=1) {
		//find along the path in the Crafty HashMap
		var q = Crafty.map.search({_x: ~~x, _y: ~~y, _w: 1, _h: 1}),
			i = 0, l = q.length,
			found, current;
			
		for(;i<l;++i) {
			current = q[i];
			if(current !== me && current._visible && current.__c.Block) {
				found = current;
				break;
			}
		}
		
		if(found) {
			return found;
		}

		if (error > 0) {
			x += x_inc;
			error -= dy;
		} else {
			y += y_inc;
			error += dx;
		}
	}
}

Crafty.c("NPC", {
	init: function() {
		this.addComponent("2D, DOM, player_u");
		
		//remove the nametag
		this.bind("Remove", function() {
			this.text.destroy();
		});
	},
	
	npc: function(name) {
		this.text = Crafty.e("2D, DOM, Text, Name")
			.attr({w: 50, h: 20, x: this._x - 10, y: this._y - 20})
			.text(name);
		this.attach(this.text);
		
		return this;
	}
});

Crafty.c("Block", {
	_light: 0, //0 none, 10 dark
	_settings: null,
	
	init: function() {
		this.addComponent("2D, Canvas");
		
	},
	
	block: function(type, chunk, x, y, col, row) {
		this.addComponent(type, "Tint");
		this.attr({
			type: type,
			x: toGrid(x),
			y: toGrid(y),
			col: col,
			row: row,
			chunk: chunk
		});
		this.setLight(this._light);
		
		this._settings = SpriteSettings[type];
		
		if(this._settings.solid) {
			this.addComponent("Solid");
		}
		
		if(this._settings.light && this._settings.light !== -1) {
			this.addComponent("Light");
			this.light(this._settings.light);
		}
		
		return this;
	},
	
	/**
	* Add light to a block
	* 0 darkest .. 10 brightest
	*/
	setLight: function(level) {
		this._light = (10 - level) / 10;
		
		//cap the levels
		if(this._light > 1.0) this._light = 1.0;
		else if(this._light < 0) this._light = 0.0;
		
		this.tint("#000000", this._light);
	},
	
	/**
	* Get the leve of light
	*/
	getLight: function() {
		return 10 - this._light * 10;
	}
});

/**
* Emits light in a 2D map
*/
Crafty.c("Light", {
	light: function(radius) {
		var x = this._x - radius * TILE,
			y = this.y - radius * TILE,
			w = radius * TILE * 2,
			h = w,
			dx, dy,
			r, i = 0, l, tile,
			decay = ~~(10 / radius);
		
		r = Crafty.map.search({_x: x, _y: y, _w: w, _h: h}, true);
		l = r.length;
		
		console.log("search", r);
		
		//loop over everything found
		for(;i < l; ++i) {
			tile = r[i];
			if(!tile.__c.Block) continue;
			
			dx = ~~(Math.abs(this._x - tile._x) / TILE);
			dy = ~~(Math.abs(this._y - tile._y) / TILE);
			
			console.log(tile.getLight() + decay * (radius - (Math.min(dx, dy) - 1)));
			
			tile.setLight(tile.getLight() + decay * (radius - Math.min(dx, dy)));
		}
	}
});

/**
* Translate the x and y into the actual
* position in the map
*/
function translate(x, y) {
	var cx = Math.floor(x / TW),
		cy = Math.floor(y / TH);
	
	if((x = x % TW) < 0) x = TW + x;
	if((y = y % TH) < 0) y = TH + y;
	
	if(!MAP[cx + ',' + cy] || !MAP[cx + ',' + cy][x]) {
		return;
	}
	
	return MAP[cx + ',' + cy][x][y];
}

function sunLight() {
	var cx = Math.floor(-Crafty.viewport._x / W),
		cy = Math.floor(-Crafty.viewport._y / H),
		
		x1 = Math.floor((-Crafty.viewport._x - cx * W) / TILE),
		x2,
		y1 = Math.floor((-Crafty.viewport._y - cy * H) / TILE),
		
		x, y, miny = cy * TH + y1, tile, light, surf;
	
	
	//loop over every X in the map
	for(x = cx * TW + x1, x2 = x + TW + 1; x < x2; ++x) {
		decay = LIGHT;
	    surf = surface[x];
		
		//loop over every Y in the map
		for(y = surf, y2 = miny + TH + 1; y < y2; ++y) {
			tile = translate(x, y);
			
			if(tile && tile.__c.Block) {
				if(tile._settings.light !== -1) {
					decay--;
				} else {
					tile.setLight(LIGHT);
					continue;
				}
				
				//change lighting for blocks on screen 
				if(y >= miny) {
					tile.setLight(decay);
				}
			}
			
		}
	}
}
