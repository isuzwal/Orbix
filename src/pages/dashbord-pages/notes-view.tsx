import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, PinIcon } from "lucide-react";
import { useState } from "react";

type Colors = "red" | "green" | "purple" | "pink" | "yellow";

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
  const [noteOpen, setNoteOpen] = useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const expandModel = () => setOpen((prev) => !prev);

  const handleAddcontent = () => {
    if (!title.trim() || !content.trim()) return;
    const newNote: NotesProps = {
      id: Math.random().toString(36).slice(2),
      title,
      content,
      date: new Date().toISOString().slice(0, 10),
      color: selectColor,
    };
    setNotes((prev) => [...prev, newNote]);
    setTitle("");
    setContent("");
    expandModel();
  };


  const handleDelete = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    setNoteOpen(false);
  };

  // Edit and save note
  const handleEditandSave = (note_id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === note_id ? { ...note, title, content, color: selectColor } : note
      )
    );
    setTitle("");
    setContent("");
    setNoteOpen(false);
  };

  // Open a note for editing
  const openModel = (note_id: string) => {
    const current = notes.find((n) => n.id === note_id);
    if (current) {
      setTitle(current.title);
      setContent(current.content);
      setSelectColor(current.color);
      setSelectedNoteId(current.id);
      setNoteOpen(true);
    }
  };

  return (
    <div className="min-h-screen relative p-4 bg-neutral-50">
      {/* Add Notes Modal */}
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-30">
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

      {/* Edit Notes Modal */}
      {noteOpen && selectedNoteId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-30">
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

      {/* Add Notes Button */}
      <div className="flex justify-end mb-6">
        <Button onClick={expandModel} className="bg-primary rounded-[10px]">
          Add Notes
        </Button>
      </div>

      {/* Empty State Message */}
      {!open && notes.length === 0 && (
        <div className="rounded-xl p-2 bg-neutral-300 border border-neutral-100 max-w-xl">
          <div className="px-3 py-2 rounded-[6px] h-56 flex justify-center items-center">
            <p className="text-neutral-700 text-[16px] font-semibold text-center">
              Keep your notes here — save time, stay organized, and get more done.
            </p>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {notes.length > 0 && (
        <div className="grid mt-4 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start justify-start">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`flex flex-col gap-1 w-full max-w-72 rounded-xl border 
              ${
                note.color === "green"
                  ? "bg-green-300/90 border-green-300/70"
                  : note.color === "red"
                  ? "bg-red-300/90 border-red-300/70"
                  : note.color === "purple"
                  ? "bg-purple-300/90 border-purple-300/70"
                  : note.color === "pink"
                  ? "bg-pink-300/90 border-pink-300/70"
                  : note.color === "yellow"
                  ? "bg-yellow-300/90 border-yellow-300/70"
                  : "bg-neutral-200 border-neutral-200"
              } px-3 py-2 shadow-sm`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Calendar className="text-neutral-700 size-4" />
                  <span className="text-[12px] font-semibold text-neutral-800">
                    {note.date}
                  </span>
                </div>
                <button onClick={() => openModel(note.id)} className="cursor-pointer">
                  <PinIcon className="rotate-45 size-5 text-neutral-950" />
                </button>
              </div>

              <div className="p-1.5 flex flex-col gap-1">
                <h2 className="font-bold text-neutral-900 text-[14px]">{note.title}</h2>
                <p className="text-[11px] text-neutral-700 font-medium leading-normal">
                  {note.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -----------------------------
// Add Note Model
// -----------------------------
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
  const isVaildColor = (value: string): value is Colors =>
    ["red", "green", "purple", "pink", "yellow"].includes(value);

  return (
    <div className="flex flex-col gap-3 justify-between rounded-xl border bg-neutral-100 border-neutral-200 max-w-xl px-4 py-8 w-full">
      <h1 className="font-semibold text-[22px] text-neutral-900">Add a New Note</h1>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="text-neutral-700 text-[14px]"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        className="text-[14px]"
      />
      <div className="flex items-center justify-between border bg-zinc-100 border-zinc-200 rounded-lg py-2 px-3">
        <span className="text-[14px] font-semibold text-neutral-700">
          Background color
        </span>
        <select
          value={selectColor}
          onChange={(e) => {
            const value = e.target.value;
            if (isVaildColor(value)) setSelectColor(value);
          }}
          className="w-32 border border-neutral-300 bg-slate-100 text-neutral-700 text-sm rounded-lg py-1 px-2"
        >
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
        </select>
      </div>

      <div className="flex gap-3 mt-3">
        <Button onClick={handleAdd} className="w-1/2 bg-primary text-white">
          Save
        </Button>
        <Button
          onClick={setOpen}
          variant="outline"
          className="w-1/2 border border-primary text-primary"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

// -----------------------------
// Edit Note Model
// -----------------------------
interface EditNoteProps {
  id: string;
  title: string;
  content: string;
  selectColor: Colors;
  setTitle: (text: string) => void;
  setContent: (text: string) => void;
  setSelectColor: (color: Colors) => void;
  handleSave: (id: string) => void;
  handleDelete: (id: string) => void;
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
  handleDelete,
}: EditNoteProps) => {
  const isVaildColor = (value: string): value is Colors =>
    ["red", "green", "purple", "pink", "yellow"].includes(value);

  return (
    <div className="flex flex-col gap-3 justify-between rounded-xl border bg-neutral-100 border-neutral-200 max-w-xl px-4 py-8 w-full">
      <h1 className="font-semibold text-[22px] text-neutral-900">Edit Note</h1>
      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="flex items-center justify-between border bg-zinc-100 border-zinc-200 rounded-lg py-2 px-3">
        <span className="text-[14px] font-semibold text-neutral-700">
          Change background color
        </span>
        <select
          value={selectColor}
          onChange={(e) => {
            const value = e.target.value;
            if (isVaildColor(value)) setSelectColor(value);
          }}
          className="w-32 border border-neutral-300 bg-slate-100 text-neutral-700 text-sm rounded-lg py-1 px-2"
        >
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
        </select>
      </div>

      <div className="flex gap-3 mt-3">
        <Button onClick={() => handleSave(id)} className="w-1/2 bg-primary text-white">
          Save Changes
        </Button>
        <Button
          onClick={() => handleDelete(id)}
          className="w-1/2 bg-red-400 text-white"
        >
          Delete Note
        </Button>
      </div>
    </div>
  );
};
