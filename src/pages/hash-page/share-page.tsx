import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router"; 
import Loading from "@/components/ui/loading.view";
import Error from "@/components/ui/error-view";
import { Card , type  Brain } from "@/components/ui/card-custom";
import type { ContentItem } from "../dashbord-view";



export default function Page() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/user/share-content/${shareLink}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
           //@ts-ignore
        setData(res.data.content);
         //@ts-ignore
        console.log(res.data.content)
      } catch (err) {
      
        setError("Failed to load shared content ❌");
      } finally {
        setLoading(false);
      }
    };

    if (shareLink) {
      fetchContent();
    }
  }, [shareLink]);

  if (loading) return <Loading text="Fetching shared content..." size={50} />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;
  if (!data) return <Error message="Content not found ❌" />;

  return (
    <div className="mx-auto w-full max-w-7xl p-1">
    <div className="grid grid-cols-1  lg:grid-cols-3 sm::grid-cols-2  gap-2 items-stretch px-2 ">
      {data.map((content)=>(
        <>
        <Card
        key={content._id}
        title={content.title}
        link={content.link}
        brain={content.brain as Brain}
        tags={content.tags}
        username={content.userId?.username || "Unknown"}
        upload={content.createdAt}
        description={content.description}
        image={content.image}
        />
        </>
      ))}
    </div>
      </div>
  );
}
