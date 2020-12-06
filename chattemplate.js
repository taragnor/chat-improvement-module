// Simple setup to make posted messages tell if they're blind rolls and whispers to make it more obvious

Handlebars.registerHelper('if_str_includes', function(a, b, opts) {
	if (a.includes && a.includes(b)) {
		return opts.fn(this);
	} else {
		if (!a.includes)
			console.log(`includes not in $a`)
		return opts.inverse(this);
	}
});

CONFIG.ChatMessage.template = "modules/Improved-Chat-Template/template/chat-message.html"
