// apps/triacore_branding/triacore_branding/public/js/triacore_branding.js

(function () {
	const REPLACEMENTS = [
		["Frappe HR", "Triacore HR"],
		["FrappeHR", "Triacore HR"],
	];

	function replaceInTextNodes(root) {
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
		const nodes = [];
		while (walker.nextNode()) nodes.push(walker.currentNode);

		for (const n of nodes) {
			let v = n.nodeValue;
			if (!v) continue;

			let updated = v;
			for (const [from, to] of REPLACEMENTS) {
				updated = updated.split(from).join(to);
			}

			if (updated !== v) n.nodeValue = updated;
		}
	}

	function updateTitle() {
		let t = document.title || "";
		for (const [from, to] of REPLACEMENTS) {
			t = t.split(from).join(to);
		}
		document.title = t;
	}

	function run() {
		replaceInTextNodes(document.body);
		updateTitle();
	}

	// Run once on load
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", run);
	} else {
		run();
	}

	// Also handle SPA updates (Desk changes DOM after load)
	const obs = new MutationObserver(() => run());
	obs.observe(document.documentElement, { childList: true, subtree: true });
})();
