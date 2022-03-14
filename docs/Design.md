# TrackGuide - DESIGN

#### Song
Die Anwendung soll nach dem Prinzip bottom-up entworfen und programmiert werden. Aus diesem Grund starten wir bei unserer Implementierung mit dem kleinsten Element - dem Song. Die Klasse bzw. Prototyp "Song" wird als Modul mit entsprechenden Attributen wie ID, Titel, Interpret, Album-Name, Erscheingungsjahr, Songlänge und Song-Text entworfen. Im Modul werden Funktionen wie Updaten, Löschen und Abspielen eingebaut. Inhalte können mittels Copy und Paste in die entsprechenden Felder eingefügt werden. Dafür werden wir ein eigenens Modul entwerfen, welches die Texteingaben der Nutzer auswertet und im Song-Objekte in den entsprechenden Attributen speichert. Es können beliebig viele Objekte des Typs erzeugt werden. 

##### Songtext-Formatierung
Für die Songtext-Formatierung sind wir auf ChordPro gestoßen. Mit diesem Tool können Gitarren-Akkorde im Text entsprechend formatiert gespeichert werden. Unter folgenden Links finden sich einige Informationen über ChordPro:
https://www.chordpro.org/chordpro/
https://github.com/martijnversluis/ChordSheetJS
https://github.com/jperkin/chordpro.js/
https://codepen.io/gschoppe/pen/wqbJZp
###### Alternative
Im Designdokument werden Songs als zentrale Entität innerhalb der Anwendung beschrieben, zu denen unter anderem auch Liedtexte (Lyrics) und Notation gespeichert werden sollen. Diese müssen möglichst sauber formatiert und dargestellt werden. Als Alternativ zu ChordSheetJS käme MusicXML infrage. MusicXML ist die Standardmarkupsprache für die Notation von Musikstücken, erlaubt neben der Notation auch das Speichern von Liedtexten und kann über viele verschiedene Programme generiert und bearbeitet werden.
Für die Anwendung wäre es denkbar, dass Nutzer*innen neue Lieder per MusicXML-Datei importieren. Die Darstellung in der Webapp, d.h. das Rendern der Notation in Form von Noten, könnte über vexflow erfolgen, für das es ein MusicXML-Plugin gibt.


#### Setliste
Im nächsten Schritt, wird die Implementierung der Setlisten erfolgen. Ein Song kann zu einer oder im besten Fall auch zu mehreren Setlisten hinzugefügt werden. Es muss also möglich sein mehrere Setlisten zu erstellen und diesen Songs hinzuzufügen. Es bietet sich also an ein weiteren Modulprototypen für Setlisten zu entwerfen. Dieser sollte Funktionen für das Hinzufügen und Löschen von Songs haben. Außerdem sollten die Setlisten benannt werden können, sowie eine Änderung des Namens möglich sein. Um die Setlisten eindeutig voneinander unterschieden zu können, wird eine ID verwendet. Neben dem ID-Attribut, ist ein Array oder eine Liste notwendig in der die Songs der Setliste gespeichert werden können. Somit ergeben sich für den Setlisten-Prototypen als relevante Attribute Name, ID und Songliste. 

