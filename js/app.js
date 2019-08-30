//aiming for "Exceeds Expecations" but will accept a "Meets Expectations" grade

//initalizing game object
let game = null;

//adding event listener to the 'Start Game' Button
$('#btn__reset').on('click', function() {
    game = new Game();
    game.startGame();
});

//adding event listeners to each of the on screen keyboard buttons
$('.key').on('click', function(e) {
    console.log(e.target.innerHTML);
    game.handleInteraction(e.target);
});

//adding event listeners for physical keyboard, used to guess letters
//only takes values a-z, keycodes of 65-90
$(window).keydown(function(e) {
    let clickedButton = null;
    $('.key').each(function() {
        if ($(this).text() === e.key) {
            clickedButton = $(this);
        }
    })
    console.log(e.key, e.code, e.which, typeof(e.which));
    if (e.which > 64 && e.which < 91) {
        game.handleInteraction(clickedButton);
    }
});