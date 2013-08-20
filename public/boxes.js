;(function(exports) {

})(this);

function createGrid(size) {

    var parent = $('<div />', {
        class: 'grid',
        width: 52 * size + 2*(size+1),
        height: 52 * size + 2*(size+1)
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
}

function checkForSquare(div) {
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
		$('#'+String(id)).children().css("background","blue")
    }
    //check if right
    else if (current === "solid" && before === "solid" && twoBefore === "solid" && left_below === "solid") {
        console.log("right");
		$('#'+String(id-2)).children().css("background","blue")
    }
    //check if top
    else if (current === "solid" && before === "solid" && after === "solid" && below === "solid") {
        console.log("top");
		$('#'+String(id-1)).children().css("background","blue")
    }
    //check if bottom
    else if (current === "solid" && right_above === "solid" && above === "solid" && left_above === "solid") {
        console.log("bottom");
		$('#'+String(id-size*2-2)).children().css("background","blue")
    }
}


createGrid(5);



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
        $(this).css("border", "1px solid #000");
        $(this).attr("clicked", "true");
        checkForSquare(this);
    });
});

