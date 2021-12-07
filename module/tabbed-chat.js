export class TabbedChat {

	static init() {
		this.tabs = ["Main", "Other"];
		Hooks.on("renderChatLog", this.renderTabs.bind(this));
	}

	static async renderTabs(chatLog, html, user) {

		if (this.tabs.length <= 0) return;

		let toPrepend = '<nav class="tabbed-chat-log tabs">';

		for (let tab of this.tabs) {
			toPrepend += `<a class="item ic" data-tab="ic">${tab}</a><i id="${tab}tab" class="notification-pip fas fa-exclamation-circle"></i>`;

		}
		toPrepend += "</nav>";

		// toPrepend += `<a class="item ic" data-tab="ic">${game.i18n.localize("TC.TABS.IC")}</a><i id="icNotification" class="notification-pip fas fa-exclamation-circle" style="display: none;"></i>`;

		// toPrepend += `<a class="item rolls" data-tab="rolls">${game.i18n.localize("TC.TABS.Rolls")}</a><i id="rollsNotification" class="notification-pip fas fa-exclamation-circle" style="display: none;"></i>`;
		// toPrepend += `<a class="item ooc" data-tab="ooc">${game.i18n.localize("TC.TABS.OOC")}</a></nav><i id="oocNotification" class="notification-pip fas fa-exclamation-circle" style="display: none;"></i>`;
		html.prepend(toPrepend);
		window.game.tabbedchat = {};
		window.game.tabbedchat.tabs =  new Tabs({
			navSelector: ".tabs",
			contentSelector: ".content",
			initial: "tab1",
			callback: function (event, html, tab) {
				TabbedChat.currentTab = tab;


				// setClassVisibility($(".type0"), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.OTHER));
				// setClassVisibility($(".type1"), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.OOC));
				// setClassVisibility($(".type2").filter(".scenespecific"), false);
				// setClassVisibility($(".type2").not(".scenespecific"), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.IC));
				// setClassVisibility($(".type2").filter(".scene" + game.user.viewedScene), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.IC));
				// setClassVisibility($(".type3").filter(".scenespecific"), false);
				// setClassVisibility($(".type3").not(".scenespecific"), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.EMOTE));
				// setClassVisibility($(".type3").filter(".scene" + game.user.viewedScene), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.EMOTE));
				// setClassVisibility($(".type4"), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.WHISPER));
				// setClassVisibility($(".type5").filter(".scenespecific"), false);
				// setClassVisibility($(".type5").filter(".gm-roll-hidden"), false);
				// setClassVisibility($(".type5").filter(".scene" + game.user.viewedScene), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.ROLL));
				// setClassVisibility($(".type5").not(".scenespecific").not(".gm-roll-hidden"), isMessageTypeVisible(CONST.CHAT_MESSAGE_TYPES.ROLL));

				$("#" + tab + "Notification").hide();

				$("#chat-log").scrollTop(9999999);
			}

		});
	window.game.tabbedchat.tabs.bind(html[0]);

		$("[data-tab=\"chat\"]").click(() => {
			setTimeout(() => $(".item." + TabbedChat.currentTab).addClass("active"), 100);
		});

	}


} // end of class

window.TabbedChat = TabbedChat;

