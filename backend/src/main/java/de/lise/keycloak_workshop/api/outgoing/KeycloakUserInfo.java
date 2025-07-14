package de.lise.keycloak_workshop.api.outgoing;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KeycloakUserInfo(
        @JsonProperty("id")
        String id,

        @JsonProperty("createdTimestamp")
        long createdTimestamp,

        @JsonProperty("username")
        String username,

        @JsonProperty("enabled")
        Boolean enabled,

        @JsonProperty("emailVerified")
        Boolean emailVerified,

        @JsonProperty("email")
        String email,

        @JsonProperty("firstName")
        String firstName,

        @JsonProperty("lastName")
        String lastName
) {
}
