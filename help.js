class Help {
    constructor(message) {
        this.message = message;
        this.error = "404, i need help :(";
    }

    execute(){
        switch(this.message.toLowerCase()){
            case '!help?mode':
                return this.modeHelp();
                break;
            case '!help?dice':
                return this.diceHelp();
                break;
           default:
                return this.basicHelp();
                break;
        }
    }

    basicHelp(){
        try{
            console.log('!help (basic) called');
            var result = '```\nDas kann ich alles:\n\n';
            result += '!help?dice zeigt dir die Hilfe zu den Würfeln.\n';
            result += '!help?mode zeigt dir die Hilfe zu den verschiedenen Spielarten.\n';
            result += '!mode zeigt dir den globalen Spielmodus.\n';
            result += '!version zeigt dir die Version des Bots.\n';
            result += '!ping zeigt dir deine Latenz zum Bot.\n\n';
            result += 'Groß- und Kleinschreibung wird nicht berücksichtigt.\n```';
            return result;
        } catch(ex) {
            console.log(ex);
            return this.error;
        }
    }

    modeHelp(){
        try{
            console.log('!help (mode) called');
            var result = '```\n"Es gibt folgende Spielarten: "\n```';
            result += '```!mode?default - Keine Würfelregeln, normale Standardwürfel.\n';
            result += '\nRegelwerk:\n';
            result += 'Im Standard wird immer ein 6-seitiger Würfel gewürfelt. \n';
            result += '```!mode?shadowrun Würfelregeln von Shadorwrun.\n';
            result += '\nRegelwerk:\n';
            result += 'Im Standard wird immer ein 6-seitiger Würfel gewürfelt. \n';
            result += 'Eine 1 wird immer als Misserfolg gewertet\n';
            result += 'Eine 5 und 6 wird immer als Erfolg gewertet.\n```';
            result += '```\nDeine Spielart fehlt? Regelwerk an martin.rosbund@gmail.com senden :)\n```';
            return result;
        } catch(ex) {
            console.log(ex);
            return this.error;
        }
    }

    diceHelp(){
        try{
            console.log('!help (dice) called');
            var result = '```\nDu kannst mit dem Befehl "!roll" würfeln.\n```';
            result += '```\nSyntax:\n';
            result += '!roll[A][wB][?C]\n\n';
            result += 'A -> Anzahl der Würfel\n';
            result += 'w -> Pflicht, wenn B angegeben wird.\n';
            result += 'B -> Seiten des Würfels\n';
            result += '? -> Pflicht, wenn C angegeben wird.\n';
            result += 'C -> Beliebiger Infotext.\n```';
            result += '```\nBeispiele:\n';
            result += '!roll würfelt einen w6 genau 1-mal.\n';
            result += '!roll3 würfelt einen w6 genau 3-mal.\n';
            result += '!roll5w8 würfelt einen w8 genau 5-mal.\n';
            result += '!roll2w6?Wichtig würfelt einen w6 genau 3-mal und gibt die Info "Wichtig" aus.\n```';
            result += '```\nSummen:\n';
            result += 'Ersetzte !roll mit !sum, wenn du die Summe aller Würfel haben möchtest.\n```';
            return result;
        } catch(ex) {
            console.log(ex);
           return this.error;
        }
    }
}

module.exports = Help