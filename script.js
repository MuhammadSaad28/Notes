document.getElementById("note").addEventListener("click", () => {
    const body1 = document.getElementById("body");
    const container = document.createElement("div");
    container.className = "container";
    const head = document.createElement("div");
    head.className = "head";
    const i1 = document.createElement("i");
    i1.className = "fa-solid fa-floppy-disk save";
    const i2 = document.createElement("i");
    i2.className = "fa-solid fa-trash delete";
    const text = document.createElement("textarea");
    text.className = "text";
    head.appendChild(i1);
    head.appendChild(i2);
    container.appendChild(head);
    container.appendChild(text);

    container.querySelector(".delete").addEventListener("click", () => {
        container.remove();
        removeFromLocalStorage(container.dataset.id); // Remove from local storage
    });

    container.querySelector(".save").addEventListener("click", () => {
        const content = text.value;
        const id = Date.now();
        const data = {
            id: id,
            content: content,
        };
        saveToLocalStorage(data);
    });

    body1.appendChild(container);
});

function saveToLocalStorage(data) {
    let savedData = JSON.parse(localStorage.getItem("savedNotes")) || [];
    savedData.push(data);
    localStorage.setItem("savedNotes", JSON.stringify(savedData));
}

function removeFromLocalStorage(id) {
    let savedData = JSON.parse(localStorage.getItem("savedNotes")) || [];
    savedData = savedData.filter((data) => data.id !== parseInt(id));
    localStorage.setItem("savedNotes", JSON.stringify(savedData));
}

// Load saved notes from local storage when the page is loaded
window.onload = function () {
    const savedData = JSON.parse(localStorage.getItem("savedNotes")) || [];
    for (const data of savedData) {
        const container = document.createElement("div");
        container.className = "container";
        container.dataset.id = data.id; // Set the data-id attribute for later use
        const head = document.createElement("div");
        head.className = "head";
        const i1 = document.createElement("i");
        i1.className = "fa-solid fa-floppy-disk save";
        const i2 = document.createElement("i");
        i2.className = "fa-solid fa-trash delete";
        const text = document.createElement("textarea");
        text.className = "text";
        text.value = data.content; // Set the content from saved data
        head.appendChild(i1);
        head.appendChild(i2);
        container.appendChild(head);
        container.appendChild(text);

        container.querySelector(".delete").addEventListener("click", () => {
            container.remove();
            removeFromLocalStorage(container.dataset.id); // Remove from local storage
        });

        document.getElementById("body").appendChild(container);
    }
};