/*
Get some Google fonts:
    https://developers.google.com/fonts/docs/getting_started

Example of a Google Fonts link */
let link = href="https://fonts.googleapis.com/css?family=Indie+Flower|Quicksand|Slabo+27px"

// Default Kitty Ipsum Text:
const kittyText = "Claw at curtains stretch and yawn nibble on tuna ignore human bite human hand sit by the fire annoy kitten brother with poking eat all the power cords soft kitty warm kitty little ball of furr.<br>Meowing chowing and wowing favor packaging over toy. Stare at the wall, play with food and get confused by dust jump five feet high and sideways when a shadow moves. Eat the rubberband need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me kitty poochy purr human is washing you why halp oh the horror flee scratch hiss bite."
const special = "Eines Tages ging ich an den Strand und schlief dort ein.<br><br>Als ich am nächsten Morgen aufwachte, befand ich mich auf einem Boot mitten auf dem Meer. Weit und breit kein anderer Mensch zu sehen. Kein anderes Schiff. Nur ich, der Himmel über mir, und die See unter mir.<br><br>Da kam ein kleiner Fisch vorbei und fragte mich, was ich auf dem Meer so alleine mache. Er fragte, ob ich mich verirrt habe und ob er mir helfen soll, den Weg zu finden.<br><br>Ich sagte: Nein du Hurensohn."
let fontList = [];

// Selecting page elements:
const codeSnippetField = document.querySelector("#codeSnippet");
const submitCodeSnippet = document.querySelector("#submitCodeSnippet")
const kittyIpsumText = document.querySelector("#kittyIpsumText");
const customText = document.querySelector("#customText");
const customTextField = document.querySelector("#customTextField");
const fontTable = document.querySelector("#fontTable");

customTextField.disabled = true;


function processCodeSnippet() {
    const codeSnippet = codeSnippetField.value;
   
    // 1.1 slices the link for the href attribute in <link> element of head:
    let hrefLinkIndex1 = codeSnippet.indexOf("https://");
    let hrefLink = codeSnippet.slice(hrefLinkIndex1);
    let hrefLinkIndex2 = hrefLink.indexOf('"');
    hrefLinkIndex2 = (hrefLinkIndex2 == -1)? Infinity : hrefLinkIndex2;
    hrefLink = hrefLink.slice(0, hrefLinkIndex2);
    console.log("hrefLink = " + hrefLink);
    document.getElementById("googleFontsStylesheet").href = hrefLink;

    // 1.2 slices the font selection out of the code snippet
    let index = codeSnippet.indexOf("family=") + 7;
    let slicedLink = codeSnippet.slice(index);
    let index2 = slicedLink.indexOf("&");
    
    if (index2 == -1) {
        index2 = slicedLink.indexOf('"');
        if (index2 == -1) {
            index2 = Infinity;
        }
    }
    fontString = slicedLink.slice(0, index2);


    // 2. replaces all "+" with spaces
    let fontStringNew = (fontString) => {
        let fontStringNew = "";
        let faultyFonts = 0;
        let fontError;
        for (let i = 0; i < fontString.length; i++) {
            if (fontString[i] == "+") {
                fontStringNew += " ";
            } else if (fontString[i] == ":") {
                // delete part from ":"" to "|"" but let "|"" exist:
                // start from fontString[i] and search for the next "|".
                // remove string between fontString[i] and index of next "|".
                alert("Style appendix is not supported (yet) !");
                faultyFonts += 1;
                fontError = true;
            } else {
                fontStringNew += fontString[i];
            }
        }
        if (fontError) { alert(faultyFonts + " font(s) won't be shown in their own font style.") }
        return fontStringNew;
    }

    // 3. safes all fonts to a final fontList by splitting the selection by "|"s in the string.
    /* console.log(fontStringNew(fontString)); */
    fontList = fontStringNew(fontString).split("|");
    console.log(fontList);
    writeTable(fontList);
}

