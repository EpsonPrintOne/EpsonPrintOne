import React, { useState } from "react";
import DynamicIcon from "./DynamicIcon";

const VideoThumnail = ({ src, videoId }: { src: string; videoId: string }) => {
  const [play, setPlay] = useState<boolean>(false);

  const onPlay = () => {
    setPlay(true);
  };

  return (
    <div className="video-thumnail mx-auto w-full">
      <img
        className="h-full w-full"
        src={src}
        width={850}
        height={485}
        alt="video-thumnail"
      />
      <button className="h-full w-full" onClick={onPlay}>
        <DynamicIcon
          className="inline-block text-text-dark dark:text-darkmode-dark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          icon="FaPlay"
        />
      </button>

      {play && (
        <iframe
          className="w-full h-full absolute top-0 left-0 z-20"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        />
      )}
    </div>
  );
};

export default VideoThumnail;
