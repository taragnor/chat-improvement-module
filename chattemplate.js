// Simple setup to make posted messages tell if they're blind rolls and whispers to make it more obvious

Handlebars.registerHelper('if_str_includes', function(a, b, opts) {
	if (a.includes && a.includes(b)) {
		return opts.fn(this);
	} else {
		if (!a.includes)
			console.error(`includes not in ${a}`)
		return opts.inverse(this);
	}
});

Handlebars.registerHelper('is_quote', function(a) {
	//check to see if string starts wiht double quote
	if (a[0] == '"') return true;
	else return false;
});

CONFIG.ChatMessage.template = "modules/Improved-Chat-Template/template/chat-message.html"

Hooks.on("chatMessage", (x, message, chatData)=> {
	console.log("Calling hook");
	if (message.startsWith("/ghost")) {
		const cls = ChatMessage.implementation;
		const ghostmsg = message.substring(6);
		message =`<div class="ghost-text" data-alttext="die">${ghostmsg}</div>`;

		message = message.replace(/\n/g, "<br>");
		chatData.content = message;
		console.log("Cancelling");
		const createOptions = {};
		cls.create(chatData, createOptions);
		return false;
	} else {
		console.log(msg.content);
	}
});

function ghostswap() {
	$(".ghost-text").each( async function () {
		const origtext=  this.textContent
		this.textContent = ghostswap.generateGhostAltText(origtext);
		await ghostswap.stall(200);
		this.textContent = origtext;
	});
	setTimeout(ghostswap, 5000 + Math.random() * 30000);
}

ghostswap.generateGhostAltText = function (origtext) {
	const subtextlist = ["DEATHdieDEATH", "die", "THEEND", "FINALDESTINATION", "X", "VERYSOON"]
		.filter( x=> x.length <= origtext.length) ?? "";
	const subtext = subtextlist[Math.floor(Math.random() * subtextlist.length)];
	const subtextlen = subtext.length;
	let pos = 0;
	let ret ="";
	for (const letter of origtext) {
		if (/\s/.test(letter))
			ret += letter;
		else
			ret += subtext[ pos++ % subtextlen ];
	}
	return ret;
}

ghostswap.stall = function (time) {
			return new Promise( (keep, brk) => {
				setTimeout( keep, time);
			});
}

ghostswap();



