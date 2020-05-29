export function onClick(element, action) {
    element.addEventListener("click", (event) => {
        event.preventDefault()
        action(event)
    })
}
