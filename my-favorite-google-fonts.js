/*
1. Get some Google fonts:
    https://developers.google.com/fonts/docs/getting_started

2. Insert your Google fonts selection link here!: */
let link = href="https://fonts.googleapis.com/css?family=Indie+Flower|Open+Sans|Playfair+Display|Poppins|Raleway";

// Default Kitty Ipsum Text:
const kittyText = "Claw at curtains stretch and yawn nibble on tuna ignore human bite human hand sit by the fire annoy kitten brother with poking eat all the power cords soft kitty warm kitty little ball of furr.<br>Meowing chowing and wowing favor packaging over toy. Stare at the wall, play with food and get confused by dust jump five feet high and sideways when a shadow moves. Eat the rubberband need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me kitty poochy purr human is washing you why halp oh the horror flee scratch hiss bite."

// Selecting page elements:
const codeSnippetField = document.querySelector("#codeSnippet");
const submitCodeSnippet = document.querySelector("#submitCodeSnippet");
const customTextField = document.querySelector("#customTextField");
const fontTable = document.querySelector("#fontTable");


function processCodeSnippet() {
    const codeSnippet = codeSnippetField.value;
    $("head").append(codeSnippet);
    
    // 1. slices the font selection out of the code snippet
    let index = codeSnippet.indexOf("family=") + 7;
    let slicedLink = codeSnippet.slice(index);
    let index2 = slicedLink.indexOf("&");
    index2 = (index2 == -1) ? slicedLink.indexOf('"') : index2;
    fontString = slicedLink.slice(0, index2);


    // 2. replaces all "+" with spaces
    let fontStringNew = (fontString) => {
        let fontStringNew = "";
        for (let i = 0; i < fontString.length; i++) {
            if (fontString[i] == "+") {
                fontStringNew += " ";
            } else {
                fontStringNew += fontString[i];
            }
        }
        return fontStringNew;
    }

    // 3. selects all fonts in the final fontList by spliting the selection by "|"s in the string.
    console.log(fontStringNew(fontString));
    let fontList = fontStringNew(fontString).split("|");
    console.log(fontList);


    // 4. writes the list in html.
    const table = (fontList) => {
        let fontListHtml = `<table><tr><th colspan="3">${fontList.length} fonts to compare</th></tr><tr><td></td><td></td><td></td></tr>`;
        for (i = 0; i < fontList.length; i++) {
            fontListHtml += `\
                <tr style="font-family: '${fontList[i]}', sans-serif;">\
                    <td style="font-family:'Source Sans Pro', sans-serif;">${i+1}</td>\
                    <td>${fontList[i]}</td>\
                    <td>${kittyText}</td>\
                </tr>`

        }
        return fontListHtml += "</table>";
    }

    // 5. writes html code to html element (<div>)
    fontTable.innerHTML = table(fontList);
}






// submitCodeSnippet.addEventListener("click", processCodeSnippet); or:
document.getElementById("test").onclick = function() {processCodeSnippet()};

/*
My 102 favorite fonts are:
"https://fonts.googleapis.com/css?family=Tangerine|Caveat+Brush|Actor|Advent+Pro|Alegreya+Sans+SC|Allerta+Stencil|Anaheim|Antic|Archivo|Arimo|Assistant|Averia+Sans+Libre|Barlow|Belleza|Bubbler+One|Buda:300|Cabin|Cambay|Cantarell|Carrois+Gothic|Catamaran|Caudex|Chau+Philomene+One|Cuprum|Cutive+Mono|Didact+Gothic|Duru+Sans|East+Sea+Dokdo|Economica|Encode+Sans+Condensed|Expletus+Sans|Fauna+One|Forum|Fresca|Gafata|Galdeano|Gothic+A1|Harmattan|Heebo|Hind|Hind+Siliguri|Hind+Vadodara|IM+Fell+DW+Pica+SC|IM+Fell+Great+Primer+SC|Jaldi|Julee|Karla|Kreon|Lateef|Mada|Mallanna|Mandali|Marcellus|Marmelad|Martel+Sans|Mate+SC|Mirza|Molengo|Mukta+Mahee|Muli|NTR|Nanum+Gothic+Coding|News+Cycle|Nova+Flat|Numans|Open+Sans|Overpass|Oxygen|PT+Sans+Narrow|Padauk|Palanquin|Pavanam|Pontano+Sans|Proza+Libre|Questrial|Quicksand|Rajdhani|Reem+Kufi|Roboto|Ropa+Sans|Rosario|Rubik|Ruthie|Saira+Semi+Condensed|Sarala|Scada|Shanti|Slabo+13px|Source+Sans+Pro|Spinnaker|Sree+Krushnadevaraya|Sriracha|Tajawal|Telex|Tenor+Sans|Text+Me+One|Trykker|Unna|Varela+Round|Yantramanav|Lato|Montserrat"
*/

/*
To do:
- Check: will it work with style appendix like |Tangerine:bold,bolditalic| ? I guess not.
- The font selection has to become an element of <head> in the .html file.
    To create an element in head:
    v = document.createElement(elementName)     // e. g. let v = document.createElement("link");
    elementName.attribute = "value"         // e. g.  v.id = "vlkj"; v.href = "content"; v.rel = "stylesheet";
    document.head.appendChild()             // e. g. document.head.appendChild(v);

    or... jQuery.... ($ is select)
    $("head").append("<code>");
    - ...

- Error handling:
    - errors in the snippet like "family=" missing
    - Typos in fonts, unknown font will rise fallback font.
    - very fatal: more " and ' added to the snippet. It will dismantle the HTML code string for the table.
*/