import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { FormField, Loader, Loader2 } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratinImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const genrateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratinImg(true);
        const response = await fetch("http://localhost:8000/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
        console.log("error", error);
      } finally {
        setGeneratinImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };
  return (
    <section className="max-w-71xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] tex-[16px] max-w[500px]">
          Create imaginative and visually stunning image through and share them with the community
          DALL-E AI
        </p>
      </div>
      <form className="mt-16 p-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 ">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-m text-gray-900">Your name</label>
            </div>
            <div className="flex">
              <input
                className="text-gray-900 text-sm rouned-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block  p-3 drop-shadow rounded-md w-full"
                type="text"
                placeholder="John Doe"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-m text-gray-900">Prompt</label>
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
              >
                Surprie Me
              </button>
            </div>
            <div className="flex">
              <input
                className="text-gray-900 text-sm rouned-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block  p-3 drop-shadow rounded-l-md w-full"
                type="text"
                placeholder="A Synthwave Hedgehog, Blade Runner Cyberpunk"
                name="prompt"
                value={form.prompt}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={genrateImage}
                className="text-gray-900 bg-white font-medium rounded-r-md text-sm
               sm:w-auto px-5 py-2.5 text-center border-1 shadow border-black hover:bg-black hover:text-white"
              >
                {generatingImg ? <strong>Generating..</strong> : <strong> Generate </strong>}
              </button>
            </div>
          </div>

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 tex-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5"></div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created image you want, you can share it with others in the community
          </p>
          <button
            type="button"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? "Sharing.." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
