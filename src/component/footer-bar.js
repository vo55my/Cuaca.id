class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class="py-3 my-4">
      <p class="text-center">&copy; 2023 Dhaifullah Hilmy</p>
    </footer>`;
  }
}

customElements.define("footer-bar", FooterBar);
