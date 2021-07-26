(function () {
  const styles = `
    <style>
      :host {
        --overlay-fgcolor: var(--yt-video-overlay-fgcolor, #fff);
        --overlay-bgcolor: var(--yt-video-overlay-bgcolor, rgba(0, 0, 0, .7));
        --overlay-gradient-from: var(
          --yt-video-overlay-gradient-from,
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
    </style>
    `;

  const iframeTemplate = document.createElement('template');
  iframeTemplate.innerHTML = `
      ${styles}
      <iframe
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullScreen>
      </iframe>
    `;

  const overlayTemplate = document.createElement('template');
  overlayTemplate.innerHTML = `
      ${styles}
      <div class="overlay">
        <div class="content">
          <h3>Youtube Privacy Warning</h3>
          <p>Youtube does not let you watch videos anonymously. Watching Youtube videos here will be tracked by Youtube (Google).</p>
        </div>
        <div class="cta">
          <div>
            <input type="checkbox" id="remember" />
            <label for="remember">Don't ask me again</label>
          </div>
          <button id="watch">Watch video</button>
        </div>
      </div>
    `;

  class YTVideo extends HTMLElement {
    allow = false;
    localStorageKey = 'yt-video-allow';
    constructor() {
      super();
    }
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.allow = window.localStorage.getItem(this.localStorageKey) === '1';
      this.render();
    }
    get videoUrl() {
      return this.getAttribute('url');
    }
    get videoTitle() {
      return this.getAttribute('title');
    }
    get videoCover() {
      return this.getAttribute('cover');
    }
    reset() {
      while (this.shadowRoot.firstChild) {
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
      }
    }
    renderIFrame() {
      this.shadowRoot.appendChild(iframeTemplate.content.cloneNode(true));
      const iframe = this.shadowRoot.querySelector('iframe');
      iframe.setAttribute('src', this.videoUrl);
      iframe.setAttribute('title', this.videoTitle);
    }
    renderOverlay() {
      this.shadowRoot.appendChild(overlayTemplate.content.cloneNode(true));
      if (this.videoCover) {
        this.shadowRoot.querySelector(
          '.overlay'
        ).style.backgroundImage = `linear-gradient(var(--overlay-gradient-from), var(--overlay-gradient-to)), url(${this.videoCover})`;
      }
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
  window.customElements.define('ebrains-yt-video', YTVideo);
})();
