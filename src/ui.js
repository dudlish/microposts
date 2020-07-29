class UI {
    constructor() {
        this.post = document.querySelector('.posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach(post => {
            output += `
            <div class="card mb-3">
            <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="far fa-edit"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="far fa-trash-alt"></i>
            </a>
            </div>
            </div>
            `;
        });
        this.post.innerHTML = output;
    }

    showAlert(message, className) {
        this.clearAlert();

        // Create Div ^ Add Classes
        const div = document.createElement('div');
        div.className = className;

        // Add Text
        div.appendChild(document.createTextNode(message));

        // Get Parent
        const container = document.querySelector('.postsContainer');

        // Get Posts
        const posts = document.querySelector('.posts');

        // Insert Alert
        container.insertBefore(div, posts);

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // Fill Form To Edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // Clear ID Hidden Value
    clearIdInput() {
        this.idInput.value = '';
    }

    // Change Form State
    changeFormState(type) {
        if (type === 'edit') {
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            // Create Cancel Button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            // Get Parent
            const cardForm = document.querySelector('.card-form');

            // Get Element To Insert Before
            const formEnd = document.querySelector('.form-end');

            // Insert Cancel Button
            cardForm.insertBefore(button, formEnd);

        } else {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            // Remove Cancel Button If There
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            // Clear ID From Hidden Field
            this.clearIdInput();

            // Clear Text Fields
            this.clearFields();
        }
    }
}

export const ui = new UI();