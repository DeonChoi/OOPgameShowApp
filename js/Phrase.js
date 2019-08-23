/* Project 4 - OOP Game App
 * Phrase.js */

//declaring Phrase class
class Phrase {
    //phrase: the phrase that the Phrase object is representing. 
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    //Display phrase on game board
    addPhraseToDisplay() {
        for (let i = 0; i < this.phrase.length; i++) {
            if (this.phrase.charAt(i) === ' ') {
                $('#phrase ul').append('<li class="space">' + this.phrase.charAt(i) + '</li>');
            } else {
                $('#phrase ul').append('<li class="letter">' + this.phrase.charAt(i) + '</li>');
            }
        }
    }

    //Checks to see if the letter selected by the player matches a letter in the phrase
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    //Reveals the letter(s) on the board that matches the player's selection.
    //To reveal the matching letter(s), select all of the letter DOM elements that
    //have a CSS class name that matches the selected letter and replace each
    //selected element's `hide` CSS class with the `show` CSS class
    showMatchedLetter(letter) {
        if (this.checkLetter(letter) === true) {
            $('.letter').each(function() {
                if ($(this).text() === letter) {
                    $(this).addClass('show');
                    $(this).removeClass('hide');
                }
            });
        }
    }
}