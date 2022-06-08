class Notes {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.title = "";
    this.text = "";
    this.id = "";
    this.$placeholder = document.getElementById ("placeholder");
    this.$form = document.getElementById ("form");
    this.$notes = document.getElementById ("notes");
    this.$noteTitle = document.getElementById("note-title");
    this.$noteText = document.getElementById("note-text");
    this.$formButtons = document.getElementById("form-buttons");
    this.$formCloseButton = document.getElementById("form-close-button");
    this.$modal = document.getElementsByClassName("modal");
    this.$modalTitle = document.getElementsByClassName("modal-title");
    this.$modalText = document.getElementsByClassName("modal-text");
    this.$modalCloseButton = document.getElementsByClassName("modal-close-button");
    this.render();
    this.allEvent();
  }

  event() {
    document.body.addEventListener("click", event => {
      this.handleFormClick(event);
      this.selectNote(event);
      this.openModal(event);
      this.deleteNote(event);
    });

    this.$form.addEventListener("submit", event => {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      const answer = title || text;
      if (answer) {
        // tO add note
        this.addNote({ title, text });
      }
    });
    this.$formCloseButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      this.closeForm();
    });

    this.$modalCloseButton.addEventListener("click", event => {
      event.preventDefault();
      this.closeModal(event);
    });
  }
}

new Notes();
