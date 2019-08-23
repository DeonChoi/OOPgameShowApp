/* Project 4 - OOP Game App
 * Game.js */

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
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
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
            //this.gameOver(true);
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
            //$('li.tries:eq(0) img').remove();
            $('[alt="Heart Icon"]:first').remove();
            $('.tries:not(:has(img)):first').append('<img src="images/lostHeart.png" height="35" width="30">');
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
            $('#overlay').removeClass('start').addClass('lose');
        } else {
            $('h1#game-over-message').text('Great job!');
            $('#overlay').removeClass('start').addClass('win');
        }
    }

    handleInteraction(button) {
        console.log($(button).text());
        const clickedLetter = $(button).text();
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
}