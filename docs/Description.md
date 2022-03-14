## App

<!--[Beschreiben Sie hier in einer kurzen Zusammenfassung Hintergrund, Ziele und Funktionen Ihrer Anwendung. Fügen Sie einen repräsentativen Screenshot ein. Dokumentieren Sie anschließend ausführlich alle Funktionen der Anwendung. Verwenden Sie Screenshots und ggf. auch Gif-Dateien um zentrale Elemente und Abläufe zu beschreiben.] -->

Bands und Musiker*innen verfügen häufig über ein großes Repertoire an Text- und Notenblättern. Dabei kann man bei einer so großen Anzahl an Dateien schnell den Überblick verlieren. Wir haben es uns zur Aufgabe gemacht eine Anwendung zu entwickeln, die diesem Problem entgegenwirkt. Die Anwendung „Trackguide“ ermöglicht Nutzer*innen die zentrale Verwaltung, Speicherung und das Abspielen von Songdateien. 

Es können beliebig viele Songs (im Musicxml-Format) hinzugefügt werden, die durch die Verwendung einer Datenbank sitzungsübergreifend in der Anwendung gespeichert werden. Jedem Song können dabei Attribute wie Titel, Interpret, Genre, Kategorie, BPM oder Anmerkungen hinterlegt werden. Alle Songs können nachträglich bearbeitet oder gelöscht werden. 

Eine weitere Funktion der Anwendung ist die Zusammenstellung der einzelnen Songs zu Setlisten. Auch hier können beliebig viele Setlisten erstellt werden, wobei jeder Song in mehreren Setlisten gespeichert werden kann. Die Setlisten werden ebenfalls sitzungsübergreifend in der Datenbank gespeichert und können nachträglich bearbeitet oder gelöscht werden.

Mithilfe des Beats-per-Minutes-Wertes, der beim Erstellen eines Songs angegeben werden muss, werden die Text- und Notenblätter automatisch durchgescrollt, sodass bei Live-Auftritten entweder einzelne Songs oder auch gesamte Setlisten abgespielt werden können. Dabei ist es beim Abspielen einer Setliste möglich Songs zu pausieren oder zu überspringen. 

Ein weiteres wichtiges Feature der Anwendung ist die Offline-Funktion. Da die Internetverbindung bei Live-Auftritten nicht immer zu 100 % gewährleistet werden kann, ist es für die Anwendung von großer Bedeutung, dass sie auch offline verwendet werden kann. Durch die Integration eines Service Workers wird dies ermöglicht und alle Funktionen stehen auch ohne Internetverbindung zur Verfügung. Wird ein Song oder eine Setliste hinzugefügt, gelöscht oder bearbeitet wird dies gespeichert und bei einer erneuten Verknüpfung mit dem Internet aktualisiert. Wird die Anwendung über Heroku gehostet, ist diese Funktion leider nicht verfügbar. 

Als kleines Extra-Feature wird es Nutzer*innen ermöglicht, das Theme der Anwendung selbst anzupassen. Dabei kann zwischen 10 verschiedenen Themen gewählt werden, die sich in Farbe und Schrift unterscheiden. 

Die Anwendung verfügt über ein Responsive Design und ermöglicht so die Nutzung auf anderen Eingabegeräten. Die Navigation innerhalb der Anwendung erfolgt hauptsächlich über das Menü an der linken Seite. Bei „kleineren“ Eingabegeräten wird das Menü eingeklappt, um eine möglichst große Benutzeroberfläche zu bieten. Mithilfe eines Klicks kann dieses jedoch wieder ausgeklappt und zur Navigation benutzt werden. Als weitere Navigationsmöglichkeit dienen die Breadcrumbs unterhalb der Navigationsbar jeder Seite.

[https://songbookmme2021.herokuapp.com/](https://songbookmme2021.herokuapp.com/)

Beispiel-MusicXML-Dateien finden Sie unter: https://www.musicxml.com/de/music-in-musicxml/example-set/

https://drive.google.com/file/d/1w60akFfRuozeGSfB30ZblsdlCwgp6BMC/view?usp=sharing Appbeschreibung Video

