import { Plugin } from "aliucord/entities";
import { getByProps, getByName, React } from "aliucord/metro";
import { after } from "aliucord/utils/patcher";
//import { ApplicationCommandOptionType } from "aliucord/api";

export default class UserBG extends Plugin {
    public async start() {
      let userid;
      const regex = .*?\"(http?s:\/\/[\w.\/-]*)\";
      const datab = fetch("https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json").then((response) => response.text());
      
        const HeaderAvatar = getByName("HeaderAvatar");
        after(HeaderAvatar, "default", (ctx, component) => {
          const [{user, style}] = ctx.args;
          userid = Object.values(user)[3]; //the most cursed way to get an id 
        }); 
        
        const ProfileBanner = getByName("ProfileBanner"); //thank you cloudburst https://github.com/c10udburst-discord/Aliucord-RightNow-Plugins 
        after(ProfileBanner, "default", (ctx, component) => {
            const [{bannerSource}] = ctx.args;

            let bnurl = bannerSource.uri;
                
                if(bnurl === null) {
                  try {
                    theimg = datab.match(userid + regex);
                    this.logger.info("Custom Img " + theimg[1]);
                    this.logger.info("User id " + userid);
                    bnurl = theimg[1];
                  } catch(e) {
                    this.logger.info("Wrong wrong" + e);
                  } 
                } 
            this.logger.info("Banner URi " + bnurl);
            //this.logger.info("Banner ctxargs " + Object.values(bannerSource)) 
        });
        
    }
}