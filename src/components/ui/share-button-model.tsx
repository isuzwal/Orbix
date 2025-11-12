import { X } from "lucide-react";
import { Button } from "./button";
import { Share2Icon,Brain } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";


interface Sharemodel {
  open: boolean;
  OnOpen: () => void;
}
export function SharePops({ open, OnOpen }: Sharemodel) {
    const token=localStorage.getItem("token");
   const  ShreLink=async(value:boolean)=>{
    try{
        const res =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/user/share`,
             {share:value},{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        // @ts-ignore
        const url=`${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/user/share-content/${res.data.hash}`;
         // @ts-ignore
        const copyUrl=`${import.meta.env.VITE_SHARE_URL}/share-content/${res.data.hash}`
        await navigator.clipboard.writeText(copyUrl);
        toast.success("Link copied to clipboard!")
        return url;
    }catch(error:any){
        if(error){
            const errorMsg=error.response?.data?.message || "Something went wrong";
            toast.error(errorMsg);
        }
    }

}
  if (!open) return null;
  return (
    <div className=" fixed bg-black/60 inset-0 z-20 flex items-center justify-center">
      <div className="bg-white relative shadow-xl items-center  flex  p-3 max-w-md h-40 w-full rounded-xl">
        <button
          className="absolute cursor-pointer top-2 right-2 rounded-full bg-primary/80 text-white"
          onClick={OnOpen}>
          <X />
        </button>
        <div className="flex flex-col items-center gap-1  text-center space-y-2">
          <h1 className="flex items-center gap-1 text-start text-xl font-semibold"> <Brain  className="text-primary"/>Share your brain </h1>
          <p className="text-gray-700 text-sm">
            By sharing this link, you’ll give others access to explore your
            <span className="font-semibold"> Second Brain </span> content.
          </p>
          <Button onClick={()=>ShreLink(true)} className="cursor-pointer flex items-center gap-2">
            <Share2Icon />
            Share Link
          </Button>
        </div>
      </div>
    </div>
  );
}
