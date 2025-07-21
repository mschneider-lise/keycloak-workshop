package de.lise.keycloak_workshop.api.incoming;

import de.lise.keycloak_workshop.api.outgoing.KeycloakApiClient;
import de.lise.keycloak_workshop.api.outgoing.KeycloakUserDraft;
import de.lise.keycloak_workshop.api.outgoing.KeycloakUserInfo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("secured")
public class SecuredController {

    private final KeycloakApiClient keycloakApiClient;

    SecuredController(KeycloakApiClient keycloakApiClient) {
        this.keycloakApiClient = keycloakApiClient;
    }

    @PreAuthorize("hasAuthority('workshop-role')")
    @GetMapping
    public KeycloakUserInfo[] get() {
        var token = keycloakApiClient.getAccessToken("http://localhost:8081/realms/workshop/protocol/openid-connect/token", "backend", "L4Wn60OcPoePiTnRjkYPrF12Cv9M42s2");
        keycloakApiClient.createResource("http://localhost:8081/admin/realms/workshop/users", token, new KeycloakUserDraft(UUID.randomUUID().toString()));
        return keycloakApiClient.getResource("http://localhost:8081/admin/realms/workshop/users", token, KeycloakUserInfo[].class);
    }
}
