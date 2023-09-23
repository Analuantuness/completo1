const images = [
    { 'id': '1', 'url':'./img/1.png'},
    { 'id': '2', 'url':'./img/2.png'},
]

const container = document.querySelector('.container-items');
    for (const image of images){
        container.innerHTML += `
        <div class='item'>
        <img src= '${image.url}'
        </div>
        `
    }
 
    let items = document.querySelectorAll('.item');
    document.querySelector('#next').addEventListener('click',()=>{
        container.appendChild(items[0]);
        items = document.querySelectorAll('.item');
    });

    document.querySelector('#previous').addEventListener('click',()=>{
        const lastItem = items[items.length - 1];
        container.insertBefore(lastItem, items[0]);
        items = document.querySelectorAll('.item');

    });

// Variável para manter o estado do carrinho
const cart = [];

// Evento de clique para adicionar produtos ao carrinho
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const product = {
            name: button.parentElement.querySelector('h2').textContent,
            price: parseFloat(button.parentElement.querySelector('p').textContent.replace('R$', '').trim())
        };
        cart.push(product);
        updateCart();
    });
});

// Evento de clique para limpar o carrinho
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    cart.length = 0; // Limpa o carrinho
    updateCart();
});

// Função para atualizar o carrinho
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Limpa a lista de itens no carrinho antes de atualizá-la
    cartList.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button class="remove-from-cart" data-index="${index}">Remover</button>`;
        cartList.appendChild(listItem);
        total += item.price;
    });
    
    cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    
    // Adiciona eventos de clique aos botões "Remover"
    document.querySelectorAll('.remove-from-cart').forEach((removeButton) => {
        removeButton.addEventListener('click', (event) => {
            const indexToRemove = event.target.getAttribute('data-index');
            cart.splice(indexToRemove, 1); // Remove o item do carrinho
            updateCart();
        });
    });
}
function toggleHeart(event) {
    const heartButton = event.target;
    if (heartButton.textContent === "❤️") {
        heartButton.textContent = "🖤";
    } else {
        heartButton.textContent = "❤️";
    }
}

const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
const body = document.body;

toggleDarkModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});
