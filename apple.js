function apple(query) {
	let elements = document.querySelectorAll(query);
	return {
		"style": function(name, value) {
			elements.forEach(element => {
				if(value) {
					element.style.setProperty(name, value);
				} else {
					return element.style.getProperty(name);
				}
			});
		},
		"attribute": function(name, value) {
			elements.forEach(element => {
				if(value) {
					element.setAttribute(name, value);
				} else {
					return element.getAttribute(name);
				}
			});
		},
		"length": elements.length,
		"hide": function() {
			elements.forEach(element => {
				element.style.display = "none";
			});
		},
		"show": function() {
			elements.forEach(element => {
				element.style.display = "";
			});
		},
		"remove": function() {
			elements.forEach(element => {
				element.remove();
			});
		},
		"append": function(append) {
			switch(Object.getPrototypeOf(append).constructor.name) {
				case "HTMLElement":
					let string = append.outerHTML;
					break;
				case "Text":
					let string = apple.escapeHTML(append.nodeValue);
					break;
				default:
					let string = append;
					break;
			}
			elements.forEach(element => {
				element.innerHTML = element.innerHTML + string;
			});
		},
		"prepend": function(prepend) {
			switch(Object.getPrototypeOf(prepend).constructor.name) {
				case "HTMLElement":
					let string = prepend.outerHTML;
					break;
				case "Text":
					let string = apple.escapeHTML(prepend.nodeValue);
					break;
				default:
					let string = prepend;
					break;
			}
			elements.forEach(element => {
				element.innerHTML = string + element.innerHTML;
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
		"on": function(event, handler) {
			elements.forEach(element => {
				element.addEventListener(event, handler);
			});
		}
	};
}
Object.defineProperties(apple, {
	"download": {
		"value": function(filename, contents) {
			let element = document.createElement("a");
			element.setAttribute("href", "data:text/plain;base64," + window.btoa(contents));
			element.setAttribute("download", filename);
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		},
		"writable": true
	},
	"escapeHTML": {
		"value": function(unsafe) {
			return unsafe
				.replaceAll("&", "&amp;")
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;")
				.replaceAll("\"", "&quot;")
				.replaceAll("'", "&#039;");
 		},
		"writable": true
	}
 }
});
