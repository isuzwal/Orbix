import { X, LoaderIcon, Upload } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Field, FieldLabel, FieldGroup, FieldSet } from "./field";
import { Textarea } from "./textarea";

interface OpenmodelPropps {
  open: boolean;
  onClose: () => void;
}

export function CreateContent({ open, onClose }: OpenmodelPropps) {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [brain, setBrain] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // daragover
  const handleDragging = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // api call
  const handleFrom = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/user/add-content`,
        { title: title, link: link, tags: tags, brain: brain ,description:description ,image:image},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        toast.success("Content add successfully");
      }
    } catch (error: any) {
      const msgError = error.response?.error || "Failed to add content !";
      toast.error(msgError);
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3  rounded-full w-7 flex items-center  justify-center h-7 text-[12px] font-medium bg-secondary text-blue-400 border border-secondary">
          <X className="size-4" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Content</h2>

        <form onSubmit={handleFrom} className="flex flex-col gap-2 ">
          <FieldGroup>
            <FieldSet>
              <div className="flex items-center justify-between gap-1">
                <Field>
                  <FieldLabel htmlFor="checkout">Title your brain</FieldLabel>
                  <Input
                    id="checkout"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Vibe coding"
                    className="placeholder:text-[12px]"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="">Past your link</FieldLabel>
                  <Input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Past your link "
                    className="placeholder:text-[12px]"
                  />
                </Field>
              </div>
              <div className="flex items-center justify-between gap-1">
                <Field>
                  <FieldLabel htmlFor="">What barin is it ?</FieldLabel>
                  <Input
                    value={brain}
                    onChange={(e) => setBrain(e.target.value)}
                    placeholder="Youtube,Github and other "
                    className="placeholder:text-[12px]"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="">Tags </FieldLabel>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="#vibe,#grind,#fun"
                    className="placeholder:text-[12px]"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="">Describe your brain notes </FieldLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example (Vibing  the flow of the music ) "
                  className="placeholder:text-[12px] rounded-lg"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="">Image </FieldLabel>
                {image && (
                  <div className="h-32 w-32 flex justify-center rounded-xl  relative ">
                    <img
                      alt="not found"
                      src={URL.createObjectURL(image)}
                      className="w-1/2  rounded-xl"
                    />
                    <button
                      className="  absolute right-5 -top-1 rounded-full w-5 flex items-center  justify-center h-5 text-[12px] font-medium bg-secondary text-neutral-100 border cursor-pointer border-secondary"
                      onClick={() => setImage(null)}>
                       <X  className="text-blue-400 size-3"/>
                    </button>
                  </div>
                )}
                <label
                  onDrop={handleDragging}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`flex cursor-pointer justify-center items-center border-2 max-w-[26rem] mx-auto w-full rounded-xl border-dashed py-10 transition-colors ${
                    isDragging ? "bg-blue-50 border-blue-400" : "bg-neutral-100 border-neutral-200"
                  }`}>
                  <p className="flex gap-1 text-[14px] items-center">
                    <Upload className="text-neutral-500 " />
                    <span className="mt-2  font-medium">
                      {" "}
                      {isDragging ? "Drop image here" : "Upload or drag image here"}
                    </span>
                  </p>
                  <input
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                      }
                    }}
                    className=" hidden w-full "
                  />
                </label>
              </Field>
            </FieldSet>
          </FieldGroup>
          <button
            disabled={loading}
            type="submit"
            className="mt-2 w-full cursor-pointer  rounded-lg bg-primary text-white py-2 font-medium hover:bg-primary/40 transition">
            {loading ? (
              <span className="flex w-full justify-center gap-2 items-center">
                Saving your content <LoaderIcon size={24} className="ml-2 animate-spin" />
              </span>
            ) : (
              "Save Content"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
