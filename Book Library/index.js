document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('dialog');
    const addBookBtn = document.getElementById('addBookBtn');
    const submitBookBtn = document.getElementById('submitBook');
    const tableBody = document.getElementById('tableBody');
    const closeAddDialogBtn = dialog.querySelector('.close');
    
    const deleteDialog = document.getElementById("deleteDialog");
    const deleteBookBtn = document.getElementById("deleteBookBtn");
    const deleteBook = document.getElementById("deleteBook");
    const closeDeleteDialogBtn = document.getElementById("closeDeleteDialog");
    
    let bookLibrary = [];

    function Book(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    addBookBtn.addEventListener('click', () => {
        dialog.showModal(); 
    });

    deleteBookBtn.addEventListener("click", () => {
        deleteDialog.showModal();
    });

    deleteBook.addEventListener("click", (e) => {
        e.preventDefault();
        const name = document.getElementById("deleteBookName").value;

        if (name) {
            const bookIndex = bookLibrary.findIndex(book => book.title === name);

            if (bookIndex !== -1) {
                bookLibrary.splice(bookIndex, 1);
                updateTable();
                alert('Book deleted successfully!');
                deleteDialog.close(); 
                document.getElementById("deleteBookName").value = ''; 
            } else {
                alert('Book not found.');
            }
        } else {
            alert('Please enter the name of the book to delete.'); 
        }
    });

    submitBookBtn.addEventListener('click', (e) => {
        e.preventDefault(); 

        const bookName = document.getElementById('addBookName').value;
        const authorName = document.getElementById('authorName').value;
        const bookPages = document.getElementById('bookPages').value;

        if (bookName && authorName && bookPages) {
            const newBook = new Book(bookName, authorName, bookPages);
            bookLibrary.push(newBook);
            addBookToTable(newBook);
            dialog.close();  

            document.getElementById('addBookName').value = '';
            document.getElementById('authorName').value = '';
            document.getElementById('bookPages').value = '';
        } else {
            alert('Please fill out all fields');
        }
    });

    function addBookToTable(book) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td class="bStatus"></td>
        `;
        tableBody.appendChild(row);

        const statusCell = row.querySelector('.bStatus');
        statusCell.addEventListener('click', () => {
            if (statusCell.style.backgroundColor === 'green') {
                statusCell.style.backgroundColor = 'red';
            } else {
                statusCell.style.backgroundColor = 'green';
            }
        });
    }

    function updateTable() {
        tableBody.innerHTML = '';
        bookLibrary.forEach(book => addBookToTable(book));
    }

    closeAddDialogBtn.addEventListener('click', () => {
        dialog.close(); 
    });

    closeDeleteDialogBtn.addEventListener('click', () => {
        deleteDialog.close();
    });
});
