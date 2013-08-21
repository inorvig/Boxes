;(function(exports) {
	
    var dom = {
        //Returns the text of the element at the given html id
        getText: function (id) {
            return document.getElementById(id).innerHTML;
        },

        //Sets the text of the element at the given html id
        setText: function (id, text) {
            document.getElementById(id).innerHTML = text;
        },
		//Hides an element
        hide: function(id) {
            document.getElementById(id).style.display = "none";
        },
		//Shows an element
        inline: function(id) {
            document.getElementById(id).style.display = "inline";
        }
    };
	
    var Player = function(id, brain) {
        this.id = id;
        this.brain = brain;
    };
	
    Player.prototype = {
        setName: function(name) {
            this.name = name;
            dom.setText(this.id, this.salutation());
        },

        setNameFromPrompt: function() {
            this.setName(prompt("What's " + this.id + "'s name?",
                                this.id));
        },

        salutation: function() {
            return this.name !== undefined ? this.name : this.id;
        }
    };
	
    var Board = function(match, firstPlayer) {
        this.match = match;
        this.reset();
    };
	
    Board.prototype = {
        isGameOver: function() {
			console.log("square colors = ",this.squareColors());
			console.log('max = ',Math.max(this.colorSquares('rgb(0, 0, 255)'),this.colorSquares('rgb(0, 128, 0)')));
			console.log("min = ",Math.min(this.colorSquares('rgb(0, 0, 255)'),this.colorSquares('rgb(0, 128, 0)')));
			console.log('leftover = ',this.colorSquares("rgba(0, 0, 0, 0)"));
			return ((this.filledSquares() === this.squareColors().length)||
					(Math.min(this.colorSquares('rgb(0, 0, 255)'),this.colorSquares('rgb(0, 128, 0)'))+this.colorSquares("rgba(0, 0, 0, 0)")<
				 	Math.max(this.colorSquares('rgb(0, 0, 255)'),this.colorSquares('rgb(0, 128, 0)'))))            
        },

        gameOver: function() {
            if (this.isDrawn()) {
                alert("Cat's game!");
            } else if (this.isWon()) {
                var winner = this.isWinner(this.match.player1) ?
                    this.match.player1 :
                    this.match.player2;
                this.match.scores.increment(winner);
                alert(winner.salutation() + " won!");
            }
            this.reset();
        },
		
        isMoveAvailable: function (id) {
            return $(document.getElementById(id)).css("border") === "1px solid rgb(204, 204, 204)";
        },

        isDrawn: function() {
            return (this.colorSquares('rgb(0, 0, 255)') === this.colorSquares('rgb(0, 128, 0)'));
        },

        isWon: function() {
            return this.isWinner(this.match.player1) || this.isWinner(this.match.player2);
        },

        isWinner: function(player) {
			if (player.id=="Player 1"){
				return this.colorSquares('rgb(0, 0, 255)') > this.colorSquares('rgb(0, 128, 0)'); 	
			}
			else{
				return this.colorSquares('rgb(0, 0, 255)') < this.colorSquares('rgb(0, 128, 0)');
			}
        },
		
		colorSquares: function(color){
			return this.squareColors().filter(function(x) {
				return x == color;
			}).length
		},

        setCurrentPlayer: function(player) {
            this.currentPlayer = player;
            dom.setText('turn', player.salutation());
        },
		
        squareColors: function() {
            var squareColors = [];
			$('.square').each(function(i, obj) {
			    squareColors.push($(this).css("background-color"))
			});
            return squareColors;
        },

        filledSquares: function() {
            return this.squareColors().filter(function(x) {
                return x !== "rgba(0, 0, 0, 0)";
            }).length;
        },

        //Clears the board and sets the currentPlayer to player1
        reset: function (size) {
            this.setCurrentPlayer(this.match.player1);
		    var parent = $('<div />', {
		        class: 'grid',
		        width: 52 * size + 2*(size+1),
		        height: 52 * size + 2*(size+1),
		    }).addClass('grid').appendTo('body');
		    $('.grid').attr("size", size);
		    var row = 0;
		    var id = 0;
		    for (var i = 0; i < size; i++) {
		        for (var j = 0; j < size; j++) {
		            $('<div />', {
		                id: id,
		                height: 50
		            }).appendTo(parent);
		            $('<div />', {
		            }).addClass('square').appendTo('#'+String(id));
		            $('<div />', {
		                id: id + 1,
		                width: 50
		            }).appendTo(parent);
		            id+=2;
		        }
		        $('<div />', {
					id: id,
		            height: 50
		        }).appendTo(parent);
		        id++;
		        row += 2*size;
		    }
		    for (var k = 0; k < size; k++) {
		        $('<div />', {
		                id: id,
		            }).appendTo(parent);
		            $('<div />', {
		                id: id + 1,
		                width: 50
		            }).appendTo(parent);
		            id+=2;
		    }
        },
		
		playMove: function(div) {
            var mover = this.currentPlayer;
            var nextMover = match.otherPlayer(this.currentPlayer);
		    var size = $(".grid").attr("size");
		    var id = Number(div.id);
		    var current = $(document.getElementById(id)).css("border-style");
		    var after = $(document.getElementById(id + 1)).css("border-style");
		    var before = $(document.getElementById(id - 1)).css("border-style");
		    var twoAfter = $(document.getElementById(id + 2)).css("border-style");
		    var twoBefore = $(document.getElementById(id - 2)).css("border-style");
		    var left_below = $(document.getElementById(id + size * 2)).css("border-style");
		    var right_above = $(document.getElementById(id - size * 2)).css("border-style");
		    var below = $(document.getElementById(id + size * 2 + 1)).css("border-style");
		    var above = $(document.getElementById(id - size * 2 - 1)).css("border-style");
		    var right_below = $(document.getElementById(id + size * 2 + 2)).css("border-style");
		    var left_above = $(document.getElementById(id - size * 2 - 2)).css("border-style");
		    //check if left
		    if (current === "solid" && after === "solid" && twoAfter === "solid" && right_below === "solid") {
		        console.log("left");
				if (mover==this.match.player1){
					$('#'+String(id)).children().css("background","blue");
				}
				else{
					$('#'+String(id)).children().css("background","green")
				}
		    }
		    //check if right
		    if (current === "solid" && before === "solid" && twoBefore === "solid" && left_below === "solid") {
		        console.log("right");
				if (mover==this.match.player1){
					$('#'+String(id-2)).children().css("background","blue")
				}
				else{
					$('#'+String(id-2)).children().css("background","green")
				}
		    }
		    //check if top
		    if (current === "solid" && before === "solid" && after === "solid" && below === "solid") {
		        console.log("top");
				if (mover==this.match.player1){
					$('#'+String(id-1)).children().css("background","blue")
				}
				else{
					$('#'+String(id-1)).children().css("background","green")
				}
		    }
		    //check if bottom
		    if (current === "solid" && right_above === "solid" && above === "solid" && left_above === "solid") {
		        console.log("bottom");
				if (mover==this.match.player1){
					$('#'+String(id-size*2-2)).children().css("background","blue")
				}
				else{
					$('#'+String(id-size*2-2)).children().css("background","green")
				}
		    }
			if (this.isGameOver()) {
			    this.gameOver();
			}
			this.setCurrentPlayer(nextMover);
		},
		
        
    };
	
    var Scores = function() {
        var scores = { "player1 wins": 0, "player2 wins": 0 };

        var display = function() {
            for (var i in scores) {
                dom.setText(i, scores[i]);
            }
        };

        this.increment = function(player) {
            scores[player.id]++;
            display();
        };

        display();
    };
	
    function Match(player1Brain, player2Brain) {
        this.player1 = new Player("Player 1", player1Brain);
        this.player2 = new Player("Player 2", player2Brain);

        if (player1Brain === Player.HUMAN && player2Brain === Player.HUMAN) {
            this.player1.setNameFromPrompt();
            this.player2.setNameFromPrompt();
        } else if (player1Brain === Player.HUMAN && player2Brain === Player.COMPUTER) {
            this.player1.setName("You");
            this.player2.setName("Computer");
        }

        this.board = new Board(this, this.player1);
        this.scores = new Scores();
    };

    Match.prototype = {
        otherPlayer: function(player) {
            return player === this.player1 ? this.player2 : this.player1;
        },
    };

    var match = new Match(Player.HUMAN, Player.HUMAN);
	
	match.board.reset(5);	


	$(document).ready(function () {
	    $(".grid div").hover(

	    function () {
	        $(this).css("border-style", "solid");
	    },

	    function () {
	        if (!$(this).attr("clicked")) {
	            $(this).css("border-style", "dashed");
	        }
	    });
	    $(".grid div").click(function () {
			if (match.board.isMoveAvailable($(this).attr('id'))){
		        $(this).css("border", "1px solid #000");
		        $(this).attr("clicked", "true");
		        match.board.playMove(this);
			}
	    });
	});
	
    exports.reset = function () {		
		$('.grid').remove();
        board.reset(Number(document.getElementById('size').value));
    };
})(this);



