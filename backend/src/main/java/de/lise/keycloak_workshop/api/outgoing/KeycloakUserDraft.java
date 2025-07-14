package de.lise.keycloak_workshop.api.outgoing;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KeycloakUserDraft(
        @JsonProperty("username")
        String username
) {
}
