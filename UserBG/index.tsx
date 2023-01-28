import { Plugin } from "aliucord/entities";
import { getByName, React } from "aliucord/metro";
import { SettingsPage } from "./ui/SettingsPage";
import { before } from "aliucord/utils/patcher";

export default class UserBG extends Plugin {
    public async start() {
        let userid: string;
        type userBGData = {
            uid: string;
            img: string;
        }

        //const datab = await (await fetch("https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json")).json();
        const datab = this.database();

        before(getByName("HeaderAvatar"), "default", (ctx, component) => {
            const { user } = ctx.args[0];
            userid = user.id //the most cursed way to get an id 
        });

        before(getByName("ProfileBanner"), "default", (ctx, component) => {
            let banner = ctx.args[0];

            try {
                if (!banner.bannerSource) {
                    if (datab.find((i: userBGData) => i.uid == userid)) {
                        const userCustomBanner = datab.find((i: userBGData) => i.uid == userid) as userBGData;

                        banner.bannerSource = { uri: userCustomBanner.img };
                    }
                }
            } catch (e) {
                this.logger.error("UserBG Error:", e);
            }
        });
    }
    
    public delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    } 
    
    public async database() {
      while(true) {
        let h = await (await fetch("https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json")).json();
        this.logger.info("Downloaded UserBG database");
        return h;
        await delay(36000);
      } 
    } 
    
    public getSettingsPage() {
        return <SettingsPage />;
    }
}