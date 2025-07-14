# 100 - Init

Zum warm werden kannst du erstmal gucken, ob du Keycloak, Backend und Frontend starten kannst.

## 101 - Starte Keycloak

* Starte Keycloak über die `docker-compose.yml` im "infrastructure" Ordner, indem du `docker compose up -d` ausführst.
* Öffne die [Keycloak Administration Console](http://localhost:8081/) und melde dich mit den Anmeldedaten an, die in der `docker-compose.yml` angegeben sind.
    * Du kannst dich kurz mit der Oberfläche vertraut machen, wenn du möchtest.

## 102 - Starte das Backend

* Starte das Backend-Projekt mit der IDE deiner Wahl.
* Öffne die [Swagger-UI](http://localhost:8080/swagger) und rufe den "/public" und den "/secured" Endpunkt auf.
  * Beide Endpunkte sollten `200 zurück geben.

## 103 - Starte das Frontend

* Führe `pnpm i` im `frontend` Ordner aus.
* Starte das Frontend-Projekt mit `pnpm run dev`.
* Es gibt zwei relevante Bereiche im Frontend: [Public](http://localhost:3000/) und [Secured](http://localhost:3000/secured/).
    * Beide sind bisher ohne Weiteres (auch über die Sidebar) erreichbar, aber du kannst dir sicher schon vorstellen, welcher Bereich sich während der nächsten Aufgaben verändern wird.
    * Über den `Public Request`- und den `Secured Request`-Button solltest du Requests an das Backend triggern können, die beide `200`zurückgeben.

---


# 200 - Frontend absichern

Fangen wir mit dem Frontend an.
Wie bereits gesagt, gibt es dort zwei Bereiche.
Den [abgesicherten Bereich](http://localhost:3000/secured/) wollen wir jetzt vor unbefugtem Zugriff schützen.

## 201 - Keycloak Setup

* Lege einen neuen Realm über die [Keycloak Administration Console](http://localhost:8081/) an.
* Erstelle einen neuen Client im Realm, welcher später vom Frontend verwendet werden soll.
    * Der Client soll (nur) den `Authorization Code Flow` verwenden.
        * Nutzt die [Doku](https://www.keycloak.org/securing-apps/oidc-layers#_supported_grant_types) oder die `(?)`-Tooltips in der UI, um eine Beschreibung der Flows zu bekommen.
    * Achte darauf, dass du die Redirect URI und Origin korrekt setzt.
        * Auch hier empfiehlt sich die [Doku](https://www.keycloak.org/securing-apps/oidc-layers#_redirect_uris) oder die `(?)`-Tooltips.

## 202 - OpenId Connect/Keycloak Endpunkte

* Guck dir in der [Doku](https://www.keycloak.org/securing-apps/oidc-layers#_oidc_available_endpoints) kurz an, welche Endpunkte von Keycloak bereitgestellt werden.
* Rufe den Discovery Endpunkt (`well-known`) für deinen Keycloak Realm auf, um Informationen über die OIDC Konfiguration zu erhalten.

## 203 - Frontend Setup

Im Frontend ist bereits die [react-oidc-context](https://github.com/authts/react-oidc-context) library, welche auf der bekannten [oidc-client-ts](https://github.com/authts/oidc-client-ts) library basiert, installiert.

* Nutze den `AuthProvider` und den `useAuth`-Hook der `react-oidc-context`-Library, um die `SecuredApp` Komponente vor unbefugtem Zugriff abzusichern.
    * Setze dafür alle benötigten Parameter im `AuthProvider`, ein Beispiel findest du auf [GitHub](https://github.com/authts/react-oidc-context?tab=readme-ov-file).
    * Stelle sicher, dass die `SecuredApp` nur angezeigt wird, wenn der Nutzer authentifiziert ist. Nutze dafür den `useAuth` Hook und die entsprechenden States.
* Wenn du alles richtig konfiguriert hast, solltest du zur Login-Maske von Keycloak weitergeleitet werden, wenn du versuchst, auf den [abgesicherten Bereich](http://localhost:3000/secured) des Frontends zuzugreifen.

## 204 - Keycloak Realms exportieren/importieren

Keycloak verwendet (sofern nicht anders konfiguriert) eine In-Memory Datenbank.
Das führt dazu, dass du alle Einstellungen verlierst, wenn du die Docker-Ressourcen über `docker compose down` entfernst.
Um das zu verhindern, kann man Daten [exportieren und importieren](https://www.keycloak.org/server/importExport).
Dies ist vor allem während der Entwicklung in lokaler Umgebung hilfreich, wenn man mit einer bestimmten Keycloak Konfiguration arbeiten (und diese im Team teilen) möchte.

Eine Möglichkeit, Realms inklusive Nutzer zu exportieren/importieren darfst du jetzt einmal ausprobieren.
Führe dazu folgende Schritte aus:

* Stoppen des Keycloak Containers (sofern er noch läuft) mit `docker stop keycloak-workshop-keycloak`.
* Erstellen eines Debug Images mit `docker commit keycloak-workshop-keycloak debug/keycloak-workshop-keycloak`.
* Ausführen des Debug Images mit `docker run -it --rm --name keycloak-workshop-keycloak-debug --entrypoint sh debug/keycloak-workshop-keycloak`.
  * In der Shell mit `opt/keycloak/bin/kc.sh export --optimized --users realm_file --realm <<dein Realm Name>> --dir /tmp/export/` den Realm exportieren.
* Ein weiteres Terminal im Pfad öffnen, in welchem die Exportdatei liegen soll.
  * Die Exportdatei aus dem Debug Container kopieren mit `docker cp keycloak-workshop-keycloak-debug:/tmp/export/<<dein Realm Name>>-realm.json .`.
* Die Shell im Debug Container mit `exit` schließen.


* Lösche die Keycloak Instanz über `docker compose down` und lege sie danach wieder mittels `docker compose up -d` an.
    * Überprüfe, ob dabei alle Einstellungen korrekt importiert wurden.

---


# 300 - Login/Logout

Die abgesicherte Komponente sollte jetzt nicht mehr erreichbar sein.
Aber es gibt bisher keine Möglichkeit, sich ein- oder auszuloggen.
Das gehen wir jetzt in dieser Aufgabe an!

## 301 - Keycloak Setup

* Lege in deinem Realm einen neuen Nutzer an.
    * Setze ein temporäres Passwort für den Nutzer.
        * Unter "Details" sollte nun automatisch "Update Password" als User Action hinzugefügt worden sein.
    * Bonus: Lege mit einer Passwort-Richtlinie fest, dass mindestens ein Großbuchstabe in Passwörtern enthalten sein muss.
* Logge dich mit dem erstellten Nutzer im [abgesicherten Bereich](http://localhost:3000/secured/) des Frontends an.
    * Wenn du alles richtig gemacht hast, solltest du aufgefordert werden, ein neues Passwort einzugeben.
    * Hier kannst du auch testen, ob deine Passwort-Richtlinie funktioniert, sofern du eine angelegt hast.

* Hinweis: In der `workshop-realm.json` Datei in den Solution-Branches des Git-Repo ist der Nutzer `test` mit Passwort `Test` enthalten

## 302 - Logout

Es gibt aktuell keine einfache Möglichkeit, sich als Nutzer auszuloggen.

* Implementiere das Ausloggen eines Nutzers in der `App` Komponente.
    * Tipp: Nutze den `useAuth` Hook.
    * Leite den Nutzer nach erfolgreichem Logout auf den öffentlichen Bereich weiter.

---


# 400 - Backend absichern

Das Frontend ist jetzt erst einmal abgesichert.
Aber was ist mit dem Backend?
Aktuell darf jeder Nutzer alle Endpunkte aufrufen, egal ob authentifiziert oder nicht.
Das wollen wir jetzt ändern!

## 401 - Backend Setup

* Konfiguriere das Backend durch die `application.properties` und die `SecurityConfiguration`, um die Authentifizierung per JWT zu ermöglichen.
    * Tipp: [Hier](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html) solltest du alles Benötigte finden.

## 402 - Endpunkt absichern

* Sichere (nur) den `SecuredController` ab, sodass dessen Endpunkte nur aufgerufen werden dürfen, wenn man ein valides Token hat.
* Wenn du alles richtig gemacht hast, sollte ein Nutzer, der nicht authentifiziert ist, die abgesicherten Endpunkte nicht mehr aufrufen dürfen (überprüfe das via [Swagger-UI](https://localhost:8080/swagger) oder dem `Secured Request` Button im Frontend).

## 403 - API Requests im Frontend

* Es gibt ein paar Parameter in `App.tsx`, die auf die korrekten Werte gesetzt werden müssen.
  * Du solltest nun den Namen des aktuell eingeloggten Nutzers in der Sidebar sehen können. Die Komponente sollte jedoch nur angezeigt werden, wenn der Nutzer authentifiziert ist.
  * Du solltest jetzt den Payload des aktuellen Tokens im abgesicherten Bereich des Frontends sehen und (nur) in diesem Bereich Abfragen an den abgesicherten Endpunkt des Backends machen können.

---


# 500 - Mapper & Rollen

Wie bekommen wir Informationen über den Nutzer aus Keycloak zum Frontend oder Backend?
Eine Möglichkeit dafür sind Mapper.

## 501 - User Property Mapper

* Füge deinen Keycloak Nutzern über die Administration Console eine neue Property hinzu.
* Setzte die Property für deinen User auf einen beliebigen Wert.
* Lege nun einen neuen Scope an und füge dem Scope einen Mapper hinzu, der die neue Property mappt.
  * Achte darauf, dass die Property dem Access Token hinzugefügt wird.
* Füge deinem Client den neuen Scope hinzu und verifiziere, ob die Property im JWT enthalten ist.
  * Zu Beachten: Ein User muss sich aus- und einloggen, um ein neues Token zu erhalten.
  * Ist der Wert nicht im JWT enthalten, ist der Scope vielleicht nicht als "Default" definiert und ist daher nicht Teil des JWT.
  Als Lösung kann der Scope entweder in Keycloak als Default markiert oder der Scope, der im `AuthProvider` gesetzt ist, manuell angepasst werden.

## 502 - Keycloak Setup für Rollen

* Füge deinem Keycloak Realm eine neue Rolle hinzu und weise sie deinem Nutzer zu.
* Gucke dir anschließend an, an welcher Stelle die Rolle im Token auftaucht.


## 503 - Backend Setup

* Implementiere einen `GrantedAuthoritiesConverter`, welcher die Rollen aus dem JWT ausliest und in GrantedAuthorities konvertiert.
* Nutze den Converter als `JwtAuthenticationConverter` in der `SecurityConfiguration`.
* Sichere den Secured Endpunkt mit `@PreAuthorize` ab, damit nur Nutzer mit deiner angelegten Rolle zugreifen können.
  * Validiere, dass kein Zugriff besteht, wenn die Rolle nicht zugewiesen ist.

---


# 600 - Keycloak API

In manchen Fällen ist es notwendig, direkt die Keycloak API anzusprechen. Beispielsweise, wenn man die Konfiguration ändern oder einen Nutzer hinzufügen möchte.

## 601 - Client & Service Account

* Lege in der [Keycloak Administration Console](http://localhost:8081/) einen neuen Keycloak Client an, welcher vom Backend verwendet werden soll.
  Die Authentifizierung soll nur über "Client Credentials Grant" erfolgen, dafür muss der Service Account aktiviert werden.
* Weise dem Client die Service Account Rolle "manage-users" des "realm-management" Clients zu.

## 602 - REST API

* Keycloak stellt eine REST API bereit.
  Guck dir in der [Doku](https://www.keycloak.org/docs-api/latest/rest-api/index.html) an, wie Nutzer erstellt und abgerufen werden können.

## 603 - Nutzer erstellen und abrufen

* Nutze den `KeycloakApiClient` im Backend, um dich im Endpunkt vom abgesicherten Controller gegenüber Keycloak (mit dem Service Account deines Clients) zu authentifizieren.
    * Tipp: Der `KeycloakApiClient` stellt die Methode `GetAuthResponse` bereit.
      Diese benötigt als Parameter die URL zum Token-Endpunkt, sowie Client ID und Secret.
    * Du solltest eine `KeycloakApiException` bekommen, wenn es nicht geklappt hat, ansonsten sollte das JWT als String zurückgegeben werden.
* Lege anschließend unter Verwendung des JWT einen Nutzer mit einem zufälligen Nutzernamen (z.B. eine GUID) an.
    * Tipp: Auch dafür existiert eine Methode im `KeycloakApiClient`
* Gebe am Schluss eine Liste von allen Nutzern des Realms zurück.
* Im Frontend sollte nun immer ein neuer Nutzer erstellt werden, sobald der "Secured Request" Button geklickt wurde.
  Im Body sollte als Rückgabe jeweils die Liste aller Nutzer enthalten sein.
