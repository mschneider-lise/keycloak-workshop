package de.lise.keycloak_workshop.api.outgoing;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Service
public class KeycloakApiClient {

    private final RestClient httpClient;

    public KeycloakApiClient(RestClient httpClient) {
        this.httpClient = httpClient;
    }

    public String getAccessToken(String url, String clientId, String clientSecret) throws KeycloakApiException {
        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("grant_type", "client_credentials");
        data.add("client_id", clientId);
        data.add("client_secret", clientSecret);

        var result = httpClient
                .post()
                .uri(url)
                .body(data)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (_, response) -> {
                    throw new KeycloakApiException("Failed to get access token. Status code: " + response.getStatusCode().value());
                })
                .toEntity(AuthResponse.class);

        var body = result.getBody();

        if (body == null) {
            throw new KeycloakApiException("Failed to get access token. Body is empty.");
        }

        return body.accessToken();
    }

    public <TResponseBody> TResponseBody getResource(String url, String accessToken, Class<TResponseBody> responseBodyType) throws KeycloakApiException {
        var result = httpClient
                .get()
                .uri(url)
                .headers(h -> {
                    h.add("Authorization", "Bearer " + accessToken);
                    h.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);
                })
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (_, response) -> {
                    throw new KeycloakApiException("Failed to get resource. Status code: " + response.getStatusCode().value());
                })
                .toEntity(responseBodyType);

        var body = result.getBody();

        if (body == null) {
            throw new KeycloakApiException("Failed to get resource. Body is empty.");
        }

        return body;
    }

    public <TRequestBody> void createResource(String url, String accessToken, TRequestBody body) throws KeycloakApiException {
        httpClient
                .post()
                .uri(url)
                .headers(h -> {
                    h.add("Authorization", "Bearer " + accessToken);
                    h.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);
                })
                .body(body)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (_, response) -> {
                    throw new KeycloakApiException("Failed to create resource. Status code: " + response.getStatusCode().value());
                })
                .toBodilessEntity();
    }
}
