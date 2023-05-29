import { items } from "./data.js"

const productList = document.querySelector(".body__div-productsWrapper");
const figureTemplate = document.querySelector(".body__figure");
const filter = document.querySelector(".body__input-fuzzySearch");
const sortByName = document.querySelector(".body__button-sortByName");
const sortByPrice = document.querySelector(".body__button-sortByPrice");
const arrowName = document.querySelector("#arrowName");
const arrowPrice = document.querySelector("#arrowPrice");

let sortedBy = document.querySelector(".body__h2-span");
let isNameAscendingOrder = true;
let isPriceAscendingOrder = true;
let isSortingByName = true;
let isSortingByPrice = false;
let clickTimer = null;

// Functionality to generate figures from the objects of the parameter itemsArr
function renderItems(itemsArr) {
    productList.innerHTML = "";
    itemsArr.forEach(item => {
        const clonedFigure = figureTemplate.cloneNode(true);
        clonedFigure.classList.remove("hidden");
        const itemImage = clonedFigure.querySelector(".body__img");
        const itemName = clonedFigure.querySelector(".body__li-itemName");
        const itemPrice = clonedFigure.querySelector(".body__li-itemPrice");

        itemImage.src = item.image;
        itemImage.alt = item.alt;
        itemName.textContent = item.name;
        itemPrice.textContent = "£" + item.price;

        productList.appendChild(clonedFigure);
    });

}

// Functionality to organize the objects of itemsArr by ascending alphabetic order (A-Z)
function sortNameAscending(itemsArr) {
    const itemsNameAscending = itemsArr.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    renderItems(itemsNameAscending);
}

// Functionality to handle clicking once on the 'name' button
function handleSortByNameClick(e, itemsArr) {
    e.preventDefault();
    filter.value = '';
    isSortingByName = true;
    isSortingByPrice = false;
    if (sortByName.classList.contains('disabled')) {
        sortByName.classList.remove('disabled');
        sortByPrice.classList.add('disabled');
    }

    clearTimeout(clickTimer);

    if (!isNameAscendingOrder) {
        sortNameAscending(itemsArr);
        isNameAscendingOrder = true;
    } else {
        clickTimer = setTimeout(() => {
            sortNameAscending(itemsArr);
            isNameAscendingOrder = true;
        }, 250);
    }

    sortedBy.innerHTML = "name (ascending)";

    arrowName.classList.remove('descend');
    arrowName.classList.add('ascend');
}

// Functionality to organize the objects of itemsArr by descending alphabetic order (Z-A)
function sortNameDescending(itemsArr) {
    const itemsNameDescending = itemsArr.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase();

        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });

    renderItems(itemsNameDescending);
}

// Functionality to handle clicking twice on the 'name' button
function handleSortByNameDoubleClick(e, itemsArr) {
    e.preventDefault();
    filter.value = '';
    isSortingByName = true;
    isSortingByPrice = false;
    clearTimeout(clickTimer);
    sortNameDescending(itemsArr);
    isNameAscendingOrder = false;
    sortedBy.innerHTML = "name (descending)"
    arrowName.classList.remove('ascend');
    arrowName.classList.add('descend');
}

// Functionality to organize the objects of itemsArr by price in ascending order
function sortPriceAscending(itemsArr) {
    const itemsPriceAscending = itemsArr.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;

        if (priceA < priceB) {
            return -1;
        }
        if (priceA > priceB) {
            return 1;
        }
        return 0;
    });

    renderItems(itemsPriceAscending);
}

// Functionality to handle clicking once on the 'price' button
function handleSortByPriceClick(e, itemsArr) {
    e.preventDefault();
    filter.value = '';
    isSortingByName = false;
    isSortingByPrice = true;
    if (sortByPrice.classList.contains('disabled')) {
        sortByPrice.classList.remove('disabled');
        sortByName.classList.add('disabled');
    }
    clearTimeout(clickTimer);

    if (!isPriceAscendingOrder) {
        sortPriceAscending(itemsArr);
        isPriceAscendingOrder = true;
    } else {
        clickTimer = setTimeout(() => {
            sortPriceAscending(itemsArr);
            isPriceAscendingOrder = true;
        }, 250);
    }
    sortedBy.innerHTML = "price (ascending)"
    arrowPrice.classList.remove('descend');
    arrowPrice.classList.add('ascend');
}

// Functionality to organize the objects of itemsArr by price in descending order
function sortPriceDescending(itemsArr) {
    const itemsPriceDescending = itemsArr.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;

        if (priceA > priceB) {
            return -1;
        }
        if (priceA < priceB) {
            return 1;
        }
        return 0;
    });

    renderItems(itemsPriceDescending);
}

// Functionality to handle clicking twice on the 'price' button
function handleSortByPriceDoubleClick(e, itemsArr) {
    e.preventDefault();
    filter.value = '';
    isSortingByName = false;
    isSortingByPrice = true;
    clearTimeout(clickTimer);
    sortPriceDescending(itemsArr);
    isPriceAscendingOrder = false;
    sortedBy.innerHTML = "price (descending)";
    arrowPrice.classList.remove('ascend');
    arrowPrice.classList.add('descend');
}

// Functionality to retrieve items based on the leters inserted on the search input
function fuzzySearch(e) {
    const { value } = e.target;

    let searchResultsArr = items.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    });
    
    productList.innerHTML = "";

    if(isSortingByName) {
        if(isNameAscendingOrder) {
            sortNameAscending(searchResultsArr)
        } else {
            sortNameDescending(searchResultsArr)
        }
    } else {
        if(isPriceAscendingOrder) {
            sortPriceAscending(searchResultsArr)
        } else {
            sortPriceDescending(searchResultsArr)
        }
    }
    if (searchResultsArr.length === 0) {
        const noResultsMessage = document.createElement("li");
        noResultsMessage.textContent = "Sorry, no matches found.";
        productList.appendChild(noResultsMessage);
      }
}

// Render the items by ascending alphabetical order when page loads/reloads
sortNameAscending(items);

filter.addEventListener("input", (e) => fuzzySearch(e));
sortByName.addEventListener('click', (e) => handleSortByNameClick(e, items));
sortByName.addEventListener('dblclick', (e) => handleSortByNameDoubleClick(e, items));
sortByPrice.addEventListener('click', (e) => handleSortByPriceClick(e, items));
sortByPrice.addEventListener('dblclick', (e) => handleSortByPriceDoubleClick(e, items));
window.addEventListener('beforeunload', () => filter.value = '');
