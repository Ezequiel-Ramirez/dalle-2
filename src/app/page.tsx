"use client";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-zinc-950 rounded-lg p-5">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        try {
                            const res = await fetch("/api/generate", {
                                method: "POST",
                                body: JSON.stringify({ prompt }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                            const data = await res.json();
                            setImage(data.url);
                            setLoading(false);
                            setPrompt("");
                        } catch (error) {
                            console.log(error);
                            setLoading(false);
                        }
                    }}
                >
                    <input
                        type="text"
                        placeholder="Write your prompt"
                        onChange={(e) => {
                            setPrompt(e.target.value);
                        }}
                        value={prompt}
                        className="bg-zinc-950 text-white px-3 py-2 my-2"
                    />
                    <button
                        disabled={loading}
                        className="bg-sky-950 text-white px-3 py-2 my-2 disabled:opacity-50 disabled: cursor-not-allowed"
                    >
                        {loading ? "Loading" : "Generate"}
                    </button>
                </form>
                {image && <Image src={image} alt={prompt} />}
            </div>
        </div>
    );
};

export default Page;
