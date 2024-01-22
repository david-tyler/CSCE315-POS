package com.project3.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * This class is responsible for configuring the web security of the application.
 * It defines the security filter chain, JWT decoding, CORS configuration, and authorization rules.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	String issuerUri = "https://accounts.google.com";

	/**
	 * Creates a SecurityFilterChain for configuring the security settings of the application.
	 *
	 * @param http the HttpSecurity object used for configuring the security filters
	 * @return the configured SecurityFilterChain
	 * @throws Exception if an error occurs while configuring the security filters
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
		.csrf(AbstractHttpConfigurer::disable)
		.cors(cors->cors.configurationSource(corsConfigurationSource()))
		.authorizeHttpRequests(auth ->
			auth.requestMatchers("/menuItems", "/itemCategories").permitAll()
			.requestMatchers(HttpMethod.POST, "/orders").permitAll()
			.requestMatchers(HttpMethod.GET, "/orders").hasAnyAuthority("ROLE_server", "ROLE_manager", "ROLE_admin")
			.requestMatchers("/ingredients", "/itemToIngredient").hasAnyAuthority("ROLE_manager", "ROLE_admin")
			.requestMatchers("/users").hasAnyAuthority("ROLE_admin")
			.anyRequest().authenticated()
		)
		.oauth2ResourceServer(oauth2 ->
			oauth2.jwt(jwt ->
				jwt.jwtAuthenticationConverter(MappingJwtGrantedAuthoritiesConverter())
			)
		)
		.build();
	}

	/**
	 * Creates a JwtDecoder bean that is used to decode JSON Web Tokens (JWTs).
	 * The JwtDecoder is responsible for validating and decoding the JWTs.
	 *
	 * @return the JwtDecoder bean
	 */
	@Bean
	JwtDecoder jwtDecoder() {
		NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
			JwtDecoders.fromIssuerLocation(issuerUri);

		OAuth2TokenValidator<Jwt> idTokenValidator = googleIdTokenValidator();
		OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
		OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, idTokenValidator);

		jwtDecoder.setJwtValidator(withAudience);

		return jwtDecoder;
	}

	/**
	 * Returns an instance of OAuth2TokenValidator that validates Google ID tokens.
	 *
	 * @return an instance of OAuth2TokenValidator<Jwt> for validating Google ID tokens
	 */
	OAuth2TokenValidator<Jwt> googleIdTokenValidator() {
		return new GoogleIdTokenValidator();
	}

	/**
	 * Returns the CorsConfigurationSource used for configuring CORS (Cross-Origin Resource Sharing) settings.
	 *
	 * @return the CorsConfigurationSource used for configuring CORS settings
	 */
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("https://closedfuture.com"); 
		configuration.addAllowedOrigin("http://localhost:5173");
		configuration.addAllowedMethod("*"); 
		configuration.addAllowedHeader("*"); 
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new 
		UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	/**
	 * Returns a Converter that maps Jwt to AbstractAuthenticationToken.
	 * This converter is used to convert the Jwt token to an authentication token
	 * with granted authorities.
	 *
	 * @return The Converter instance.
	 */
	@Bean
	public Converter<Jwt, ? extends AbstractAuthenticationToken> MappingJwtGrantedAuthoritiesConverter() {
		return new MappingJwtGrantedAuthoritiesConverter();
	}
}