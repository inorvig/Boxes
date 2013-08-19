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
            width: 50
        }).appendTo(parent);
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
    var tenAfter = $(document.getElementById(id + size * 2)).css("border-style");
    var tenBefore = $(document.getElementById(id - size * 2)).css("border-style");
    var elevenAfter = $(document.getElementById(id + size * 2 + 1)).css("border-style");
    var elevenBefore = $(document.getElementById(id - size * 2 - 1)).css("border-style");
    var twelveAfter = $(document.getElementById(id + size * 2 + 2)).css("border-style");
    var twelveBefore = $(document.getElementById(id - size * 2 - 2)).css("border-style");
    console.log("current: ", current, ", after: ", after, ", before: ", before, ", two after: ", twoAfter, ", twelve after: ", twelveAfter);
    //check if left
    if (current === "solid" && after === "solid" && twoAfter === "solid" && twelveAfter === "solid") {
        console.log("left");
    }
    //check if right
    else if (current === "solid" && before === "solid" && twoBefore === "solid" && tenAfter === "solid") {
        console.log("right");
    }
    //check if top
    else if (current === "solid" && before === "solid" && after === "solid" && elevenAfter === "solid") {
        console.log("top");
    }
    //check if bottom
    else if (current === "solid" && tenBefore === "solid" && elevenBefore === "solid" && twelveBefore === "solid") {
        console.log("bottom");
    }
}


createGrid(6);
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
