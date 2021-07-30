# 🚧 Work in progress

# ebrains-iam-auth

Frontend standard + pkce EBRAINS IAM authentication helper. Component handles the authentications mecanism. When client is ready, component dispatches a `ebrains-iam-auth:ready`. When user is authenticated, it triggers a `ebrains-iam-auth:authenticated` event that notifies that the login process succedeed `window.keycloak` is inited. Note that this component doesn't display anything.

## Attributes

| name         | description                                                                                               | mandatory |
| ------------ | --------------------------------------------------------------------------------------------------------- | --------- |
| client       | Keycloak client id                                                                                        | x         |
| realm        | Keycloak realm, default "hbp"                                                                             |           |
| scope        | Keycloak scope e.g "openid profile email", default is "openid"                                            |           |
| no-auto      | if present, component won't run auto login, you can handle it using `keycloak.login` when client is ready |           |
| redirect-uri | Redirect to this URI after login                                                                          |           |

ℹ️ When using `no-auto`, you have to handle the login process using `keycloak.login` (see [https://github.com/keycloak/keycloak/blob/master/adapters/oidc/js/src/main/resources/keycloak.d.ts](https://github.com/keycloak/keycloak/blob/master/adapters/oidc/js/src/main/resources/keycloak.d.ts) for options)

## Events

| name                           | description                                       |
| ------------------------------ | ------------------------------------------------- |
| ebrains-iam-auth:ready         | Keycloak client has been instantiated             |
| ebrains-iam-auth:authenticated | User is authenticated                             |
| ebrains-iam-auth:error         | An error occured, error is passed to event.detail |

## Usage

You first need a Keycloak client using the standard flow, public, setup with "Proof Key for Code Exchange Code Challenge Method" set to "S256".

1. Reference component

```
<script src="https://cdn.jsdelivr.net/gh/HumanBrainProject/ebrains-webcomponents@{version}/ebrains-iam-auth/ebrains-iam-auth.js"></script>
```

2. Listen to ebrains-iam-auth events

```
<script>

	// ebrains-iam-auth:ready event
	// client is ready we can use `keycloak` object but user could be authenticated or not
	window.addEventListener('ebrains-iam-auth:ready', () => {
		console.log('Client is ready');
	});

	// ebrains-iam-auth:authenticated event
	window.addEventListener('ebrains-iam-auth:authenticated', () => {
		console.log(keycloak.idTokenParsed);
		console.log('User is authenticated');
	});

	// ebrains-iam-auth:error event
	window.addEventListener('ebrains-iam-auth:error', (event) => {
		console.log(event.detail);
		console.log('An error occurred');
	});
</script>
```

3. Add component to HTML document

```
<ebrains-iam-auth client="your-client-id"></ebrains-iam-auth>
```
