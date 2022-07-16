import { csvToArray } from "./index.js"

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#file").addEventListener("change", (evt) => {
        csvToArray(evt.target.files[0]).then(result => {

            console.log(result);
        })
    })
})