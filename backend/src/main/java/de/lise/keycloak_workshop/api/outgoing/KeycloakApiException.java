package de.lise.keycloak_workshop.api.outgoing;

public class KeycloakApiException extends RuntimeException {
    KeycloakApiException(String message) {
        super(message);
    }
}
