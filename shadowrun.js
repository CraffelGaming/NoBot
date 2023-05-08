const Dice = require('./dice.js');

class Shadowrun extends Dice {
    constructor(message) {
        super(message);
        this.goodDices = [5, 6]
        this.badDices = [1];
    }

      printResult(){
        var result = this.count + 'x einen w' + this.faces + ' gewürfelt: \n';
        var reducer = (accumulator, currentValue) => accumulator + currentValue;
        result += '[' + this.results.join(', ') + ']\n';

        if(this.isSum){
            result += 'Summe: ' + ( parseInt(this.results.reduce(reducer)) + parseInt(this.add) + parseInt(this.remove)) + '\n';
        } else if(this.faces === 6) {
            var good = this.results.filter(x => this.goodDices.includes(x)).length;
            var bad = this.results.filter(x => this.badDices.includes(x)).length;
        
            result += '**Erfolge: ' + good + '**\n';
            result += '**Misserfolge: ' + bad + '**';
    
            if(bad > good){
                result += '```diff\n- EPIC FAIL -\n```';
            }
    
            if(good == this.count){
                result += '```diff\n+ EPIC WIN +\n```';
            }
        }

        if(this.info.length > 0){
            result += '```fix\n Info: ' + this.info + '\n```';
        }

        return result;
      }
}

module.exports = Shadowrun