import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const Fields = document.getElementsByClassName("field");
const TurnText = document.getElementById("turn");

// player properties
const Players = [{ symbol: "┃", span: "v", color: "rgb(0, 106, 255)" }, { symbol: "━", span: "h", color: "red" }];

// complete fields
let complete = [false, false, false, false, false, false, false, false, false];

// turn management
let turn = Math.round(Math.random());
TurnText.innerHTML = getTurnText(Players[turn].symbol, Players[turn].color);

checkSelectable(Fields);

// win condition
let win = false;

for (const field of Fields) {

    field.addEventListener("click", () => {
        const span = field.getElementsByClassName(Players[turn].span)[0];
        const index = Array.from(field.parentElement.children).indexOf(field);

        if (!win) {
            if (span.innerHTML == "" && !field.classList.contains("locked")) {
                span.innerHTML = Players[turn].symbol;

                removeTemporaryClasses();

                // lock the last selected field
                field.classList.add("locked");

                // complete condition
                if (field.getElementsByClassName("v")[0].innerHTML == "┃" &&
                    field.getElementsByClassName("h")[0].innerHTML == "━")
                    complete[index] = true;

                // win condition
                // horizontal
                if (complete[0] && complete[1] && complete[2]) { win = true };
                if (complete[3] && complete[4] && complete[5]) { win = true };
                if (complete[6] && complete[7] && complete[8]) { win = true };
                // vertical
                if (complete[0] && complete[3] && complete[6]) { win = true };
                if (complete[1] && complete[4] && complete[7]) { win = true };
                if (complete[2] && complete[5] && complete[8]) { win = true };
                // diagonal
                if (complete[0] && complete[4] && complete[8]) { win = true };
                if (complete[2] && complete[4] && complete[6]) { win = true };
                // IT'S HARD CODED I KNOW BAD BUT I DON'T CARE

                // change turn player
                turn = opposite(turn);
                TurnText.innerHTML = getTurnText(Players[turn].symbol, Players[turn].color);

                checkSelectable(Fields);
            }
        }

        if (win) {
            TurnText.innerHTML = `🏆 <span style="color:${Players[opposite(turn)].color};">${Players[opposite(turn)].symbol}</span> 🏆`;
            removeTemporaryClasses();
            confetti();
        }

    });
}

function opposite(turn) {
    return turn == 0 ? 1 : 0;
}

function getTurnText(symbol, color) {
    return `↓ <span style="color:${color};">${symbol}</span> ↓`
}

function removeTemporaryClasses() {
    for (const testedField of Fields) {
        if (testedField.classList.contains("locked"))
            testedField.classList.remove("locked");
        if (testedField.classList.contains("selectable"))
            testedField.classList.remove("selectable");
    }
}

function checkSelectable(fields) {
    for (const testedField of fields) {
        if (testedField.getElementsByClassName(Players[turn].span)[0].innerHTML == "")
            testedField.classList.add("selectable");
    }
}