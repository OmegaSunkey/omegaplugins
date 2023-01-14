import { Plugin } from "aliucord/entities";
import { getByProps, getByName, React } from "aliucord/metro";
import { after } from "aliucord/utils/patcher";
//import { ApplicationCommandOptionType } from "aliucord/api";

export default class UserBG extends Plugin {
    public async start() {
      //let userid;
      //const datab = fetch("https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json").then((response) => response.json());
        const ProfileBanner = getByName("ProfileBanner"); //thank you cloudburst https://github.com/c10udburst-discord/Aliucord-RightNow-Plugins 
        after(ProfileBanner, "default", (ctx, component) => {
            const [{bannerSource}] = ctx.args;

            const bnurl = bannerSource.uri
                .replace(/(?:\?size=\d{3,4})?$/, '?size=4096')
                .replace('.webp', '.png');
                
               /* if(bnurl === null) {
                  
                } */
            this.logger.info("Banner URi " + bnurl);
            this.logger.info("Banner ctxargs " + Object.values(bannerSource)) 
        });
        
        const HeaderAvatar = getByName("HeaderAvatar");
        after(HeaderAvatar, "default", (ctx, component) => {
          const [{user, style}] = ctx.args;
          
          this.logger.info("What is this " + Object.values(user));
          this.logger.info("Will this error " + Object.values(user[4]));
        });
    }
}