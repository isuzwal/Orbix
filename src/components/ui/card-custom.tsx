import { Share2Icon, User2Icon } from "lucide-react";
import { useEffect } from "react";

export type Brain = "twitter" | "youtube" | "spotify";

interface CardProps {
  title: string;
  link: string;
  brain: Brain;
  tags: string[];
  username: string;
  upload: string;
  image: string;
  description:string
}

export function Card({ title, link, brain, tags, username, upload, image,description}: CardProps) {
  useEffect(() => {
    if (brain === "twitter" && (window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }, [brain, link]);

  function getYoutubeEmbedUrl(url: string) {
    const short = url.match(/youtu\.be\/([^?]+)/);
    if (short) return `https://www.youtube.com/embed/${short[1]}`;
    const long = url.match(/v=([^&]+)/);
    if (long) return `https://www.youtube.com/embed/${long[1]}`;
    return url;
  }

  return (
    <div
      className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
    >
     
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-[17px] sm:text-[18px] font-semibold text-neutral-700 line-clamp-2 leading-tight flex-1">
          {title}
        </h3>
        <a
          rel="noopener noreferrer"
          className="ml-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          aria-label="Open link"
        >
          <Share2Icon size={16} />
        </a>
      </div>

      {image && (
        <div className="bg-neutral-100 p-2">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              src={image}
              alt={title}
              className="rounded-lg object-cover w-full h-48 sm:h-56 md:h-64 lg:h-72"
            />
          </a>
        </div>
      )}

   
      <div className="p-4 space-y-4 flex flex-col">
     
        {brain === "youtube" && (
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={getYoutubeEmbedUrl(link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}

       
        {brain === "twitter" && (
          <div className="w-full overflow-x-auto">
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}

    
        {brain === "spotify" && (
          <div className="w-full rounded-lg overflow-hidden">
            <iframe
              className="w-full"
              src={link.replace("open.spotify.com", "open.spotify.com/embed")}
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}
         <div>
          <p className="text-neutral-500 text-[12px]">{description}</p>
         </div>
      
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 ">
          <div className="flex flex-wrap">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex m-1 items-center px-3 py-1 rounded-md text-xs sm:text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-end gap-2 items-center text-xs sm:text-sm text-gray-500">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-secondary text-neutral-700 border border-secondary">
              <User2Icon size={14} /> {username}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              {new Date(upload).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