##### Setlisten Offline nutzbar machen
Setlisten können auch Offline zur Verfügung gestellt werden, für den Fall, dass nur eine schlechte Internetverbindung vorhanden ist. Dafür wollen wir das **Cache Manifest** verwenden (https://t3n.de/news/html5-websites-offline-nutzen-372444/ und https://wiki.selfhtml.org/wiki/JavaScript/Tutorials/App/Offline-Browsing). Dabei handelt es sich um eine Textdatei, in der angeben werden kann, welche Dateien der Browser zwischenspeichern und Offline-Nutzern zur Verfügung stellen soll. Im Cache gespeicherte Ressourcen liegen lokal vor und werden daher schneller geladen. Nur geänderte Dateien werden heruntergeladen, Serverlast und Datentransfermengen werden so reduziert. Der Nutzer kann für einzelne Playlists entscheiden, ob diese Offline verfügbar sein sollen. Im Idealfall wollen wir es den Nutzern ermöglichen, auch im Offline-Modus zwischen den Unterseiten navigieren zu können. 
 
#### Abspielen von Setlisten
Für das Abspielen von Setlisten, werden wir ein eigenes Modul implementieren. Diesem Modul stellt Funktionen zum Abspielen, Pausieren und Skippen von Songs bereit. Darüber hinaus ist ermöglicht dieses Modul die Anzeige des Songtextes, der automatisch in passender Geschwindigkeit gescrollt wird. Für das **Scrolling** wollen wir die scrollBy()-Funktion verwenden, die es ermöglicht eine Zeit zu übergeben (https://stackoverflow.com/questions/9837676/smooth-auto-scroll-by-using-javascript und https://www.easy-coding.de/Thread/14993-JS-Automatisch-auf-und-ab-scrollen/). Diese Zeit soll entweder aus der Länge des Songs berechnet werden oder aus der Angabe beatsPerMinute. Um die mögliche differenzen zwischen Anzeige des Textes auszugleichen, wollen wir einen größeren Ausschnit des Songtextes zeigen, wodurch kleine Abweichungen in der Anzeigegeschwindigkeit ausgeglichen werden können. Das Modul soll außerdem dem Nutzer Informationen über den gerade spielenden Song, bereitstellen. 
Das Modul wird mindestens eine Funktion haben, die in anderen Modulen aufgerufen werden kann. Dieser Funktion wird entweder ein Song oder eine Setliste übergeben, die abgespielt werden soll. Wir haben überlegt, dass es sinnvoll ist nur die ID der Songs in einem Array zu übergeben, und wir in dem Modul eine Funktion implementieren, die sich die entsprechenden Songs aus der Datenbank zieht. 


<!--#### Nutzer
Der Nutzer ist der relevanteste Teil unserer Anwendung. Über ihn wird die Verwaltung der Setlisten ablaufen. Er ist also das zentrale Element. Auch für ihn werden wir ein extra Modul schreiben, dass als Prototyp für alle Objekte der Nutzer gedacht ist. Der Prototyp wird sehr viele Informationen enthalten und als ganzes in der Datenbank gespeichert werden. Im Objekt "Nutzer" werden Informationen für die eindeutige Identifizierung und zur Prüfung beim Login, also NutzerID, Name und Passwort, gespeichert. Darüberhinaus wird eine Liste mit Setlisten vorhanden sein. In diesem Array wird von Anfang an eine Default-Setliste existieren, in der alle angelegten Songs gespeichert werden.
Wichtige Methoden für Objekte diesen Typs sind unserer Ansicht nach Ändern des Nutzernamens und Passworts. Methoden die Setlisten oder Songs betreffen, werden in die entsprechenden Module implementiert. Wenn es sinnvoll ist, werden einige relevante Methoden für die Verwendung in anderen Teilen der Anwendung zugänglich gemacht. -->

#### Persistieren der Daten --> Datenbank 
Die beste Möglichkeit für dieses Vorhaben scheint eine Datenbank zu sein. Sie ist die Schlüsselkomponente der Anwendung, in der die Setlisten und Song-Elemente gespeichert werden und damit für die Nutzer des TrackGuides zur gegebenen Zeit zugänglich gemacht werden können. Die Methoden für das Speichern, Suchen und Ändern von Daten werden im Datenbank-Modul implementiert. Diese Methoden können dann in entsprechenden Modulen aufgerufen und verwendet werden. Die Implementierung der Datenbank erfolgt in einem seperaten Modul. 
##### Umsetzung:
IndexedDB mit WebSQL kombiniert (https://www.smashingmagazine.com/2014/09/building-simple-cross-browser-offline-todo-list-indexeddb-websql/) --> Kann mit dem Cache Manifest kombiniert werden, das für die Bereitstellung der Setlisten im Offline-Modus vewendet werden soll


<!--#### Login
Der Login ist der Einstieg in die Anwendung und notwending, um die Setlisten nutzerbezogen verwalten und anzeigen zu können. Er stellt die oberste Ebenen der Anwendung dar. Im Login-Feature sollen Nutzernamen und Passwort bei Anwendungsstart abgefragt werden und mit den Daten in der Datenbank abgeglichen werden. Stimmen beide Eingaben mit einem gespeicherten Nutzer-Objekt überein, werden die Informationen dieses Objekts geladen und angezeigt. Wichtig hierbei ist bei Account-Erstellung zu prüfen, ob ein Nutzernamen schon existiert, damit ausgeschlossen ist, dass zwei Nutzer denselben Namen haben und es bei eine großen Anzahl an Nutzer zu Schwierigkeiten kommt. https://www.codegrepper.com/code-examples/html/javascript+login+page+with+database -->

#### Kommunikation
Die Kommunikation zwischen den einzelnen Bereichen erfolgt über die Überprüfung von IDs, da Songs, Setlisten und Nutzer alle durch Ihre IDs und Typen eindeutig identifiert werden können. Auch das Zusammenfassen der kleineren Elemente in einem einzigen Objekt, dem Nutzer wird uns den Zugriff auf die Einzelelemente erleichtern.  

<!--[Beschreiben Sie hier die intendierte Code-Struktur Ihrer Anwendung. Notieren Sie wesentliche Module oder Konzepte, entlang derer sich Ihre Anwendung strukturieren lässt. Gehen Sie dabei auch auf grundlegende Architekturen, z.B. die Unterscheidung von Server- und Client-Anwendung ein und beschreiben Sie die Art und Weise, wie Teilkomponenten miteinander kommunizieren werden. Entwerfen Sie Strukturen und Vorgaben für zentrale Datenobjekte und geben Sie an, welche Teilbereiche der Anwendung unter Verwendung externe APIs oder Bibliotheken umgesetzt werden sollen. Erweitern und Überarbeiten Sie dieses Dokument im Verlauf des Projektes. Hier soll stets eine aktuelle Dokumentation des aktuell geplanten bzw. umgesetzten Software Designs einsehbar sein.]-->

#### UI
Für die UI wollen wir uns an bisherigen Anwendungen orientieren und in einem iterativen Prozess, das für uns optimale User Interface ermitteln. Der Entwurf der UI wird der aller erste Schritt im Entwicklungsprozess sein und als Prototyp dienen. So haben wir schon ein Bild der Anwendung im Kopf und können uns vorstellen, wie was funktionieren soll. 

#### Veranschaulichung der Systemarchitektur
Um unsere Gedanken zu veranschaulichen, haben wir eine Grafik angefertigt. Diese zeigt die Einzelelemente sowie die Beziehungen zueinander. Die Visualisierung wird uns helfen zu kommunizieren, Schwierigkeiten zu entdecken und zu lösen sowie Konzepte umzustrukturieren, falls wir merken, dass etwas nicht so funktionieren sollte wie geplant oder wir einen einfacheren Weg für eine Implementierung finden. 

![grafik](https://github.com/Multimedia-Engineering-Regensburg-Tasks/mme-ss2021-projekte-songbook-juliafrankalena/blob/master/docs/DesignTrackGuide.jpg?raw=true)

