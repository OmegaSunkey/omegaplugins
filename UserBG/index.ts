import { Plugin } from "aliucord/entities";
import { getByProps, getByName, React } from "aliucord/metro";
import { after } from "aliucord/utils/patcher";
//import { ApplicationCommandOptionType } from "aliucord/api";

export default class UserBG extends Plugin {
    public async start() {
        const ProfileBanner = getByName("ProfileBanner"); //thank you cloudburst https://github.com/c10udburst-discord/Aliucord-RightNow-Plugins 
        after(ProfileBanner, "default", (ctx, component) => {
            const [{bannerSource}] = ctx.args;

            if (typeof bannerSource?.uri !== 'string' || !component) return;

            const url = bannerSource.uri
                .replace(/(?:\?size=\d{3,4})?$/, '?size=4096')
                .replace('.webp', '.png');
            this.logger.info(url);
        });
    }
}