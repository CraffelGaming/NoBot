# Social Adventure

NoBot ist ein einfacher JavaScript Würfel Discord Bot für das P&P Spiel Shadowrun.

## Rechtliches und Lizenz
NoBot darf für nicht kommerzielle Zwecke verwendet werden. 
Die Angabe des Autors "Craffel (Martin Rosbund)" ist gut ersichtlich im Code und auf jeder Verlinkung / Webseite einzufügen.

## Installation für Entwickler
### Benötigte Anwendungen
- Visual Studio Code:https://code.visualstudio.com/download 
- GIT: https://git-scm.com/downloads
- Node.js: https://nodejs.org/en/download/

### Benötigte Anwendungen
- git clone https://github.com/CraffelGaming/NoNot

### Zusätzliche Dateien
Damit die Anwendung läuft, werden neben den GIT Repository folgende Daten benötigt:

- Discord-Authentification-Konfiguration: auth.json

### Discord-Authentification-Konfiguration
Die Datei auth.json” muss im Projekt-Root hinzugefügt werden.

{
	"token": "<private token>"
}

### Auf Discord Server hinzufügen
https://discord.com/api/oauth2/authorize?client_id=796362146501754921&permissions=274877975552&scope=bot