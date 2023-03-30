class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav class="navbar">
      <div class="container">
        <p class="navbar-brand" id="brand"><i class="bi bi-clouds-fill"></i> Cuaca.ID</p>
        <div class="clock">
          <p><i class="bi bi-clock-fill"></i> <span class="time"> </span></p>
          <i class="bi bi-calendar-fill"></i> <span class="date"> </span>
        </div>
      </div>
    </nav>`;
  }
}

customElements.define("app-bar", AppBar);
