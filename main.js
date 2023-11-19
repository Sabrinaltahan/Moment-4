// Funktion som körs när sidan har laddats

document.addEventListener('DOMContentLoaded', function () {
    // Ladda befintliga uppgifter från lagring
    loadStorage();

    // Lägg till en händelsehanterare för textinmatningsfältet
    document.getElementById('newtodo').addEventListener('input', function () {
        // Kolla inmatningen när användaren skriver
        checkItemText();
    });

    // Lägg till en händelsehanterare för "Lägg till" -knappen
    document.getElementById('newtodobutton').addEventListener('click', function () {
        // Lägg till uppgiften om texten är giltig
        addItem();
    });

    // Lägg till en händelsehanterare för "Rensa" -knappen
    document.getElementById('clearbutton').addEventListener('click', function () {
        // Rensa listan och lagring
        clearStorage();
    });

    // Lägg till en händelsehanterare för varje "att göra"-post för att möjliggöra borttagning
    document.getElementById('todolist').addEventListener('click', function (event) {
        if (event.target.tagName === 'ARTICLE') {
            // Ta bort uppgiften om användaren klickar på en post
            deleteItem(event.target);
        }
    });
});

// Funktion för att lägga till uppgift i listan
function addItem() {
    // Hämta textinmatningen
    var newItemText = document.getElementById('newtodo').value;

    // Kolla om texten är giltig
    if (checkItemText(newItemText)) {
        // Skapa ett nytt article-element och lägg till i listan
        var newArticle = document.createElement('article');
        newArticle.textContent = newItemText;

        // Lägg till i DOM
        document.getElementById('todolist').appendChild(newArticle);

        // Lägg till i lagring
        storeItem(newItemText);

        // Rensa textinmatningen
        document.getElementById('newtodo').value = '';

        // Uppdatera meddelandet
        document.getElementById('message').textContent = 'Uppgift tillagd!';
    }
}

// Funktion för att radera uppgift från listan och lagring
function deleteItem(item) {
    // Radera från DOM
    item.remove();

    // Radera från lagring
    var items = JSON.parse(localStorage.getItem('items')) || [];
    var index = items.indexOf(item.textContent);
    if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
    }
}

// Funktion för att kontrollera giltigheten av texten
function checkItemText(text) {
    // Kontrollera om texten är minst fem tecken
    if (text.length < 5) {
        // Visa felmeddelande
        document.getElementById('message').textContent = 'minst fem tycken!';
        return false;
    }
    // Rensa felmeddelandet
    document.getElementById('message').textContent = '';
    return true;
}

// Funktion för att ladda befintliga uppgifter från lagring
function loadStorage() {
    var items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(function (itemText) {
        var newArticle = document.createElement('article');
        newArticle.textContent = itemText;
        document.getElementById('todolist').appendChild(newArticle);
    });
}

// Funktion för att lagra en uppgift
function storeItem(itemText) {
    var items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(itemText);
    localStorage.setItem('items', JSON.stringify(items));
}

// Funktion för att rensa listan och lagring
function clearStorage() {
    // Rensa DOM
    document.getElementById('todolist').innerHTML = '';

    // Rensa lagring
    localStorage.removeItem('items');

    // Rensa meddelandet
    document.getElementById('message').textContent = 'Listan har rensats!';
}
