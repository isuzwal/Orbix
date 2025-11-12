import { Button } from "@/components/ui/button";
import { Card, type Brain } from "@/components/ui/card-custom";
import { CreateContent } from "@/components/ui/create-content";
import { useEffect, useState } from "react";
import { Share2Icon, Plus } from "lucide-react";
import axios from "axios";
import { SharePops } from "@/components/ui/share-button-model";
import Loading from "@/components/ui/loading.view";
import Error from "@/components/ui/error-view";



export interface ContentItem {
    _id: string;
    brain:string,
    title: string;
    link: string;
    tags: string[];
    userId: {
      username: string;
    };
    createdAt: string;
    image:string
    description:string
  }
export default function DashbordPage() {

  const [IsModelOpen, setModeleOpen] = useState(false);
  const [shareModle,setSharemodel]=useState(false);
  const [Isloading, setLoading] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [error,setError]=useState("");
  const token = localStorage.getItem("token");
  // api call for the all content
 useEffect(() => {
  const FetchContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/user/content`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      // @ts-ignore
      setContent(res.data.data);
    } catch (error:any) {
      setError(error.response.message || "Somethin went wrong try again !")
    } finally {
      setLoading(false);
    }
  };

  FetchContent();
}, [token]);
  if(Isloading){
    return <Loading  text="Looking into your brain" size={50} />
  }
  if(error) return <Error  message={error} onRetry={()=>window.location.reload()}/>
  return (
    <div className=" flex  flex-col  w-full  ">
      <div className="w-full flex  justify-end gap-2 px-2  py-1.5 items-center">
        <Button
          onClick={()=>setSharemodel(true)}
          variant={"secondary"}
          title="Share"
          className="flex border-2 cursor-pointer px-3 border-primary hover:bg-primary/20 text-primary/60">
          <Share2Icon size={24} />
          Share
        </Button>
        <Button
          onClick={() => setModeleOpen(true)}
          variant={"default"}
          className="flex cursor-pointer "
          title="Add content">
          <Plus size={24} />
          Add content
        </Button>
      </div>
      <CreateContent open={IsModelOpen} onClose={() => setModeleOpen(false)} />
      <SharePops open={shareModle}  OnOpen={()=>setSharemodel(false)}/>
      <div className="grid grid-cols-1  lg:grid-cols-3 sm::grid-cols-2  gap-2 items-stretch px-2 ">
        {content.length==0 && (
          <p className="text-muted-foreground ">Your brain empty</p>
        )}
         {content.map((item) => (
          <Card
            key={item._id}
            brain={item.brain as Brain }
            title={item.title}
            link={item.link.replace("x.com","twitter.com")}
            tags={item.tags}
            image={item.image}
            username={item.userId.username}
            upload={item.createdAt}
            description={item. description}
          />
        ))}
      </div>
    </div>
  );
}
