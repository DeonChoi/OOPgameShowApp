//initalizing game object
let game = null;

//adding event listener to the 'Start Game' Button
$('#btn__reset').on('click', function() {
    game = new Game();
    game.startGame();
});

//event listeners to each of the on screen keyboard buttons
$('.key').on('click', function(e) {
    game.handleInteraction(e.target);
});

//event listeners for physical keyboard, used to guess letters
$(window).keydown(function(e) {
    let clickedButton = null;
    $('.key').each(function() {
            if ($(this).text() === e.key) {
                clickedButton = $(this)[0];
            }
        })
    if (e.which > 64 && e.which < 91) {
        game.handleInteraction(clickedButton);
    }
});