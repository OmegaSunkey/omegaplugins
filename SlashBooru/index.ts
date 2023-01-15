import { Plugin } from "aliucord/entities";
import { getByProps, MessageActions } from "aliucord/metro";
import { ApplicationCommandOptionType } from "aliucord/api";
//import { parseString } from "xml2js";

export default class SlashBooru extends Plugin {
    public async start() {
      const Clyde = getByProps("sendBotMessage");
        this.commands.registerCommand(
          {
            name: "Safebooru",
            description: "Get Safebooru images",
            options: [
                {
                    name: "tag",
                    description: "The tag that you want to search",
                    type: ApplicationCommandOptionType.STRING,
                    required: true
                }, 
                {
                  name: "pid", 
                  description: "The page you want to search", 
                  type: ApplicationCommandOptionType.INTEGER, 
                  required: true
                }, 
                {
                  name: "limit", 
                  description: "Amount of images you want to send", 
                  type: ApplicationCommandOptionType.INTEGER, 
                  required: true
                }, 
                {
                  name: "send", 
                  description: "Whether to send visible for everyone", 
                  type: ApplicationCommandOptionType.BOOLEAN, 
                  required: false
                }
            ],
            execute: (args, ctx) => {
                const end = this.Gelbooru(args[0].value, args[1].value, args[2].value);
                if(args[3].value) { 
                  MessageActions.sendMessage(ctx.channel.id, {content: end} );
                } else {
                  Clyde.sendBotMessage(ctx.channel.id, end);
                } 
            }
        });
    }
    public async Gelbooru(tag, pid, limit) {
      if(limit > 5) limit = 5;
      //const reg = "file_url=\"(https?:\/\/[\w.\/-]*)\"";
      const url = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=${limit}&pid=${pid}&tags=${tag}&json=1";
      let response = await (await fetch(url)).json();
      let posts = response.post;
      //this.logger.info(imarray);
      return posts.map(h => h.file_url).toString().replace(",", " ");
    } 
} 