package de.lise.keycloak_workshop.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

@Component
public class CustomJwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt source) {
        var realmAccess = source.getClaimAsMap("realm_access");
        var roles = realmAccess == null ? new ArrayList<>() : realmAccess.getOrDefault("roles", new ArrayList<String>());
        return ((ArrayList<String>)roles).stream().map(SimpleGrantedAuthority::new).collect(Collectors.toUnmodifiableList());
    }
}
