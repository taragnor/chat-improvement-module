export class TabbedChat {

	static currentTab = "main";

	static init() {
		this.tabs = ["Main", "1" , "2", "3", "4"];
		Hooks.on("renderChatLog", this.renderTabs.bind(this));
		Hooks.on("renderChatMessage", this.onRenderChatMessage.bind(this));
		Hooks.on("createChatMessage", this.onCreateChatMessage.bind(this));
	}

	static async prependHTML(html) {
		let toPrepend = '<nav class="tabbed-chat-log tabs">';
		for (let tab of this.tabs) {
			toPrepend += `<a class="item ic content" data-tab="${tab.toLowerCase()}">${tab}<i id="${tab.toLowerCase()}-notification" class="tab-notification fas fa-exclamation-circle" style="display: none;"></i></a>`;
		}
		toPrepend += `</nav>`;
		html.prepend(toPrepend);
		return html;
	}

	static async renderTabs(chatLog, html, user) {
		console.log("********Rendering Chat Tabs********");

		if (this.tabs.length <= 0) return;
		await this.prependHTML(html);

		// toPrepend += `<a class="item ic" data-tab="ic">${game.i18n.localize("TC.TABS.IC")}</a><i id="icNotification" class="notification-pip fas fa-exclamation-circle" style="display: none;"></i>`;

		// toPrepend += `<a class="item rolls" data-tab="rolls">${game.i18n.localize("TC.TABS.Rolls")}</a><i id="rollsNotification" class="notification-pip fas fa-exclamation-circle" style="display: none;"></i>`;
		// toPrepend += `<a class="item ooc" data-tab="ooc">${game.i18n.localize("TC.TABS.OOC")}</a></nav><i id="oocNotification" class="notification-pip fas fa-exclamation-circle" style="display: none;"></i>`;
		window.game.tabbedchat = {};
		window.game.tabbedchat.tabs =  new Tabs({
			navSelector: ".tabs",
			contentSelector: ".content",
			initial: "main",
			callback: this.tabsCallback.bind(this),
		});
		window.game.tabbedchat.tabs.bind(html[0]);

		$("[data-tab=\"chat\"]").click(() => {
			setTimeout(() => $(".item." + this.currentTab).addClass("active"), 100);
		});

		$("[data-tab=\"chat\"]").mousedown((event) => {
			if (this.currentTab == "main" || this.currentTab == "create") return;
			switch (event.which) {
				case 1:  return;
				case 2:  this.tabDelete(this.currentTab); return;
				case 3:  this.tabRename(this.currentTab); return;
			}
		});
		setTimeout(() => $(".item." + this.currentTab).addClass("active"), 100);
		return true;
	}

static async tabsCallback (event, html, tab) {
	if (tab == "create"){
		return this.createTab("newtab");
	} else {
	}
	this.currentTab = tab;
	await this.updateVisibility();
	$("#" + tab + "-notification").hide();
	$("#chat-log").scrollTop(9999999);
}

static async updateVisibility() {
	switch (this.currentTab) {
		case "main":
			this.setClassVisibility(`.chat-message.message`, true);
			break;
		default:
			this.setClassVisibility(`.chat-message.message`, false);
			this.setClassVisibility(`.chat-message.message.tabname-${this.currentTab}`, true);
			break;
	}

}

static setClassVisibility(cssSpecifier, visible = true) {
	const cssClass = $(cssSpecifier);
	if (visible) {
		cssClass.removeClass("hardHide");
		cssClass.show();
	} else
		cssClass.hide();
}

static async onCreateChatMessage(chatMessage) {
	if (chatMessage.data.user == game.userId)
		await chatMessage.setFlag("taragnor-improved-chat", "tab-location",  this.currentTab);
	return true;
}

static async ensureTabExists (tabname) {
	if (this.tabs.map(x=> x.toLowerCase()).includes(tabname))
		return;
	return await this.createTab(tabname);
}

static async createTab (tabname) {
	this.tabs.push(tabname);
	return await ui.chat.render(true);
}

static async onRenderChatMessage(chatMessage ,html, _message) {
	const tab = chatMessage.getFlag("taragnor-improved-chat", "tab-location");
	if (!tab) return true;
	await this.ensureTabExists(tab);
	html.addClass(`tabname-${tab}`);
	html.find(".chat-message.message").addClass(`tabname-${tab}`);
	if (this.currentTab != tab) {
		$(`#${tab}-notification`).show();
		setTimeout( () => this.updateVisibility(), 50);
		return false;
	}
	return true;
}

} // end of class

window.TabbedChat = TabbedChat;

