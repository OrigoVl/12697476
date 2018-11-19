class Review {
  constructor(formSelector, textareaSelector, buttonSelector) {
    this.form = document.body.querySelector(formSelector);
    this.textarea = document.body.querySelector(textareaSelector);
    this.button = document.body.querySelector(buttonSelector);

    this.bindEvents();
  }

  bindEvents() {
    this.button.addEventListener('click', () => this.addMessage());
  }

  addMessage() {
    let now = new Date();
    let textout;
    let month = now.getMonth();
    let year = now.getFullYear()
    let date = now.getDate();

    textout = date;
    if (month == 1) textout += " февраля";
    if (month == 0) textout += " января";
    if (month == 2) textout += " марта";
    if (month == 3) textout += " апреля";
    if (month == 4) textout += " мая";
    if (month == 5) textout += " июня";
    if (month == 6) textout += " июля";
    if (month == 7) textout += " августа";
    if (month == 8) textout += " сентября";
    if (month == 9) textout += " октября";
    if (month == 10) textout += " ноября";
    if (month == 11) textout +="  декабря";

    const textareaText = this.textarea.value;
    const formItem = document.createElement('div');

    this.textarea.value = '';

    formItem.className = 'review__form-item';
    formItem.innerHTML = `<div class="review__author">
        <h3>Гость</h3>
        <span>${textout} ${year}</span>
    </div>
    <div class="review__message j-message">${textareaText}</div>`;

    if (!textareaText.trim()) {
      this.textarea.classList.add('review__input-error')
    } else {
      this.textarea.classList.remove('review__input-error')
      this.form.appendChild(formItem);
    }
  }
}

new Review('.j-form', '.j-textarea', '.j-button');