// 4. writes the list in html.
function writeTable(fontList) {
    let textExample;
    if (customText.checked) {
        if (!customTextField.value) {
            textExample = "empty";
        } else if (customTextField.value.trim().toLowerCase() == "special") {
            textExample = special;
        } else {
            textExample = customTextField.value;
        }
        
    } else { textExample = kittyText}

    const table = (fontList) => {
        let fontListHtml = `<table class="font-Table"><tr><th colspan="3">${fontList.length} fonts to compare</th></tr><tr><td></td><td></td><td></td></tr>`;
        for (i = 0; i < fontList.length; i++) {
            fontListHtml += `\
                <tr style="font-family: '${fontList[i]}'">\
                    <td style="font-family:'Source Sans Pro', sans-serif;">${i+1}</td>\
                    <td>${fontList[i]}</td>\
                    <td>${textExample}</td>\
                </tr>`
                // fallback (sans-serif) is deleted from <tr> now.
        }
        return fontListHtml += "</table>";
    }

    // 5. writes html code to html element (<div>)
    fontTable.innerHTML = table(fontList);
    fontTable.scrollIntoView();
}

function selctTextExample() {
    if (customText.checked) {
        customTextField.disabled = false;
    } else { customTextField.disabled = true; }
} 


submitCodeSnippet.onclick = function() {processCodeSnippet()};
customText.addEventListener("change", selctTextExample); // Wondering: If I don't add an EventListener for both radio buttons, it works only when activating the choosen radio button. When switching back, nothing happens.
kittyIpsumText.addEventListener("change", selctTextExample);
customTextField.addEventListener("change", writeTable(fontList)); // not necessary... Should 

/*
My 102 favorite fonts are:
"https://fonts.googleapis.com/css?family=Tangerine|Caveat+Brush|Actor|Advent+Pro|Alegreya+Sans+SC|Allerta+Stencil|Anaheim|Antic|Archivo|Arimo|Assistant|Averia+Sans+Libre|Barlow|Belleza|Bubbler+One|Buda:300|Cabin|Cambay|Cantarell|Carrois+Gothic|Catamaran|Caudex|Chau+Philomene+One|Cuprum|Cutive+Mono|Didact+Gothic|Duru+Sans|East+Sea+Dokdo|Economica|Encode+Sans+Condensed|Expletus+Sans|Fauna+One|Forum|Fresca|Gafata|Galdeano|Gothic+A1|Harmattan|Heebo|Hind|Hind+Siliguri|Hind+Vadodara|IM+Fell+DW+Pica+SC|IM+Fell+Great+Primer+SC|Jaldi|Julee|Karla|Kreon|Lateef|Mada|Mallanna|Mandali|Marcellus|Marmelad|Martel+Sans|Mate+SC|Mirza|Molengo|Mukta+Mahee|Muli|NTR|Nanum+Gothic+Coding|News+Cycle|Nova+Flat|Numans|Open+Sans|Overpass|Oxygen|PT+Sans+Narrow|Padauk|Palanquin|Pavanam|Pontano+Sans|Proza+Libre|Questrial|Quicksand|Rajdhani|Reem+Kufi|Roboto|Ropa+Sans|Rosario|Rubik|Ruthie|Saira+Semi+Condensed|Sarala|Scada|Shanti|Slabo+13px|Source+Sans+Pro|Spinnaker|Sree+Krushnadevaraya|Sriracha|Tajawal|Telex|Tenor+Sans|Text+Me+One|Trykker|Unna|Varela+Round|Yantramanav|Lato|Montserrat"

Oh, soo wonderful:
<link href="https://fonts.googleapis.com/css?family=Alegreya+Sans|Amatic+SC|Cookie|Courgette|Dancing+Script|Great+Vibes|Indie+Flower|Kaushan+Script|Lora|Satisfy|Shadows+Into+Light" rel="stylesheet">
*/


/*
To do:
- If radio button with name "Text example" === value "kitty ipsum text": id "customTextField" disabled...
- If Text example === value "custom text": do not display kittyText but value of id "customTextField".

- textfield deactivate resizing.

- Handle Style appendix like |Tangerine:bold,bolditalic| (just cutout)
- Error handling:
    - errors in the snippet like "family=" missing
    - Typos in fonts, unknown font will rise fallback font:
        If font = default (Arial), write "Arial" in 2nd column and/or make the text example red.
    (very fatal: more " and ' added to the snippet. It will dismantle the HTML code string for the table.)
*/