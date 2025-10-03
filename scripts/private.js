const btnLogout = document.getElementById("logout");
const cardGallery = document.querySelector(".card-gallery");

btnLogout.addEventListener("click", () => {
  localStorage.removeItem("logged");
  window.location.href = "./index.html";
});

// Función para crear nuestra card con la info del producto
function createProductCardElement(product) {
  // 1. Crear la card (article)
    const card = document.createElement('article');
    card.classList.add('product-card', 'bg-white', 'rounded-xl', 'shadow-lg', 'hover:shadow-xl', 'transition-shadow', 'duration-300', 'overflow-hidden');
    card.setAttribute('data-id', product.id);

    // 2. Crear el contenedor de la imagen (div)
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('h-48', 'w-full', 'overflow-hidden', 'flex', 'items-center', 'justify-center', 'bg-gray-100');

    // 3. Crear el elemento <img>
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = `Imagen de ${product.title}`;
    img.classList.add('h-full', 'w-auto', 'object-contain', 'p-4');
    // Anidar img dentro de imageContainer
    imageContainer.appendChild(img);
    
    // 4. Crear el contenedor de texto (div)
    const textContent = document.createElement('div');
    textContent.classList.add('p-4');

    // 5. Crear el Título (h3)
    const title = document.createElement('h3');
    title.classList.add('text-lg', 'font-semibold', 'text-gray-800', 'truncate', 'mb-1');
    title.textContent = product.title;

    // 6. Crear la Categoría (p)
    const category = document.createElement('p');
    category.classList.add('text-xs', 'text-indigo-600', 'font-medium', 'uppercase', 'mb-2');
    category.textContent = product.category;

    // 7. Crear la Descripción (p)
    const description = document.createElement('p');
    description.classList.add('text-sm', 'text-gray-600', 'line-clamp-2', 'mb-4');
    description.textContent = product.description;

    // 8. Crear el contenedor de Precio y Botón (div)
    const priceButtonContainer = document.createElement('div');
    priceButtonContainer.classList.add('flex', 'justify-between', 'items-center');

    // 9. Crear el Precio (span)
    const priceSpan = document.createElement('span');
    priceSpan.classList.add('text-2xl', 'font-bold', 'text-gray-900');
    priceSpan.textContent = `$ ${product.price.toFixed(2)}`;
    // Anidar el precio
    priceButtonContainer.appendChild(priceSpan);

    // 10. Crear el Botón (button)
    const button = document.createElement('button');
    button.classList.add('bg-indigo-500', 'text-white', 'text-sm', 'font-semibold', 'py-1.5', 'px-3', 'rounded-full', 'hover:bg-indigo-600', 'transition-colors');
    button.setAttribute('data-product-id', product.id);
    button.textContent = 'Añadir';
    // Anidar el botón
    priceButtonContainer.appendChild(button);

    // 12. Anidar todos los elementos de texto al textContent
    textContent.appendChild(title);
    textContent.appendChild(category);
    textContent.appendChild(description);
    textContent.appendChild(priceButtonContainer);

    // 13. Anidar imageContainer y textContent al <article> principal
    card.appendChild(imageContainer);
    card.appendChild(textContent);

    return card;
}

// Fetch y renderizado de productos
fetch('https://fakestoreapi.com/products?limit=8') 
    .then(response => {
        // Si la respuesta no es buena, arroja un error
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Poblamos nuestra card-gallery
        data.forEach(product => {
            const cardElement = createProductCardElement(product);
            cardGallery.appendChild(cardElement);
        });
    })
    .catch(error => {
        console.error("Hubo un error al cargar los productos:", error);
        // Creamos un mensaje de error y lo insertamos a nuestra card-gallery
        const errorMsg = document.createElement('p');
        errorMsg.classList.add("text-red-500", "col-span-full", "p-4");
        errorMsg.textContent = "Error al cargar los productos. Por favor, inténtalo más tarde.";
        cardGallery.appendChild(errorMsg);
    });