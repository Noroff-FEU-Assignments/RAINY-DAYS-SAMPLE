const BASE_URL = 'https://api.noroff.dev/api/v1/rainy-days';

function initStorage() {
    const storage = JSON.parse(localStorage.getItem('CartInfo'));
    !storage && localStorage.setItem("CartInfo", JSON.stringify([]));
}


async function fetchProduct(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message)
    }
}


initStorage();


function countCart(store) {
   return store.length;
}



async function renderProducts() {
    const productList = document.querySelector('#product-list');
    const data = await fetchProduct(BASE_URL);
    data?.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        const h3Element = document.createElement('h3');
        h3Element.innerText = product.title;
        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = product.title;
        const pElement = document.createElement('p');
        pElement.innerText = product.description;
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btnWrapper');
        const btn = document.createElement('button');
        btn.innerText = 'Add to Cart';  // find if the product is exisitng in the localStorage
        btn.addEventListener('click', () => {
            // add the item to local storage
            const cartInfo = JSON.parse(localStorage.getItem('CartInfo'));
            
            if (btn.innerText == 'Add to Cart') {
                cartInfo.push(product);
                localStorage.setItem('CartInfo', JSON.stringify(cartInfo));
                btn.innerText = 'Remove From Cart';
            } else {
                // remove item from the local storage
                let index;
                for(let count = 0; count < cartInfo.length; count++){
                    if (cartInfo[count].id === product.id) {
                        index = count;
                        break;
                    }
                }
                cartInfo.splice(index, 1);
                localStorage.setItem('CartInfo', JSON.stringify(cartInfo));
                btn.innerText = 'Add to Cart';
            }
            // increment/decrement the cart counter
            const counter = countCart(JSON.parse(localStorage.getItem('CartInfo')));
            const cartCounter = document.querySelector('#cart-counter');
            cartCounter.innerText = counter;
        })
        btnWrapper.append(btn);
        card.append(h3Element, imgElement, pElement, btnWrapper);
        productList.append(card)
    })
}


renderProducts();



