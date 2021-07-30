customElements.define(
  'ebrains-yt-video',
  class extends HTMLElement {
    constructor() {
      super();
      this.allow = false;
      this.localStorageKey = 'yt-video-allow';
    }
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.allow = window.localStorage.getItem(this.localStorageKey) === '1';
      this.render();
    }
    createTemplate(htmlString) {
      const template = document.createElement('template');
      template.innerHTML = htmlString;
      return template;
    }
    get styles() {
      return `
        :host {
          --overlay-fgcolor: var(--ebrains-yt-video-overlay-fgcolor, #fff);
          --overlay-bgcolor: var(--ebrains-yt-video-overlay-bgcolor, rgba(0, 0, 0, .7));
          --overlay-a: var(--ebrains-yt-video-overlay-a, #82c558);
          --overlay-a-hover: var(--ebrains-yt-video-overlay-a-hover, #82c558);
          --overlay-a-active: var(--ebrains-yt-video-overlay-a-active, #82c558);
          --overlay-a-visited: var(--ebrains-yt-video-overlay-a-visited, #82c558);
          --overlay-gradient-from: var(
            --ebrains-yt-video-overlay-gradient-from,
            var(--overlay-bgcolor)
          );
          --overlay-gradient-to: var(
            --yt-video-overlay-gradient-to,
            var(--overlay-bgcolor)
          );
          display: block;
          color: var(--overlay-fgcolor);
          background: var(--overlay-bgcolor);
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 100%;
        }
        a {
          color: var(--overlay-a);
        }
        a:hover {
          color: var(--overlay-a-hover);
        }
        a:active {
          color: var(--overlay-a-active);
        }
        a:visited {
          color: var(--overlay-a-visited);
        }
        iframe {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .overlay {
          padding: 25px;
          display: flex;
          flex-direction: column;
          flex-grow: 0;
          background-size: cover;
          background-position: 50% 50%;
          height: 100%;
        }
        .cta button {
          margin-top: 25px;
        }
      `;
    }
    get iframeTemplate() {
      const html = `
        <style>
          ${this.styles}
        </style>
        <iframe
          src="${this.videoUrl}"
          title="${this.videoTitle}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullScreen>
        </iframe>
      `;
      return this.createTemplate(html);
    }
    get overlayTemplate() {
      const html = `
        <style>
          ${this.styles}
        </style>
        <div class="overlay" style="${
          this.videoCover ? this.coverBackground : ''
        }">
          <div class="content">
            <h3>EBRAINS Privacy Warning</h3>
            <p>This page embeds a Youtube video here. You can choose to watch the video. If you do, Youtube (Google) will use cookies to track you. See <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener">Youtube's privacy page.</a></p>
          </div>
          <div class="cta">
            <div>
              <input type="checkbox" id="remember" />
              <label for="remember">Remember my choice for other videos on this website</label>
            </div>
            <button id="watch">Accept and Watch the Video</button>
          </div>
        </div>
      `;
      return this.createTemplate(html);
    }
    get videoUrl() {
      return this.getAttribute('url') || '';
    }
    get videoTitle() {
      return this.getAttribute('title') || '';
    }
    get videoCover() {
      return this.getAttribute('cover');
    }
    get coverBackground() {
      return `background-image: linear-gradient(var(--overlay-gradient-from), var(--overlay-gradient-to)), url(${this.videoCover})`;
    }
    reset() {
      while (this.shadowRoot.firstChild) {
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
      }
    }
    renderIFrame() {
      this.shadowRoot?.appendChild(this.iframeTemplate.content.cloneNode(true));
    }
    renderOverlay() {
      this.shadowRoot?.appendChild(
        this.overlayTemplate.content.cloneNode(true)
      );
      const watchButton = this.shadowRoot.getElementById('watch');
      const remember = this.shadowRoot.getElementById('remember');
      watchButton.addEventListener('click', () => {
        if (remember.checked) {
          window.localStorage.setItem(this.localStorageKey, '1');
        }
        this.allow = true;
        this.render();
      });
    }
    render() {
      this.reset();
      if (this.allow) {
        this.renderIFrame();
      } else {
        this.renderOverlay();
      }
    }
  }
);
