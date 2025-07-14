package de.lise.keycloak_workshop.api.incoming;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("public")
public class PublicController {

    @GetMapping
    public PublicResponse get() {
        return new PublicResponse("public");
    }
}
