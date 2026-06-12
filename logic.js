// refernce to pannel 
const pannel = document.querySelector('.colors-pannel')
let arrayOFHexa = JSON.parse(localStorage.getItem('colors')) || [];
// we used this to save the current color,its updated when click savebtn
let activeColor = '';
window.addEventListener('click', (e) => {
    // for hexa value
    if (e.target.id === 'hexa-decimal') {
        copyHexaCode(e)
        showCopiedWord(e)
        return;
    }

    // for color pannel
    if (e.target.id === 'menu') {
        showPannel()
        return;
    }

    if (e.target.id === 'pannel') return;

    // saving the color
    if (e.target.id === 'save') {
        // we got our current color
        const currentColor = getCurrentColor()
        // ################# Beg Of Construction ######################//
        // we created the div inside the pannel that carries color and remove btn
        const colorContainer = createColorSaver()
        // we create element to save the color
        const color = createColor(currentColor)
        // we created remove btn
        const deleteBtn = createDeleteBtn()
        // ################# End Of Construction ######################//
        // save the color
        saveColor(pannel, color, colorContainer, deleteBtn);
        return;
    }

    // generating the color once
    const color = createHexCode();
    displayHexCode(color);
    showingHexCode(color);

})

let copyHexaCode = async (e) => {
    let copied_value = e.target.textContent;
    try {
        await navigator.clipboard.writeText(copied_value)
    } catch (error) {
        console.error('copied failed')
    }
}

function showCopiedWord(e) {
    if (e.target.textContent === 'Copied') return;
    const originalText = e.target.textContent;
    e.target.textContent = 'Copied'
    setTimeout(() => {
        e.target.textContent = originalText
    }, 1000);
}

function createHexCode() {
    // creating random hexa color
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

function displayHexCode(HexColor) {
    // change background color
    document.body.style.backgroundColor = HexColor
}

function showingHexCode(HexColor) {
    // showing the hexa code 
    document.querySelector('.hex_value').textContent = HexColor
}

function showPannel() {
    document.querySelector('.colors-pannel').classList.toggle('show-pannel');
}

function getCurrentColor() {
    // get the active color in the page 
    activeColor = document.querySelector('.hex_value').textContent
    return activeColor
}

function createColor(currenActiveColor) {
    // creating color elements holds the color
    const color = document.createElement('div')
    color.classList.add('color')
    // setting the back to the page color
    color.style.background = currenActiveColor
    color.dataset.color = currenActiveColor
    return color
}

function createColorSaver() {
    // creating html element saves the color
    const colorSaved = document.createElement('div')
    colorSaved.classList.add('color-saved')
    return colorSaved
}

function createDeleteBtn() {
    const removeBtn = document.createElement('p')
    removeBtn.classList.add('remove-color')
    removeBtn.textContent = 'delete'
    return removeBtn
}

function saveColor(pannel, color, colorSaved, deleteBtn) {
    // we made the condition to check if the dataset exists or not to create element save the color
    if (arrayOFHexa.includes(color.dataset.color)) {
        return false
    } else {
        // we put the color dataset inside the array to be checked the next time
        arrayOFHexa.push(color.dataset.color)
        // save the colors in localstorage
        saveColorsInStorage()
        // set the color elements inside the pannel
        colorSaved.appendChild(color)
        colorSaved.appendChild(deleteBtn)
        pannel.appendChild(colorSaved)
    }

}

pannel.addEventListener('click', (e) => {
    // we used stopPropagation in order to stop click event effect from spreading to other elements 
    e.stopPropagation();
    if (e.target.classList.contains('remove-color')) {
        e.target.parentElement.remove()
        // remove color from local storage
        removeColorData(e.target.previousElementSibling.dataset.color)
    }

    if (e.target.classList.contains('color')) {
        // we used those two function as a reusability
        const savedHexa = e.target.dataset.color
        displayHexCode(savedHexa)
        showingHexCode(savedHexa)
    }

})

function saveColorsInStorage() {
    localStorage.setItem('colors', JSON.stringify(arrayOFHexa))
}

function LoadSavedColorsFromLocalStorage() {
    for (let i = 0; i < arrayOFHexa.length; i++) {
        const colorContainer = createColorSaver()
        const color = createColor(arrayOFHexa[i])
        const deletBtn = createDeleteBtn()

        colorContainer.appendChild(color)
        colorContainer.appendChild(deletBtn)
        pannel.appendChild(colorContainer)
    }
}


function removeColorData(colorToDelete) {
    for (let i = 0; i < arrayOFHexa.length; i++) {
        if (colorToDelete === arrayOFHexa[i]) {
            arrayOFHexa.splice(i, 1)
            saveColorsInStorage();
            break;
        }
    }
}

LoadSavedColorsFromLocalStorage()
