// Sätteri mdast plugin that turns GitHub-style alerts into styled callouts:
//
//   > [!WARNING]
//   > This deletes every pod in the namespace.
//
// becomes <blockquote class="callout callout-warning"> with a title paragraph.

// Titles are part of the post body, so they use the posts' language (Vietnamese)
const TITLES = {
	note: 'Ghi chú',
	tip: 'Mẹo',
	important: 'Quan trọng',
	warning: 'Cảnh báo',
	caution: 'Thận trọng',
};

const MARKER = /^\[!(note|tip|important|warning|caution)\][ \t]*\n?/i;

export const calloutsPlugin = {
	name: 'callouts',
	blockquote(node, ctx) {
		const paragraph = node.children[0];
		const text = paragraph?.type === 'paragraph' ? paragraph.children[0] : undefined;
		const match = text?.type === 'text' ? MARKER.exec(text.value) : null;
		if (!match) return;

		const type = match[1].toLowerCase();
		const rest = text.value.slice(match[0].length);

		// Strip the [!TYPE] marker, dropping the paragraph if the marker was all it held
		if (rest) {
			ctx.setProperty(text, 'value', rest);
		} else if (paragraph.children.length > 1) {
			ctx.removeNode(text);
		} else {
			ctx.removeNode(paragraph);
		}

		ctx.setProperty(node, 'data', { hProperties: { className: ['callout', `callout-${type}`] } });
		ctx.prependChild(node, {
			type: 'paragraph',
			data: { hProperties: { className: ['callout-title'] } },
			children: [{ type: 'text', value: TITLES[type] }],
		});
	},
};
