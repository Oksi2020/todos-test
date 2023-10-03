export const validate = {
    inputHandler: null,
    bind: (el, binding) => {
        el.inputHandler = function(e) {
            const ch = String.fromCharCode(e.which);
            const re = new RegExp(binding.value);
            if (!ch.match(re)) {
                e.preventDefault();
            }
        };
        el.addEventListener("keypress", el.inputHandler);
    },
    unbind: function(el) {
        el.removeEventListener("keypress", el.inputHandler);
    }
}
