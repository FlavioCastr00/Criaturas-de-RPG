const inputField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const basicInfoResult = document.getElementById("basic-info-result");
const creatureName = document.getElementById("creature-name");
const creatureID = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const creaturePassiveName = document.getElementById("passive-name");
const creaturePassiveDesc = document.getElementById("passive-desc");
const creatureHp = document.getElementById("hp");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const creatureSpecialAttack = document.getElementById("special-attack");
const creatureSpecialDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");

let creatureDataObj = {};

//Função para buscar os dados
const fetchCreature = (creatureNameOrID) => {
    if (inputField.value === "")
    {
        return;
    }
    
    fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureNameOrID}`)
        .then((res) => res.json())
        .then((creatureData) => {
            creatureDataObj = creatureData;
            //Processar dados
            processCreatureData();
        }).catch((err) => {
            console.error("Error fetching creature:", err);
            alert("Creature not found");
        }
    );

    inputField.value = "";
};

//Função para processar dados e mudar elementos do HTML:
function processCreatureData () {  
    basicInfoResult.style.display = "block";
    creatureTypes.innerHTML = "";

    creatureName.innerText = creatureDataObj.name;
    creatureID.innerText = `#${creatureDataObj.id}`;
    creatureWeight.innerText = `Weight: ${creatureDataObj.weight}`;
    creatureHeight.innerText = `Height: ${creatureDataObj.height}`;

    creatureDataObj.types.forEach(type => {
        creatureTypes.innerHTML += `
            <div class="type ${type.name.toLowerCase()}">${type.name.toUpperCase()}</div>
        `
    });

    creaturePassiveName.innerText = creatureDataObj.special.name;
    creaturePassiveDesc.innerText = creatureDataObj.special.description;
    creatureHp.innerText = creatureDataObj.stats[0].base_stat;
    creatureAttack.innerText = creatureDataObj.stats[1].base_stat;
    creatureDefense.innerText = creatureDataObj.stats[2].base_stat;
    creatureSpecialAttack.innerText = creatureDataObj.stats[3].base_stat;
    creatureSpecialDefense.innerText = creatureDataObj.stats[4].base_stat;
    creatureSpeed.innerText = creatureDataObj.stats[5].base_stat;
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetchCreature(inputField.value)
});

inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
    {
        e.preventDefault();
        fetchCreature(inputField.value);
    }
});