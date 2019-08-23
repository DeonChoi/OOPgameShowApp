/* Project 4 - OOP Game App
 * app.js */

let game = null;
$('#btn__reset').on('click', function() {
    $('#phrase ul li').remove();
    $('.key').prop('disabled', false).addClass('key').removeClass('chosen wrong');
    $('.tries img').remove();
    $('.tries').append('<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">');
    game = new Game();
    game.startGame();
});

//adding event listeners to each of the on screen keyboard buttons
$('.key').on('click', function(e) {
    game.handleInteraction(e.target);
});