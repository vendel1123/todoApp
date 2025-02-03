const zold = document.getElementById('zold');
const kek = document.getElementById('kek');
const piros = document.getElementById('piros');
const sarga = document.getElementById('sarga');

const hatter = document.body.style;
const gomb = document.getElementById('gomb');
let tema = 'piros';

const szinek = [
    {
        name: zold,
        color: '#28A745'
    },
    {
        name: kek,
        color: '#007BFF'
    },
    {
        name: piros,
        color: '#DC3545'
    },
    {
        name: sarga,
        color: '#FFC107'
    }
];

const szoveg = document.getElementById('szoveg');
const dolgok = document.getElementById('dolgok');

// az ablak betöltése után rögtön lefuttatjuk a getCookie függvényt
window.addEventListener('DOMContentLoaded', () => {
    const cookie = getCookie('tema');
    if (cookie) {
        switch (cookie) {
            case 'zold':
                hatter.backgroundColor = '#28A745';
                tema = 'zold';
                break;
            case 'kek':
                hatter.backgroundColor = '#007BFF';
                tema = 'kek';
                break;
            case 'piros':
                hatter.backgroundColor = '#DC3545';
                tema = 'piros';
                break;
            case 'sarga':
                hatter.backgroundColor = '#FFC107';
                tema = 'sarga';
                break;
        }
    }
});

//console.log(szinek);
// a háttérszín beállítása
szinek.forEach(szin => {
    console.log(szin);
    szin.name.addEventListener('click', () => {
        hatter.backgroundColor = `${szin.color}`;
        tema = szin.name.id;
    });
});

// a todo hozzáadása
szoveg.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        //alert('enter-t nyomtál');
        // a lista div elem
        const listaDiv = document.createElement('div');
        listaDiv.className = 'lista';

        // a szöveg, amit meg akarunk jeleníteni
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = szoveg.value;

        // a törlés gomb létrehozása
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "törlés";
        deleteButton.className = 'torles';
        deleteButton.addEventListener('click', () => torles(listaDiv));

        listaDiv.append(titleDiv, deleteButton);

        //console.log(listaDiv);
        
        dolgok.prepend(listaDiv);
        szoveg.value = '';
    }
});

// a téma mentése cookie-ba gomb eseménye
gomb.addEventListener('click', () => {
    setCookie('tema', tema, 3);
});

// a todo-ból való törlés funkciója (eltávolítja a div-et)
function torles(listaDiv) {
    listaDiv.remove();
}

// állítsunk be egy cookie-t, ami a háttérszínt (témát) menti el
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`; // Day, DD Mon YYYY HH:mm:ss GMT
    document.cookie = `${name}=${value};${expires};path=/`;
}

// kinyerjük a cookie-ból a megfelelő háttérszín értéket
function getCookie(key) {
    const cookie = document.cookie.split('; ').find((row => row.startsWith(`${key}=`)));
    // if (cookie.split('=')) {
    //     return cookie.split('=')[1];
    // } else {
    //     return null;
    // }
    return cookie ? cookie.split('=')[1] : null;
};