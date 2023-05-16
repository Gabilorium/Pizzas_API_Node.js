//Getall
function GetPizzas() {
    const TOPE = document.getElementById('getAlltope').value;
    const ORDER_FIELD = document.getElementById('getAllorderField').value;
    const SORT_ORDER = document.getElementById('getAllsortOrder').checked;

    axios
    .get(`http://localhost:3000/pizzas/GetAll/?top=${top == undefined ? null : top}&${orderField == undefined ? null : orderField}&${sortOrder == undefined ? null : sortOrder}`)
    .then((response) => {
        console.log(response)
            const pizzas = response.data;
            const pizzasTable = document.getElementById('pizzasTable');
            pizzasTable.innerHTML = '';
            pizzas.map(pizza => {
                //Tabla    
                const tr = document.createElement('tr');
                const idTd = document.createElement('td');
                const nombreTd = document.createElement('td');
                const importeTd = document.createElement('td');
                const libreGlutenTd = document.createElement('td');
                const descripcionTd = document.createElement('td');
                
                idTd.textContent = pizza.Id;
                nombreTd.textContent = pizza.Nombre;
                importeTd.textContent = pizza.Importe;
                libreGlutenTd.textContent = pizza.LibreGluten;
                descripcionTd.textContent = pizza.Descripcion;
                
                tr.appendChild(idTd);
                tr.appendChild(nombreTd);
                tr.appendChild(importeTd);
                tr.appendChild(libreGlutenTd);
                tr.appendChild(descripcionTd);                 
                pizzasTable.appendChild(tr);
            });
    })
    .catch((error) => {
        console.error(error);
    });
}
// Función para obtener una pizza por ID
function getPizzaById() {
const pizzaId = document.getElementById('pizzaIdInput').value;
axios.get(`http://localhost:3000/pizzas/GetById/${pizzaId}`)
    .then(response => {
        const pizza = response.data;
        
        //Tabla
        const pizzasTable = document.getElementById('pizzasTable');
        pizzasTable.innerHTML = '';
        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        const nombreTd = document.createElement('td');
        const importeTd = document.createElement('td');
        const libreGlutenTd = document.createElement('td');
        const descripcionTd = document.createElement('td');

        idTd.textContent = pizza.Id;
        nombreTd.textContent = pizza.Nombre;
        importeTd.textContent = pizza.Importe;
        libreGlutenTd.textContent = pizza.LibreGluten;
        descripcionTd.textContent = pizza.Descripcion;
        
        tr.appendChild(idTd);
        tr.appendChild(nombreTd);
        tr.appendChild(importeTd);
        tr.appendChild(libreGlutenTd);
        tr.appendChild(descripcionTd);                 
        pizzasTable.appendChild(tr);;
    })
    .catch(error => {
    console.error(error);
    });
}

// Función para eliminar una pizza
function deletePizza() {
const pizzaId = document.getElementById('deletePizzaIdInput').value;
axios.delete(`/pizzas/Delete/${pizzaId}`)
.then(response => {
    const deleteResult = document.getElementById('deleteResult');
    deleteResult.textContent = response.data;
    })
    .catch(error => {
    console.error(error);
    });
}

// Función para agregar una pizza
function addPizza() {
const name = document.getElementById('addPizzaNameInput').value;
console.log(name);
const glutenFree = document.getElementById('addPizzaGlutenFreeInput').checked;
const price = document.getElementById('addPizzaPriceInput').value;
const description = document.getElementById('addPizzaDescriptionInput').value;

const pizza = {
    Nombre: name,
    LibreGluten: glutenFree,
    Importe: price,
    Descripcion: description
};

axios.post('http://localhost:3000/pizzas/Insert/', pizza)
    .then(response => {
    const addResult = document.getElementById('addResult');
    addResult.textContent = response.data;
    })
    .catch(error => {
    console.error(error);
    });
}

// Función para actualizar una pizza
function updatePizza() {
const pizzaId = document.getElementById('updatePizzaIdInput').value;
const name = document.getElementById('updatePizzaNameInput').value;
const glutenFree = document.getElementById('updatePizzaGlutenFreeInput').checked;
const price = document.getElementById('updatePizzaPriceInput').value;
console.log(price)
const description = document.getElementById('updatePizzaDescriptionInput').value;

const pizza = {
    Id: pizzaId,
    Nombre: name,
    LibreGluten: glutenFree,
    Importe: price,
    Descripcion: description
};

axios.put('http://localhost:3000/pizzas/Update/', pizza)
    .then(response => {
    const updateResult = document.getElementById('updateResult');
    updateResult.textContent = response.data;
    })
    .catch(error => {
    console.error(error);
    });
}