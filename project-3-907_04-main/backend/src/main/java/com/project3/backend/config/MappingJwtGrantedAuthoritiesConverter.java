package com.project3.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import com.project3.backend.service.UserServiceImpl;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.stream.Collectors;
/**
 * The `MappingJwtGrantedAuthoritiesConverter` class is responsible for converting a Jwt token into an AbstractAuthenticationToken
 * by mapping the token scopes to a collection of GrantedAuthorities.
 */
@Component
public class MappingJwtGrantedAuthoritiesConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    
    /**
     * The default authorities claim name used to extract authorities information from the Jwt token.
     */
    private String authoritiesClaimName = "email";
    
    /**
     * The default authority prefix used to construct the role names from the Jwt token authorities.
     */
    private String authorityPrefix = "ROLE_";

    /**
     * The UserServiceImpl used to fetch user roles based on token scopes.
     */
    @Autowired
    private UserServiceImpl userServiceImpl;

    /**
     * Converts a Jwt token into an AbstractAuthenticationToken by mapping the token scopes to a collection of GrantedAuthorities.
     *
     * @param source The Jwt token to be converted.
     * @return An AbstractAuthenticationToken representing the user authentication with granted authorities.
     */
    @Override
    public AbstractAuthenticationToken convert(Jwt source) {
        // Parse token scopes from the Jwt token
        Collection<String> tokenScopes = parseScopesClaim(source);
        
        // Initialize a collection to hold the GrantedAuthorities
        Collection<GrantedAuthority> authorities;
        
        // Check if tokenScopes is empty, set authorities to an empty list
        if (tokenScopes.isEmpty()) {
            authorities = Collections.emptyList();
        } else {
            // Map token scopes to user roles and construct SimpleGrantedAuthority objects
            authorities = tokenScopes.stream()
                .map(this.userServiceImpl::fetchRole)
                .map(s -> this.authorityPrefix + s)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toCollection(HashSet::new));
        }
        
        // Create and return a JwtAuthenticationToken with the extracted authorities
        return new JwtAuthenticationToken(source, authorities);
    }

    /**
     * Parses the scopes claim from the provided JWT and returns a collection of strings representing the scopes.
     *
     * @param jwt The JWT from which to parse the scopes claim.
     * @return A collection of strings representing the scopes.
     */
    private Collection<String> parseScopesClaim(Jwt jwt) {
        Object scopesAsObject = jwt.getClaims().get(this.authoritiesClaimName);
        if (scopesAsObject instanceof String) {
            return Arrays.asList(((String) scopesAsObject).split(" "));
        }
        if (scopesAsObject instanceof Collection) {
            return (Collection<String>) scopesAsObject;
        }
        return Collections.emptyList();
    }
}
