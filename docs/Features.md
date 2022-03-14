
# Features für Trackguide

[Notieren und beschreiben Sie hier alle wesentlichen Funktionen bzw. *Features* Ihrer Anwendung. Seien Sie möglichst ausführlich in der Dokumentation und beachten Sie für die Erläuterungen ("Beschreibung") die Perspektive Ihrer NutzerInnen. Schätzen Sie initial den wahrscheinlichen Aufwand - auch um diese Schätzung am Ende des Projekts mit dem tatsächlichen Aufwand vergleichen zu können. Priorisieren Sie die Features hinsichtlich des zentralen *Use Case* Ihrer Anwendung und notieren Sie, welche größeren Bereiche der Anwendung von diesen Funktionen betroffen sind]

| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten |
|---------|--------------|-----------|--------------------|---------------------|
| Datenbank | Persistieren der gespeicherten Lieder| hoch | 3 Tage | grundlegende Ebene, essentiell |
| Storage API | Persistieren einzelner Informationen zu Songs innerhalb einer Session| nice to have | 2 Tage |  |
| Scroller | automatische scrollen von  Songblättern in Echtzeit | hoch | 4 Tage | darstellungsbezogen|
| Accountmanager | Verwaltung und Synchronisierung der Accounts und Setlisten| hoch | 3 Tage | hohe Ebene, relevant für Zuordnung und Speicherung |
| Setlistenverwaltung | Verwaltung die Darstellugn, Speicherung und Verbreitung der einzelnen Setlisten| hoch | 3 Tage | sehr relevant |
| Songverwaltung | Darstellung verschiedener Items zu einem bestimmten Song| hoch | 3 Tage | sehr relevant |
| Login | zum Anmelden und Zuordnung zu entsprechenden Accounts| hoch | 1 Tage | 1. Ebenen  |
| Menü | Navigation der Seite | nice to have | 2 Tage | oberflächlich, nur darstellungsbezogen|
| Countdown | Parallel zum Scrollen | nice to have | 0,5 Tage | oberflächlich, nur darstellungsbezogen|
| Fortschrittsanzeige | Parallel zum Scrollen| nice to have | 0,5 Tage | oberflächlich, nur darstellungsbezogen|
| Offline-Nutzung | abspielen der Songs ohne Internetverbindung| hoch| 1 Tage | relevant|



[Beschreiben Sie kurz das geplante Vorgehen bei der Umsetzung der Features. Entwerfen Sie dazu ein oder mehrere *Vertical Slices* anhand derer Sie den zentralen *Use Case* der Anwendung implementieren werden. Geben Sie an, wann welche Funktionen (und in welchem Vollständigkeitsgrad) implementiert werden. Begründen Sie kurz die gewählte Reihenfolge. ]

<img width="340" alt="Bildschirmfoto 2021-07-24 um 10 52 59" src="https://user-images.githubusercontent.com/70012595/126863194-4f688c40-4695-4e2d-8c2b-0425d81afccd.png">


#### UI
Zu Beginn der Implementierung wird ein grobes UI erstellt, das im Laufe der Projektarbeit verbessert wird. Zum groben Design haben wir bereits mehrere Prototypen gezeichnet um Ideen zu sammeln. Der Countdown soll mit dem abspielen der Notenblätter laufen und die die Länge des Songs herunterzählen. Der Countdown soll während des Scrollens angezeigt werden. Obwohl der Counter primär keine Logik darstellt, kann er erst nach der Implementierung des Scrollen fertiggestellt werde. Ähnlich verhält es sich mit dem Fortschrittsbalken der während des Scrollens anzeigen soll, wie Lange eine SOng noch geht bzw. eben den FOrtschritt anzeigt.

#### Songeintrag + Songverwaltung
Der erste Schritt besteht darin einen Songerstellen zu können, der über verschiedene Attribute verfügt. Die Attributsinformationen sollen später entweder manuell eintragbar sein (eventuell Drag and Drop für Notenblätter) oder aus dem Netz geladen werden. Songdarstellung muss gut strukturiert sein, um die Informationen bei einem späteren Schritt auch zu speichern.

#### Song hinzufügen
Nutzer soll es möglich sein ganze Songs und Songattribute manuell hinzuzufügen und zu bearbeiten. Songs werden manuell erstellt und Nutzer muss über Daten verfügen.

#### Setlisten Erstellung
Bei der Stelistenerstellung soll es zunächst nur darum gehen, dass mehrere Songs zu einer Liste zusammengefasst werden. Die Liste solle später für mehrere Accounts zugänglich sein.

#### Speicherung der Songs und Listen --> Strategy-Pattern
Während einer Session sollen beim erstellen einer Liste, die Songs im Storage gespeichert werden. Ebenso sollen Songinformationen während des Erstellens eines SOngs im Storage gespeichert werden. "Fertige" Listen und Songs werden in einer Datenbank persistiert und beim Neuladen der Seite angezeigt. Wir implementieren die Datenbank zu diesem Zeitpunkt, um auch tatsächlich Elemente abzuspeichern.  --> IndexedDB und WebSQL 

#### Accountmanager
Jeder Nutzer verfügt über einen Account. Über en Account können dem Nutzer seine gespeicherten Songs und Setlisten zugewiesen werden.

#### Login
Über ein Login-Interface soll sich der Nutzer einloggen können. Über die Verifizierung von Benutzername und Passwort wird dem Nutzer eine Account zugewiesen. Benutzerdaten weren ebenfalls in der Datenbank gespeichert.

#### Downloader
Nice to have, wenn die Zeit reicht API-Songsuche

#### Scrollen
        (function () {
            const waitBefore = 2000;
            const waitAfter = 2000;
            const step = 4;
            function scroll() {
                var position = window.pageYOffset;
                window.scrollBy(0, step);
                if (position === window.pageYOffset) {
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                        location.reload(true);
                    }, waitAfter);
                } else {
                    window.setTimeout(scroll, 10);
                }
            }
            setTimeout(scroll, waitBefore);
        }());
 oder 
 
 window.scrollTo()
 
 oder
 
        function pageScroll() {
                window.scrollBy(0,1);
                scrolldelay = setTimeout(pageScroll,10);
               }

