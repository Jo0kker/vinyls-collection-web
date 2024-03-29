type YoutubeEmbedProps = {
  url: string;
};

export const YoutubeEmbed = ({url}: YoutubeEmbedProps) => {
  const youtube_parser = (url: string) => {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    return match && match[2].length == 11 ? match[2] : null;
  };


  return (
    <iframe
      className={"w-full h-full"}
      src={`https://www.youtube.com/embed/${youtube_parser(url)}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
};
