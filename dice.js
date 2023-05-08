const funny_errors = require('./funny_errors.json');

class Dice {

    constructor(message) {
        this.isSum = false;
        this.info = '';
        this.count = 1;
        this.faces = 6;
        this.results = [];
        this.add = 0;
        this.remove = 0;
        this.isToLong = false;
        this.countFunnyErrors = 25;

        if(message.startsWith('!sum')){
            console.log('!sum called');
            this.isSum = true;
        } else {
            console.log('!roll called');
        }

        this.message = message.replace('!roll','').replace('!sum','');
    }
    
    execute(){
        try{
            this.compileMessage();
    
            if(this.count > 0 && this.count < 101){
                if(this.faces > 0 && this.faces < 101){
                    if(this.faces > 1){
                        if(!this.isToLong){
                            this.rollDice();
                            return this.printResult();
                        } else return "Es kommt nicht immer auf die Länge an!";
                    } else return funny_errors[Math.floor((Math.random() * this.countFunnyErrors))];
                } else return "Das ist eine Kugel!";
            } else return "So viele Würfel kann ich nicht halten :(";
        } catch(ex) {
            console.log(ex);
            return "Ich habe meinen Würfelbecher verloren :(";
        }
    }

    extractInformation(index_of_info_start){
        if(index_of_info_start > -1){
            this.info = this.message.substring(index_of_info_start + 1, this.message.length);
            this.message = this.message.substring(0, index_of_info_start).toLowerCase();

            console.log('message: ' + this.message);
            console.log('info: ' + this.info);
        } else {
            this.message = this.message.toLowerCase();
        }
    }

    extractAdd(index_of_add_start){
        if(index_of_add_start > -1){
            var tmp_add = this.message.substring(index_of_add_start + 1, this.message.length)

            if(tmp_add.length < 5){
                if (!isNaN(tmp_add) && tmp_add.length > 0){
                    this.add = parseInt(tmp_add);
                    console.log('add: ' + this.add);
                }
            } else this.isToLong = true;

            this.message = this.message.substring(0, index_of_add_start);
            console.log('message: ' + this.message);
        }
    }

    extractRemove(index_of_remove_start){
        if(index_of_remove_start > -1){
            var tmp_remove = this.message.substring(index_of_remove_start + 1, this.message.length)

            if(tmp_remove.length < 5){
                if (!isNaN(tmp_remove) && tmp_remove.length > 0){
                    this.remove = parseInt(tmp_remove) * -1;
                    console.log('remove: ' + this.remove);
                }
            } else this.isToLong = true;

            this.message = this.message.substring(0, index_of_remove_start);
            console.log('message: ' + this.message);
        }
    }

    extractDice(){
        if( this.message.indexOf('w') > -1){
            var split = this.message.split('w')
            if(!isNaN(split[0])){
                this.count = split[0];
            } else {
                this.count = 1;
            }

            if(!isNaN(split[1])){
                this.faces = split[1];
            } else {
                this.faces = 1;
            }
        }
        else if (!isNaN(this.message) && this.message.length > 0){
            this.count = this.message;
            this.faces = 6;
        }
    }

    compileMessage() {
        if(this.message.length > 0){
            var index_of_info_start = this.message.indexOf('?');
            var index_of_add_start = this.message.indexOf('+');
            var index_of_remove_start = this.message.indexOf('-');

            this.extractInformation(index_of_info_start);

            if(index_of_add_start > index_of_remove_start){
                this.extractAdd(index_of_add_start);
                this.extractRemove(index_of_remove_start);
            } else if(index_of_remove_start> index_of_add_start){
                this.extractRemove(index_of_remove_start);
                this.extractAdd(index_of_add_start);
            }

            this.extractDice();
        }

        console.log('count: ' + this.count);
        console.log('faces: ' + this.faces);
      }

      rollDice(){
        for(var i = 0; i < this.count; i++){
            var result = Math.floor((Math.random() * this.faces) + 1);
            this.results.push(result);
        }
        console.log('results: ' + this.results);
      }

      printResult(){
        var result = this.count + 'x einen w' + this.faces + ' gewürfelt: \n';
        var reducer = (accumulator, currentValue) => accumulator + currentValue;

        result += '[' + this.results.join(', ') + ']\n';

        if(this.isSum){
            result += 'Summe: ' + (parseInt(this.results.reduce(reducer)) + parseInt(this.add) + parseInt(this.remove)) + '\n';
        }

        if(this.info.length > 0){
            result += '```fix\n Info: ' + this.info + '\n```';
        }

        return result;
      }
}

module.exports = Dice