import { createElement } from "./element.js";
// 最原始的dom-diff实现
import { diff } from "./dom-diff.js"
let Virtualdom1 = createElement("ul", { class: "list" }, [
    createElement("li", { class: "item" }, ["1"]),
    createElement("li", { class: "item" }, ["2"]),
    createElement("li", { class: "item" }, ["3"])
]);

let Virtualdom2 = createElement("ul", { class: "list-new" }, [
    createElement("li", { class: "item" }, ["a"]),
    createElement("li", { class: "item" }, ["2"]),
    createElement("li", { class: "item" }, ["c"])
]);
const patchs = diff(Virtualdom1, Virtualdom2);
console.log('补丁包', patchs)