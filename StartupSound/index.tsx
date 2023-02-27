import { Plugin } from "aliucord/entities";
import { getByProps, React } from "aliucord/metro";

export default class StartupSound extends Plugin {
    public async start() {
      const Video = getByProps("DRMType");
      return <>
      	<Video source={{ uri: "https://github.com/FierysDiscordAddons/Moyai/raw/main/src/boom.mp4"}}
      		paused={false} 
      		audioOnly={true}/>
      	</>
    }
} 