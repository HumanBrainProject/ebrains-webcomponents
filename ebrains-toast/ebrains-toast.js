customElements.define(
  'ebrains-toast',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
    get styles() {
      return `
        :host > div {
          background: var(--ebrains-toast-background, #FFF);
          width: var(--ebrains-toast-width, 300px);
          border: var(--ebrains-toast-border, 1px solid #EEE);
          padding: 40px;
          box-sizing: border-box;
          border-radius: 4px;
          position: fixed;
          right: 30px;
          display: none;
        }
        :host > div.open {
          animation: appear 250ms ease-in;
          animation-fill-mode: forwards;
          display: block;
        }
        :host > div.closing {
          animation: disappear 100ms ease-out;
          animation-fill-mode: forwards;
          display: block;
        }
        @keyframes appear {
          0% {
            display: block;
            opacity:0;
            bottom: -30px;
          }
          100% {
            opacity: 1;
            bottom: 30px;
          }
        }
        @keyframes disappear {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          100% {
            bottom: 30px;
            opacity: 0;
          }
        }
        #close {
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
          width: 40px;
          height: 40px;
        }
      `;
    }
    get template() {
      const template = document.createElement('template');
      template.innerHTML = `
      <style>
        ${this.styles}
      </style>
			<div class="toast">
        <div id="close">
          <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M11 11l18 18M11 29l18-18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <div class="content">
          <slot></slot>
        </div>
			</div>
		`;
      return template;
    }
    static get observedAttributes() {
      return ['open'];
    }
    get el() {
      return this.shadowRoot.querySelector(':host > div');
    }
    get closeButton() {
      return this.shadowRoot.querySelector('#close');
    }
    get open() {
      return this.getAttribute('open') === '1';
    }
    dispatchCustomEvent(eventName) {
      this.dispatchEvent(
        new CustomEvent(`ebrains-toast:${eventName}`, { bubbles: true })
      );
    }
    toggleVisibility(open) {
      if (open) {
        this.openToast();
      } else {
        this.closeToast();
      }
    }
    connectedCallback() {
      if (this.open) {
        this.toggleVisibility(true);
      }
      this.closeButton.addEventListener('click', () =>
        this.setAttribute('open', '0')
      );
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'open' && oldValue !== newValue) {
        this.toggleVisibility(newValue === '1');
      }
    }
    openToast() {
      this.el.classList.add('open');
      this.dispatchCustomEvent('open');
    }
    closeToast() {
      this.el.classList.remove('open');
      this.el.classList.add('closing');
      this.el.addEventListener(
        'animationend',
        () => {
          this.el.classList.remove('closing');
        },
        { once: true }
      );
      this.dispatchCustomEvent('close');
    }
  }
);
