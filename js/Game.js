//declaring Game class
class Game {
    constructor() {
        //missed: used to track number of guesses by the player. initial value is 0
        this.missed = 0;
        //phrases: an array of Phrase objects to use with the game. For now, an empty array
        this.phrases = this.createPhrases();
        //activePhrase: the phrase object that's currently in play. initial value is null.
        this.activePhrase = null;
    }

    //Creates phrases for use in game
    //@return {array} An array of phrases that could be used in the game
    createPhrases() {
        const newPhrases = [];
        newPhrases.push(
            new Phrase('Life is like a box of chocolates'),
            new Phrase('There is no trying'),
            new Phrase('May the force be with you'),
            new Phrase('You have to see the matrix for yourself'),
            new Phrase('You talking to me')
        );
        return newPhrases;
    }

    //Begins game by selecting a random phrase and displaying it to the user
    startGame() {
        $('#overlay').hide();
        $('#phrase ul li').remove();
        $('.key').prop('disabled', false).addClass('key').removeClass('chosen wrong');
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        $('.tries img').remove();
        $('.tries').append('<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">');
    }

    //Selects random phrase from phrases property
    //@return {Object} Phrase object chosen to be used
    getRandomPhrase() {
        const randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return randomPhrase;
    }

    //This method checks to see if the player has revealed
    //all of the letters in the active phrase.
    checkForWin() {
        let count = 0;
        $('ul li').each(function() {
            if ($(this).hasClass('show')) {
                count += 1;
            }
        });
        if (count === this.activePhrase.phrase.replace(/\s/g, "").length) {
            return true;
        } else {
            return false;
        }
    }

    /*
    This method removes a life from the scoreboard, by replacing oneof the `liveHeart.png` 
    images with a `lostHeart.png` image (found in the `images` folder) and 
    increments the `missed` property. If the player has five missed guesses 
    (i.e they're out of lives), then end the game by calling the `gameOver()` method.
    */
    removeLife() {
        if (this.activePhrase.checkLetter() === false) {
            $('[alt="Heart Icon"]:first').remove();
            $('.tries:not(:has(img)):first').append('<img alt="Lost Heart" src="images/lostHeart.png" height="35" width="30">');
            //if a life is lost, the new 'lost heart' icon will shake for 0.5 seconds
            $('[alt="Lost Heart"]:last').addClass('shake');
            this.missed += 1;
        }
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    /*
    This method displays the original start screen overlay, and
    depending on the outcome of the game, updates the overlay `h1` element with a
    friendly win or loss message, and replaces the overlay’s `start` CSS class with
    either the `win` or `lose` CSS class.
    */
    gameOver(gameWon) {
        $('#overlay').show();
        if (gameWon === false) {
            $('h1#game-over-message').text('Sorry, better luck next time!');
            $('#overlay').removeClass('start win lose').addClass('lose');
            $('.key').prop('disabled', true);

            // $('#phrase ul li').remove();
            //$('.key').prop('disabled', false).addClass('key').removeClass('chosen wrong');
            //$('.tries img').remove();
            //$('.tries').append('<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">');
        } else {
            $('h1#game-over-message').text('Great job!');
            $('#overlay').removeClass('start win lose').addClass('win');
            $('.key').prop('disabled', true);

            //$('#phrase ul li').remove();
            //$('.key').prop('disabled', false).addClass('key').removeClass('chosen wrong');
            //$('.tries img').remove();
            //$('.tries').append('<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">');
        }
    }

    //method controls most of the game logic. 
    //It checks to see if the button clicked by the player matches a letter in the phrase
    //and then directs the game based on a correct or incorrect guess.
    handleInteraction(button) {
        if ($(button).attr('disabled')) {
            return;
        }
        const clickedLetter = $(button).text();
        //console.log(clickedLetter)
        if (this.activePhrase.checkLetter(clickedLetter) === true) {
            $(button).prop('disabled', true).addClass('chosen');
            this.activePhrase.showMatchedLetter(clickedLetter);
            if (this.checkForWin() === true) {
                this.gameOver(true);
            }
        } else {
            $(button).prop('disabled', true).addClass('wrong');
            this.removeLife();
        }

    }

    //similar to handleInteraction() above, except this method is strictly for use of physical keyboard
    // handleKeyboardInteraction(letter) {
    //     const clickedLetter = letter;
    //     let clickedButton = null;

    //     $('.key').each(function() {
    //         if ($(this).text() === clickedLetter) {
    //             clickedButton = $(this);
    //         }
    //     })

    //     if (this.activePhrase.checkLetter(clickedLetter) === true) {
    //         $(clickedButton).prop('disabled', true).addClass('chosen');
    //         this.activePhrase.showMatchedLetter(clickedLetter);
    //         if (this.checkForWin() === true) {
    //             this.gameOver(true);
    //         }
    //     } else {
    //         $(clickedButton).prop('disabled', true).addClass('wrong');
    //         this.removeLife();
    //     }
    // }
}