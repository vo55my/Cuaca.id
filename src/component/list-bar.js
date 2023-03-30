class ListBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="container">
        <div class="row my-4">
          <div class="col-lg-6 col-sm-12 justify-content-center">
            <div class="card mb-4">
              <div class="card-header border-0 text-end" id="head">
                <i class="bi bi-circle-fill text-primary"></i>
                <i class="bi bi-circle-fill text-success"></i>
                <i class="bi bi-circle-fill text-danger"></i>
              </div>
              <div class="card-body" id="koordinat">
                <h2
                  class="align-items-center text-center"
                  id="judulTerdekat"
                ></h2>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12">
            <div class="card">
              <div class="card-header text-end border-0" id="head">
                <i class="bi bi-circle-fill text-primary"></i>
                <i class="bi bi-circle-fill text-success"></i>
                <i class="bi bi-circle-fill text-danger"></i>
              </div>
              <ul class="list-group list-group-flush" id="wilayahTerdekat"></ul>
            </div>
          </div>
        </div>

        <h4 id="judulCuaca" class="my-3"></h4>
        <div class="row my-3" id="cuaca"></div>
      </div>`;
  }
}

customElements.define("list-bar", ListBar);
