"use client";
 
import { useState } from "react";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };
  const agentResult = async() => {
      try{
        const session = await fetchAuthSession(); 
        const token = session.tokens?.idToken?.toString();
         const res = await fetch(
           "http://localhost:8080/status", 
           {
              method: "GET", 
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
           }
         )
         const data = await res.json();
          console.log("Agent Result:", data);
      }
      catch(err){
        console.log("Error fetching agent result:", err);
      }
  }
  const uploadVideo = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      const session = await fetchAuthSession();
      console.log("FULL SESSION:", session);
      const token = session.tokens?.idToken?.toString();
      console.log("ID TOKEN RAW:", session.tokens?.idToken);
      const res = await fetch(
        "http://127.0.0.1:8000/api/get-upload-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            file_name: file.name,
            content_type: file.type,
          }),
        }
      );

      const { upload_url, file_key } = await res.json();
      await fetch(upload_url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      alert("Uploaded successfully! File key: " + file_key);
    } catch (err) {
      alert("Error: " + err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-semibold mb-6">Upload your video</h2>

        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-full max-w-xl">
          <input
            type="file"
            className="bg-transparent text-white flex-1 outline-none"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            onClick={uploadVideo}
            className="px-4 bg-purple-600 rounded hover:bg-purple-700"
          >
            Upload
          </button>
          <button
            onClick={agentResult}
            className="px-4 bg-purple-600 rounded hover:bg-purple-700"
          >
            Get instant Result
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 text-xs bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Sign Out
        </button>
      </main>
    </div>
  );
}
