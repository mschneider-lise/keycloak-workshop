package de.lise.keycloak_workshop.api.incoming;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("secured")
public class SecuredController {

    @PreAuthorize("hasAuthority('workshop-role')")
    @GetMapping
    public SecuredResponse get() {
        return new SecuredResponse("secured");
    }
}
