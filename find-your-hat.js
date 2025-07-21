
const prompt = require('prompt-sync')({sigint: true});


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this._playerRow = 0;
        this._playerCol = 0;
        this._rows = 0;
        this._cols = 0;
        this._hatRow = 0;
        this._hatCol = 0;
        this.generateField();
    }
    

    generateField() {
        let fieldRows = Number(prompt('You lost your hat somewhere in a field. Generate the field. How many rows does your field have?'));
        this._rows = fieldRows;
        let fieldCols = Number(prompt('How many columns does your field have?'));
        this._cols = fieldCols;
        let newFieldArray = [];
        if ((typeof fieldRows === 'number') && (fieldRows > 2) && (typeof fieldCols === 'number') && (fieldCols > 2)) {
            for (let i = 0; i < fieldRows; i ++) {
                newFieldArray[i] = [];
                for (let j = 0; j < fieldCols; j++) {
                    newFieldArray[i][j] = 0;
                }
            }
        } else {
            console.log('You must enter a positive number greater than or equal to 3 for rows and for columns.');
            this.generateField();
        }
        for (let k = 0; k < fieldRows; k ++) {
            for (let l = 0; l < fieldCols; l ++) {
                let randomNumber = Math.floor(Math.random() * 5);
                switch (randomNumber) {
                    case 0:
                        newFieldArray[k][l] = hole;
                        break;
                    case 1:
                        newFieldArray[k][l] = fieldCharacter;
                        break;
                    case 2:
                        newFieldArray[k][l] = fieldCharacter;
                        break;
                    case 3:
                        newFieldArray[k][l] = fieldCharacter;
                        break;
                    case 4:
                        newFieldArray[k][l] = fieldCharacter;
                        break;
                    default:
                        console.error('There was an error. Start again.');
                        break;
                }
            }
        }
        let randomHatRow = Math.floor(Math.random() * (fieldRows - 1));
        this._hatRow = randomHatRow;
        let randomHatCol = Math.floor(Math.random() * (fieldCols - 1));
        this._hatCol = randomHatCol;
        newFieldArray[randomHatRow][randomHatCol] = hat;
        this.field = newFieldArray;
        if (this.field[0][0] === hat) {
            console.error('Sorry, your hat was randomly placed at your starting position, making for poor game play. We\'ll try again.')
            this.generateField();
        }
        this.field[0][0] = pathCharacter;
        this.printField();
        this.moveInitializer();
    }

    printField() {
        console.log(this.field.map((element) => element.join('')).join('\n'));
    }  
    moveInitializer() {
        let yourMove = prompt('Find your hat ^ in the field by using the WASD keys. The asterisk * marks your position. Avoid holes: O. Do not leave the field!');
        switch (yourMove) {
            case 'w':
                this.field[0][0] = fieldCharacter;
                this.printField();
                console.log('You left the field! You don\'t even want your hat? Sad. Play again!')
                this.generateField();
                break;
            case 'a':
                this.field[0][0] = fieldCharacter;
                this.printField();
                console.log('You left the field! You don\'t even want your hat? Sad. Play again!')
                this.generateField();
                break;
            case 's':
                this._playerRow = 1;
                this._playerCol = 0
                this.field[0][0] = fieldCharacter;
                if (this.field[this._playerRow][this._playerCol] === hole) {
                    console.log('You fell into a hole! Too bad. Play again!');
                    this.printField();
                    this.generateField();
                } else {
                    this.field[this._playerRow][this._playerCol] = pathCharacter;
                    this.printField();
                    this.moveAgain();
                }
                break;
            case 'd':
                this._playerCol = 1;
                this._playerRow = 0
                this.field[0][0] = fieldCharacter;
                if (this.field[this._playerRow][this._playerCol] === hole) {
                    console.log('You fell into a hole! Too bad. Play again!');
                    this.printField();
                    this.generateField();
                } else {
                    this.field[this._playerRow][this._playerCol] = pathCharacter;
                    this.printField();
                    this.moveAgain();
                }
                break;
            default:
                console.error('Use WASD keys to move. Or quit the game.');
                this.moveAgain();
                break;
        }
    }

    moveAgain() {
        let yourMove = prompt('Move again!');
            switch (yourMove) {
        case 'w':
            this._playerRow -= 1;
            this.field[this._playerRow + 1][this._playerCol] = fieldCharacter
            if (this._playerRow < 0) {
                console.log('You left the field! You don\'t even want your hat? Sad. Play again!');
                this.printField();
                this.generateField();
            } else if (this.field[this._playerRow][this._playerCol] === hole) {
                console.log('You fell into a hole! Too bad. Play again!');
                this.printField();
                this.generateField();
            } else if (this.field[this._playerRow][this._playerCol] === hat) {
                console.log('You found your hat! You\'re the winner! Play again!');
                this.field[this._hatRow][this._hatCol] = 'X';
                this.printField();
                this.generateField();
            } else {
                this.field[this._playerRow][this._playerCol] = pathCharacter;
                this.printField();
                this.moveAgain();
            }
            break;
        case 'a':
            this._playerCol -= 1;
            this.field[this._playerRow][this._playerCol + 1] = fieldCharacter;
            if (this._playerCol < 0) {
                console.log('You left the field! You don\'t even want your hat? Sad. Play again!')
                this.printField();
                this.generateField();
            } else if (this.field[this._playerRow][this._playerCol] === hole) {
                console.log('You fell into a hole! Too bad. Play again!');
                this.printField();
                this.generateField();
            } else if (this.field[this._playerRow][this._playerCol] === hat) {
                console.log('You found your hat! You\'re the winner! Play again!');
                this.field[this._hatRow][this._hatCol] = 'X';
                this.printField();
                this.generateField();
            } else {
                this.field[this._playerRow][this._playerCol] = pathCharacter;
                this.printField();
                this.moveAgain();
            }
            break;
        case 's':
            this._playerRow += 1;
            this.field[this._playerRow - 1][this._playerCol] = fieldCharacter;
            if (this._playerRow > (this._rows - 1)) {
                console.log('You left the field! You don\'t even want your hat? Sad. Play again!');
                this.printField();
                this.generateField();
            } else if (this.field[this._playerRow][this._playerCol] === hole) {
                console.log('You fell into a hole! Too bad. Play again!');
                this.printField();
                this.generateField();
            } else if (this.field[this._playerRow][this._playerCol] === hat) {
                console.log('You found your hat! You\'re the winner! Play again!');
                this.field[this._hatRow][this._hatCol] = 'X';
                this.printField();
                this.generateField();
            } else {
                this.field[this._playerRow][this._playerCol] = pathCharacter;
                this.printField();
                this.moveAgain();
            }
            break;
        case 'd':
            this._playerCol += 1;
            this.field[this._playerRow][this._playerCol - 1] = fieldCharacter;
            if (this._playerCol > (this._cols - 1)) {
                console.log('You left the field! You don\'t even want your hat? Sad. Play again!')
                this.printField();
                this.generateField();
            } else if (this.field[this._playerRow][this._playerCol] === hole) {
                console.log('You fell into a hole! Too bad. Play again!');
                this.printField();
                this.generateField();
            } else if (this.field[this._playerRow][this._playerCol] === hat) {
                console.log('You found your hat! You\'re the winner! Play again!');
                this.field[this._hatRow][this._hatCol] = 'X';
                this.printField();
                this.generateField();
            } else {
                this.field[this._playerRow][this._playerCol] = pathCharacter;
                this.printField();
                this.moveAgain();
            }
            break;
        default:
            console.error('Use WASD keys to move. Or quit the game (ctrl + c).');
            this.moveAgain();
            break;
        }
    }
}


const myField = new Field([
    ['*','░','░'],
    ['O','░','O'],
    ['░','░','^'],
])


// to do: add another percentage parameter to the generateField function that determines the percentage of places that have a hole
// to do: add conditions so that there cannot be more than two holes adjacent to each other, or something like that