import React from "react";

import { IExternalIds } from "@/app/interfaces";
import { SocialIcon } from "react-social-icons";

function Socials({ socialIds }: { socialIds: IExternalIds }) {
  return (
    <div className="socials flex flex-wrap gap-4 my-5">
      {socialIds.facebook_id && (
        <SocialIcon
          target="_blank"
          title="Visit Facebook"
          url={`http://facebook.com/${socialIds.facebook_id}`}
        />
      )}
      {socialIds.youtube_id && (
        <SocialIcon
          target="_blank"
          title="Visit Youtube"
          url={`http://www.youtube.com/${socialIds.youtube_id}`}
        />
      )}
      {socialIds.twitter_id && (
        <SocialIcon
          target="_blank"
          title="Visit TikTok"
          url={`http://www.twitter.com/${socialIds.twitter_id}`}
        />
      )}
      {socialIds.instagram_id && (
        <SocialIcon
          target="_blank"
          title="Visit Instagram"
          url={`http://www.instagram.com/${socialIds.instagram_id}`}
        />
      )}
      {socialIds.tiktok_id && (
        <SocialIcon
          target="_blank"
          title="Visit TikTok"
          url={`http://www.tiktok.com/${socialIds.tiktok_id}`}
        />
      )}
    </div>
  );
}

Socials.propTypes = {};

export default Socials;
