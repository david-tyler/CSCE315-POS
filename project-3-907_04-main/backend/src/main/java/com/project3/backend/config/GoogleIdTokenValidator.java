package com.project3.backend.config;

import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;


import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

/**
 * GoogleIdTokenValidator is a custom implementation of OAuth2TokenValidator for validating Google ID tokens.
 * It uses the GoogleIdTokenVerifier to verify the authenticity and integrity of the Google ID token.
 * The configured audience is used to validate the audience claim in the token.
 * If the token is successfully verified, it is considered valid; otherwise, it is treated as invalid.
 */
@Component
public class GoogleIdTokenValidator implements OAuth2TokenValidator<Jwt> {

    // Custom OAuth2Error instance for representing a custom error
    private OAuth2Error error = new OAuth2Error("custom_code", "Custom error message", null);

    // GoogleIdTokenVerifier instance for verifying Google ID tokens
    private GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(),
            new GsonFactory())
            .setAudience(Collections.singletonList("92522781514-n0k71ngp0e7efn0tptb2cp4p6ktgmbje.apps.googleusercontent.com"))
            .build();

    /**
     * Validates the given JWT token by verifying the corresponding Google ID token.
     *
     * @param token The Jwt token to be validated.
     * @return An OAuth2TokenValidatorResult representing the validation result.
     */
    @Override
    public OAuth2TokenValidatorResult validate(Jwt token) {
        // Obtain the ID token string from the Jwt token
        String idTokenString = token.getTokenValue();
        GoogleIdToken idToken;

        try {
            // Verify the ID token using the configured GoogleIdTokenVerifier
            idToken = verifier.verify(idTokenString);
        } catch (GeneralSecurityException | IOException e) {
            // Handle exceptions during token verification
            e.printStackTrace();
            idToken = null;
        }

        // Check if the ID token is successfully verified
        if (idToken != null) {
            return OAuth2TokenValidatorResult.success();
        }

        // If verification fails, return a failure result
        return OAuth2TokenValidatorResult.failure(error);
    }
}