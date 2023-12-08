// DOM elements
const form = document.getElementById("form");
const result = document.querySelector(".result");

// Constants
const plateArea = 260 * 183;
const wasteCoefficient = 1.1;

// Events
form.addEventListener("submit", e => {
    e.preventDefault();
    result.textContent = "";
    const formData = new FormData(form);
    const data = {};
    let unitAreaPrice, pieceArea, profits, piecePrice;

    formData.forEach((value, key) => data[key] = Number(value));

    unitAreaPrice =getUnitAreaPrice(plateArea.data.price)
    
    if(plateArea !== data.height * data.width) {
        unitAreaPrice *= wasteCoefficient;
    }
    
    pieceArea = data.width * data.height;
    profits = data.profits ? data.profits : 0;

    piecePrice = getPiecePrice(pieceArea, unitAreaPrice, profits);

    result.textContent = `La pieza cuesta $${piecePrice}.-`;
})


// Functions
const getUnitAreaPrice = (area, price) => {
    return price / area;
}

const getPiecePrice = (area, unitPrice, profits) => {
    const subtotal = unitPrice * area;
    const plus = subtotal * profits / 100;
    const total = subtotal + plus;
    const totalRounded = Math.ceil(total / 100) * 100;
    return totalRounded;
}
