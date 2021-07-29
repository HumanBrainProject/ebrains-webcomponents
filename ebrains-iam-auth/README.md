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

## Events

| name                           | description                           |
| ------------------------------ | ------------------------------------- |
| ebrains-iam-auth:ready         | Keycloak client has been instantiated |
| ebrains-iam-auth:authenticated | User is authenticated                 |

## Usage

You first need a Keycloak client using the standard flow, public, setup with "Proof Key for Code Exchange Code Challenge Method" set to "S256"

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
</script>
```

3. Add component to HTML document

```
<ebrains-iam-auth client="your-client-id"></ebrains-iam-auth>
```
