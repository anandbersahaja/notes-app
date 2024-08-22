const formNote = document.getElementById("formNote");

/**
 * Show loading
 * @param {HTMLElement} element
 */
export function showLoading(element) {
  element.classList.add("show");
}

/**
 * Hide loading
 * @param {HTMLElement} element
 */
export function hideLoading(element) {
  element.classList.remove("show");
}

/**
 * Reset form
 * @param {HTMLFormElement} element
 */
export const resetForm = (element) => {
  element.id.value = "";
  element.reset();
};
