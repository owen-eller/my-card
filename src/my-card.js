import { LitElement, html, css } from 'lit';


class MyCard extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--my-card-background-color);
    }

    body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: white;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  max-width: 400px;
  border: 4px solid navy;
  border-radius: 8px;
  margin: 16px;
  padding: 16px;
  background-color: white;
}

.container img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.card-content {
  margin-top: 0;
  text-align: center;
}

.card-title {
  margin: 16px;
  text-align: center;
}

.description {
  margin: 4px;
}

.description-toggle {
  cursor: pointer;
}

.toggle-button {
  display: block;
  text-align: center;
  padding: 8px;
  border: 4px solid black;
  border-radius: 4px;
  margin-top: 16px;
  color: black;
  background-color: lightblue;
}
.details-link {
  display: none;
  margin-top: 16px;
  text-align: center;
}

.bg-toggle {
  background-color: darkgray;
}

.toggle-button:hover,
.toggle-button:focus {
  background-color: lightgray;
  color: black;
}

.hidden {
  display: none;
}
@media (max-width: 800px) {
  .button-details {
    display: none;
  }
}`



constructor() {
  super();
}

duplicateCard() {
  const cards = this.shadowRoot.querySelectorAll('.container');
  const clone = cards[0].cloneNode(true);
  clone.querySelector('.toggle-button').classList.remove('hidden');
  this.shadowRoot.querySelector('.wrapper').appendChild(clone);

  const toggleDescriptionButton = clone.querySelector('.toggle-button');
  const cardDescription = clone.querySelector('.description');
  toggleDescriptionButton.addEventListener('click', () => {
    cardDescription.classList.toggle('hidden');
  });
}

toggleColor() {
  const originalCard = this.shadowRoot.querySelector('.container[data-card="1"]');
  originalCard.classList.toggle('bg-toggle');
}

toggleDescription() {
  const cardDescription = this.shadowRoot.querySelector('.description');
  cardDescription.classList.toggle('hidden');
}

changeTitle() {
  const cardTitle = this.shadowRoot.querySelector('.card-title');
  cardTitle.textContent = 'something else';
}

deleteLastCard() {
  const cards = this.shadowRoot.querySelectorAll('.container');
  if (cards.length > 1) {
    const lastCard = cards[cards.length - 1];
    lastCard.remove();
  }
}

render() {
  return html`
    <main>
      <div class="wrapper">
        <div class="container" data-card="1">
          <div class="card">
            <div class="card-content">
              <h2 class="card-title">HAX PSU</h2>
              <img src="https://hax.camp/assets/haxBanner-01.png" alt="Card Image">
              <div class="description-toggle">
                <div class="description">Hax Camp 2022</div>
                <div class="toggle-button" @click="${this.toggleDescription}">Toggle Description</div>
              </div>
              <a class="details-link" href="https://hax.psu.edu">Details</a>
            </div>
          </div>
        </div>
      </div>

      <button class="duplicateButton" @click="${this.duplicateCard}">Duplicate Card</button>
      <button class="toggleColorButton" @click="${this.toggleColor}">Toggle Color</button>
      <button class="changeTitleButton" @click="${this.changeTitle}">Change Title</button>
      <button class="deleteCardButton" @click="${this.deleteLastCard}">Delete Last Card</button>
    </main>
  `;
}
}

customElements.define('my-card', MyCard);

