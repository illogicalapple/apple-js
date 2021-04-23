function apple(query) {
	let elements = document.querySelectorAll(query);
	return {
		"style": (name, value) => {
			elements.forEach(element => {
				if(value) {
					element.style.setProperty(name, value);
				} else {
					return element.style.getProperty(name);
				}
			});
		},
		"attribute": (name, value) => {
			elements.forEach(element => {
				if(value) {
					element.setAttribute(name, value);
				} else {
					return element.getAttribute(name);
				}
			});
		},
		"length": elements.length,
		"hide": () => {
			elements.forEach(element => {
				element.style.display = "none";
			});
		},
		"show": () => {
			elements.forEach(element => {
				element.style.display = "";
			});
		},
		"remove": () => {
			elements.forEach(element => {
				element.remove();
			});
		},
		"append": (...items) => {
			elements.forEach(element => {
				element.innerHTML = element.innerHTML + items.join("");
			});
		},
		"prepend": (...items) => {
			elements.forEach(element => {
				element.innerHTML = items.join("") + element.innerHTML;
			});
		},
		get html() {
			return elements[0].innerHTML;
		},
		set html(html) {
			elements.forEach(element => {
				element.innerHTML = html;
			});
		},
		get text() {
			return elements[0].textContent;
		},
		set text(text) {
			elements.forEach(element => {
				element.textContent = text;
			});
		},
		"forEach": script => elements.forEach(script),
		"on": (event, handler) => {
			elements.forEach(element => {
				element.addEventListener(event, handler);
			});
		}
	};
}
