customElements.define(
  'ebrains-iam-auth',
  class extends HTMLElement {
    constructor() {
      super();
      this.keycloakScriptURL = 'https://iam.ebrains.eu/auth/js/keycloak.js';
      this.defaultRealm = 'hbp';
      this.config = {
        'public-client': true,
        url: 'https://iam.ebrains.eu/auth',
      };
    }
    connectedCallback() {
      this.config = {
        ...this.config,
        realm: this.realm,
        clientId: this.client,
      };
      this.attachShadow({ mode: 'open' });
      this.injectKeycloakScript();
    }
    get realm() {
      return this.getAttribute('realm') || this.defaultRealm;
    }
    get client() {
      const client = this.getAttribute('client');
      if (!client) {
        throw new Error("ebrains-iam-auth 'client' attribute not defined.");
      }
      return this.getAttribute('client');
    }
    get scope() {
      return this.getAttribute('scope') || 'openid';
    }
    get noAuto() {
      return this.getAttribute('no-auto') !== null;
    }
    get redirectURI() {
      return this.getAttribute('redirect-uri');
    }
    injectKeycloakScript() {
      let script = document.querySelector(
        `script[src="${this.keycloakScriptURL}"]`
      );
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('src', this.keycloakScriptURL);
      }
      script.addEventListener('load', () => {
        this.initKeycloakAuth();
      });

      script.addEventListener('error', () => {
        throw new Error(`Error while loading ${this.keycloakScriptURL}`);
      });
      this.shadowRoot.appendChild(script);
    }
    initKeycloakAuth() {
      window.keycloak = Keycloak(this.config);
      window.keycloak
        .init({
          flow: 'standard',
          pkceMethod: 'S256',
        })
        .then((auth) => {
          this.dispatchEvent(
            new CustomEvent('ebrains-iam-auth:ready', {
              bubbles: true,
            })
          );
          if (!auth && !this.noAuto) {
            this.login();
          } else {
            this.dispatchEvent(
              new CustomEvent('ebrains-iam-auth:authenticated', {
                bubbles: true,
              })
            );
          }
        })
        .catch((err) => console.log(err));
    }
    login() {
      keycloak.login({
        scope: this.scope,
        redirectUri: this.redirectURI || undefined,
      });
    }
  }
);
