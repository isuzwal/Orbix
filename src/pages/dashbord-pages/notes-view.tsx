import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, PinIcon } from "lucide-react";
import { useState } from "react";


type Colors = "red" |  "green" | "purple" | "pink" | "yellow";
interface NotesProps {
  id: string;
  title: string;
  content: string;
  date: string;
  color: Colors;
}
export default function Notesview() {
  const [notes, setNotes] = useState<NotesProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectColor, setSelectColor] = useState<Colors>("green");
  const [open, setOpen] = useState<boolean>(false);
  const [noteOpen,setNoteOpen]=useState<boolean >(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);


  const expandModel = () => {
    setOpen((prev) => !prev);
  };
  // add the notes
  const handleAddcontent = () => {
    if (!title.trim() || !content.trim()) return;
    const newnotes: NotesProps = {
      id: Math.random().toString(36).slice(2),
      title,
      content,
      date: new Date().toISOString().slice(0, 10),
      color: selectColor,
    };
    setNotes((prev) => [...prev, newnotes]);
    setTitle("");
    setContent("");
    expandModel();
  };

  // delete the notes
  const handleDelete = (id: string) => {
    const note = notes.filter((n) => n.id !== id);
    setNotes(note);
  };

// edit and save

 const handleEditandSave=(note_id:string)=>{
     setNotes((Prev_note)=>
          Prev_note.map((note)=>
          note.id===note_id ? {...note , title,content,color:selectColor}:note)
    )
    setTitle("")
    setContent("")
    setNoteOpen(false)
 }
  // open the notes by note_id 
 const openModel=(note_id:string)=>{
     const  currentNotes=notes.find((note)=>note.id===note_id)
     if(currentNotes){
       setTitle(currentNotes.title)
       setContent(currentNotes.content)
       setSelectColor(currentNotes.color)
       setSelectedNoteId(currentNotes.id)
       setNoteOpen(true);
     }
 }
  return (
    <div className="min-h-screen  relative p-2 ">
      { open && (
        <div className="h-screen absolute  right-0 flex justify-center items-center   z-30 w-full ">
          <Model
            setOpen={expandModel}
            handleAdd={handleAddcontent}
            title={title}
            content={content}
            setContent={setContent}
            setTitle={setTitle}
            selectColor={selectColor}
            setSelectColor={setSelectColor}
 
          /> 
        </div>
      )}
      {noteOpen &&  selectedNoteId && (
        <div className="h-screen absolute right-0 flex justify-center items-center z-30 w-full">
          <EditNoteModel
            id={selectedNoteId}
            title={title}
            content={content}
            selectColor={selectColor}
            setTitle={setTitle}
            setContent={setContent}
            setSelectColor={setSelectColor}
            handleSave={handleEditandSave}
            handleDelete={handleDelete}
            onClose={() => setNoteOpen(false)}
          />
        </div>
      )}
      <Button
        onClick={expandModel}
        className="bg-primary  cursor-pointer absolute right-4 top-1 rounded-[10px] ">
        Add Notes
      </Button>
      <div className="grid  mt-10 gap-1  sm:grid-cols-3 lg:grid-cols-4 ">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`flex flex-col gap-1 max-w-72 mx-auto w-full h-auto rounded-xl border  ${
              note.color === "green"
                ? "bg-green-300/90 border-green-300/70"
                : note.color === "red"
                ? "bg-red-300/90 border-red-300/70"
                : note.color === "purple"
                ? "bg-purple-300/90 border-purple-300/70"
                : note.color === "pink"
                ? "bg-pink-300/90 border-pink-300/70"
                : note.color === "yellow"
                ? "bg-yellow-300/90 border-yellow-300/70 "
                : "bg-neutral-200 border-neutral-200"
            } bg-green-300/90 border-green-300/70 px-2 py-1.5`}>
            <div className="flex justify-between p-0.5">
              <h1 className="flex items-center gap-1">
                <Calendar className="text-neutral-600 size-5" />
                <span className="text-[12px] font-semibold mt-1">{note.date}</span>
              </h1>
              <button onClick={()=>openModel(note.id)} className="cursor-pointer">
                <PinIcon className="rotate-45 size-5 text-neutral-950" />
              </button>
            </div>
            <div className="p-1.5 flex flex-col gap-1">
              <h2 className="font-bold text-neutral-900 text-[14px]">{note.title}</h2>
              <p className="text-[10px] text-neutral-700 font-semibold leading-normal">
                {note.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ModelProps {
  title: string;
  setTitle: (text: string) => void;
  content: string;
  setContent: (text: string) => void;
  selectColor: Colors;
  setSelectColor: (color: Colors) => void;
  setOpen: () => void;
  handleAdd: () => void;
}
const Model = ({
  setOpen,
  handleAdd,
  title,
  content,
  setTitle,
  setContent,
  selectColor,
  setSelectColor,
}: ModelProps) => {
  const isVaildColor = (value: string): value is Colors => {
    return ["red", "green", "purple", "pink", "yellow"].includes(value);
  };
  return (
    <div className=" flex flex-col gap-1 justify-between  rounded-xl border z-20 bg-neutral-100 border-neutral-50 max-w-xl px-2 py-8 mx-auto w-full">
      <h1 className="font-semibold text-[24px]  w-full flex justify-start  px-3">Add the Notes </h1>
      <div className="w-full p-2 flex flex-col gap-4">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-neutral-700 font-medium text-[12px] placeholder:text-[12px] placeholder:font-medium"
          placeholder="Tips to get GF"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="100X way to get GF"
          className="placeholder:text-neutral-500 text-[12px]  "
        />
        <div className="px-4  w-full flex items-center  justify-between border bg-zinc-100 border-zinc-100 rounded-lg py-2">
          <span className="text-[14px]">Set Background color</span>
          <select
            value={selectColor}
            onChange={(e) => {
              const value = e.target.value;
              if (isVaildColor(value)) {
                setSelectColor(value);
              } else {
                return;
              }
            }}
            className="w-full max-w-xs border border-neutral-300 bg-slate-100/90 text-neutral-800 text-sm font-medium
             px-4 py-2 rounded-lg  cursor-pointer transition-all">
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="pink">Pink</option>
            <option value="purple">Purple</option>
         
          </select>
        </div>
      </div>
      <div className="w-full flex gap-2 items-center p-2">
        <button
          onClick={handleAdd}
          className="bg-primary text-secondary w-1/2  rounded-lg px-5 py-1.5  justify-center cursor-pointer">
          Save
        </button>
        <button
          onClick={setOpen}
          className="  flex  w-1/2 rounded-lg px-5 py-1.5  justify-center border-primary border bg-secondary text-neutral-900  cursor-pointer">
          Colse
        </button>
      </div>
    </div>
  );
};



interface EditNoteProps {
  id: string;
  title: string;
  content: string;
  selectColor: Colors;
  setTitle: (text: string) => void;
  setContent: (text: string) => void;
  setSelectColor: (color: Colors) => void;
  handleSave: (id:string) => void;
  handleDelete:(id:string)=>void;
  onClose: () => void;
}

const EditNoteModel = ({
  id,
  title,
  content,
  selectColor,
  setTitle,
  setContent,
  setSelectColor,
  handleSave,
 
  handleDelete
}: EditNoteProps) => {
  const isVaildColor = (value: string): value is Colors =>
    ["red", "green", "purple", "pink", "yellow"].includes(value);

  return (
    <div className="flex flex-col gap-1 justify-between rounded-xl border z-20 bg-neutral-100 border-neutral-50 max-w-xl px-2 py-8 mx-auto w-full">
      <h1 className="font-semibold text-[24px] w-full flex justify-start px-3">
        Edit your note
      </h1>
      <div className="w-full p-2 flex flex-col gap-4">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="px-4 w-full flex items-center justify-between border bg-zinc-100 border-zinc-100 rounded-lg py-2">
          <span className="text-[14px]">Change Background color</span>
          <select
            value={selectColor}
            onChange={(e) => {
              const value = e.target.value;
              if (isVaildColor(value)) setSelectColor(value);
            }}
            className="w-full max-w-xs border border-neutral-300 bg-slate-100/90 text-neutral-800 text-sm font-medium
             px-4 py-2 rounded-lg cursor-pointer transition-all"
          >
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="pink">Pink</option>
            <option value="purple">Purple</option>
          </select>
        </div>
      </div>
      <div className="w-full flex gap-2 items-center p-2">
        <button
          onClick={()=>handleSave(id)}
          className="bg-primary text-secondary  w-1/2 rounded-lg px-5 py-1.5 cursor-pointer"
        >
          Save changes
        </button>
          <button
          onClick={()=>handleDelete(id)}
          className="bg-red-400 text-secondary w-1/2 rounded-lg px-5 py-1.5 cursor-pointer"
        >
        Delete Note
        </button>
        
      </div>
    </div>
  );
};