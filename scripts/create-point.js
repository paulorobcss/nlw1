function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (res) => {return(res.json())})
        .then(states => {
            for(state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event){ // Colocando 'event' como entrada da função, ele puxa o evento como se fosse adicionado normalmente
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
        .then( (res) => {return(res.json())})
        .then(cities => {
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
        })
        citySelect.disabled = false
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    // Adicionar ou remover uma classe com js => add, remove ou toggle
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    // Verificar se já existem itens adicionados
    const alreadySelected = selectedItems.findIndex((item) => {
        return item == itemId // retorna -1 se não estiver no vetor
    })
    // Se já estiver selecionado, retirar da seleção
    if (alreadySelected != -1){
        const filteredItems = selectedItems.filter(item => {
            return item != itemId
        })
        selectedItems = filteredItems
    } else { // Se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}