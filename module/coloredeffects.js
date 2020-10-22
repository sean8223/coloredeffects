Token.prototype._drawOverlay = async function({src, tint}={}) {
    if ( !src ) return;
    let overlayAlpha = game.settings.get("coloredeffects", "overlayAlpha");
    let overlayColor = colorStringToHex(game.settings.get("coloredeffects", "overlayColor"));
    const tex = await loadTexture(src);
    const icon = new PIXI.Sprite(tex);
    const size = Math.min(this.w * 0.6, this.h * 0.6);
    icon.width = icon.height = size;
    icon.position.set((this.w - size) / 2, (this.h - size) / 2);
    if ( tint ) {
	icon.tint = tint;
	icon.alpha = 0.80;
    }
    else {
	icon.tint = overlayColor;
	icon.alpha = overlayAlpha;
    }
    this.effects.addChild(icon);
}

Token.prototype._drawEffect = async function(src, i, bg, w, tint) {
    let statusColor = colorStringToHex(game.settings.get("coloredeffects", "statusColor"));
    let statusAlpha = game.settings.get("coloredeffects", "statusAlpha");
    let bgColor = colorStringToHex(game.settings.get("coloredeffects", "statusBackgroundColor"));
    let bgAlpha = game.settings.get("coloredeffects", "statusBackgroundAlpha");
    let bgBorderWidth = game.settings.get("coloredeffects", "statusBorderWidth");
    let bgBorderColor = colorStringToHex(game.settings.get("coloredeffects", "statusBorderColor"));
    bg.beginFill(bgColor, bgAlpha).lineStyle(bgBorderWidth, bgBorderColor);
    let tex = await loadTexture(src);
    let icon = this.effects.addChild(new PIXI.Sprite(tex));
    icon.width = icon.height = w;
    icon.x = Math.floor(i / 5) * w;
    icon.y = (i % 5) * w;
    if ( tint ) {
	icon.tint = tint;
    }
    else {
	icon.tint = statusColor;
	icon.alpha = statusAlpha;
    }
    bg.drawRoundedRect(icon.x + 1, icon.y + 1, w - 2, w - 2, 2);
    this.effects.addChild(icon);
}

function registerSettings() {

    game.settings.register("coloredeffects", "overlayColor", {
	name: game.i18n.localize("coloredeffects.overlayColor.name"),
	hint: game.i18n.localize("coloredeffects.overlayColor.hint"),
	scope: "world",
	config: true,
	default: "ffffff",
	type: String
    });
    game.settings.register("coloredeffects", "overlayAlpha", {
	name: game.i18n.localize("coloredeffects.overlayAlpha.name"),
	hint: game.i18n.localize("coloredeffects.overlayAlpha.hint"),
	scope: "world",
	config: true,
	type: Number,
	range: {
	    min: 0.0,
	    max: 1.0,
	    step: 0.01
	},
	default: 0.8
    });
    game.settings.register("coloredeffects", "statusBackgroundColor", {
	name: game.i18n.localize("coloredeffects.statusBackgroundColor.name"),
	hint: game.i18n.localize("coloredeffects.statusBackgroundColor.hint"),
	scope: "world",
	config: true,
	default: "000000",
	type: String
    });
    game.settings.register("coloredeffects", "statusBackgroundAlpha", {
	name: game.i18n.localize("coloredeffects.statusBackgroundAlpha.name"),
	hint: game.i18n.localize("coloredeffects.statusBackgroundAlpha.hint"),
	scope: "world",
	config: true,
	type: Number,
	range: {
	    min: 0.0,
	    max: 1.0,
	    step: 0.01
	},
	default: 0.4
    });
    game.settings.register("coloredeffects", "statusBorderColor", {
	name: game.i18n.localize("coloredeffects.statusBorderColor.name"),
	hint: game.i18n.localize("coloredeffects.statusBorderColor.hint"),
	scope: "world",
	config: true,
	default: "000000",
	type: String
    });
    game.settings.register("coloredeffects", "statusBorderWidth", {
	name: game.i18n.localize("coloredeffects.statusBorderWidth.name"),
	hint: game.i18n.localize("coloredeffects.statusBorderWidth.hint"),
	scope: "world",
	config: true,
	default: 1,
	type: Number
    });
    game.settings.register("coloredeffects", "statusColor", {
	name: game.i18n.localize("coloredeffects.statusColor.name"),
	hint: game.i18n.localize("coloredeffects.statusColor.hint"),
	scope: "world",
	config: true,
	default: "000000",
	type: String
    });
    game.settings.register("coloredeffects", "statusAlpha", {
	name: game.i18n.localize("coloredeffects.statusAlpha.name"),
	hint: game.i18n.localize("coloredeffects.statusAlpha.hint"),
	scope: "world",
	config: true,
	type: Number,
	range: {
	    min: 0.0,
	    max: 1.0,
	    step: 0.01
	},
	default: 1.0
    });
}

Hooks.once("init", () => {
    registerSettings();
});

Hooks.on("closeSettingsConfig", () => {
    let ownedTokens = canvas.getLayer("TokenLayer").ownedTokens;
    for (let t of ownedTokens) {
	t.drawEffects();
    }
});
