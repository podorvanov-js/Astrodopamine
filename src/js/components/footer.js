export function footerInit() {
    const yearSpan = document.getElementById('year')
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear()
    }
}
