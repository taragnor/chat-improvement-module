// Simple setup to make posted messages tell if they're blind rolls and whispers to make it more obvious

import {TabbedChat} from "./tabbed-chat.js";

TabbedChat.init();

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

CONFIG.ChatMessage.template = "modules/taragnor-improved-chat/template/chat-message.html"

Hooks.on("chatMessage", (x, message, chatData)=> {
	if (message.startsWith("/ghost")) {
		const cls = ChatMessage.implementation;
		const ghostmsg = message.substring(6).trim();
		message =`<div class="ghost-text" data-alttext="die">"${ghostmsg}"</div>`;

		message = message.replace(/\n/g, "<br>");
		chatData.content = message;
		const createOptions = {};
		cls.create(chatData, createOptions);
		return false;
	} else {
		console.log(msg.content);
	}
});

function ghostswap() {
	const DEBUG_FACTOR = 1;
	// const DEBUG_FACTOR = 100;
	$(".ghost-text").each( async function () {
		const origtext=  this.textContent
		this.style.filter = "blur(1px)";
		await ghostswap.stall(100);
		this.style.filter = "blur(2px)";
		await ghostswap.stall(100);
		this.textContent = ghostswap.generateGhostAltText(origtext);
		this.style.filter = "blur(3px)";
		await ghostswap.stall(100);
		this.style.filter = "blur(2px)";
		await ghostswap.stall(150);
		this.style.filter = "blur(1px)";
		await ghostswap.stall(350);
		this.style.filter = "blur(2px)";
		await ghostswap.stall(150);
		this.style.filter = "blur(3px)";
		await ghostswap.stall(100);
		this.textContent = origtext;
		this.style.filter = "blur(2px)";
		await ghostswap.stall(150);
		this.style.filter = "blur(1px)";
		await ghostswap.stall(250);
		this.style.filter = "blur(0.1px)";
	});
	setTimeout(ghostswap, 5000 + Math.random() * 150000 / DEBUG_FACTOR);
}

ghostswap.generateGhostAltText = function (origtext) {
	const subtextlist = ["DEATHdieDEATH", "DIE", "THEEND", "FINALDESTINATION", "VERYSOON"]
		.filter( x=> x.length <= origtext.length) ?? "";
	const subtext = subtextlist[Math.floor(Math.random() * subtextlist.length)];
	const subtextlen = subtext.length;
	const font = "normal 24pt Ghost";
	const textwidth = ghostswap.getTextWidth(origtext, font);
	let pos = 0;
	let ret ="";
	for (const letter of origtext) {
		if (/\s/.test(letter) || letter == '"')
			ret += letter;
		else
			ret += subtext[ pos++ % subtextlen ];
		if (ghostswap.getTextWidth(ret, font) >= textwidth)
			break;
	}
	return ret;
}

ghostswap.stall = function (time) {
			return new Promise( (keep, brk) => {
				setTimeout( keep, time);
			});
}

ghostswap.getTextWidth = function (text, font) {
	const canvas = ghostswap.getTextWidth.canvas || (ghostswap.getTextWidth.canvas = document.createElement("canvas"));
	const context = canvas.getContext("2d");
	context.font = font;
	const metrics = context.measureText(text);
	return metrics.width;
}

setTimeout(ghostswap, 5000 + Math.random() * 50000);






