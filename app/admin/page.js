"use client";

import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import ContentForm from "../../components/ContentForm";
import ContentCard from "../../components/ContentCard";

export default function AdminDashboard() {
  const [contents, setContents] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isAdd, setIsAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [role, setRole] = useState("none");
  const [alertMessage, setAlertMessage] = useState("");

  const fetchData = async () => {
    const res = await fetch(`/api/contents?q=${query}&page=${page}`);
    const data = await res.json();
    setContents(data.contents);
  };

  useEffect(() => {
    fetchData();

    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin-token="));
    const token = match?.split("=")[1];

    if (token === "Jaishreeram@bm") setRole("full");
    else if (token === "jai shreekrishna @123") setRole("readonly");
    else setRole("none");
  }, [page]);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    if (role !== "full") {
      showAlert("❌ You don't have permission to delete.");
      return;
    }
    await fetch(`/api/contents/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleEdit = (data) => {
    if (role !== "full") {
      showAlert("⚠️ You don't have permission to edit.");
      return;
    }
    setEditData(data);
    setIsAdd(true);
  };

  const handleLogout = () => {
    document.cookie = "admin-token=; Max-Age=0; path=/";
    window.location.href = "/admin-login";
  };

  return (
    <div className="p-4 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎬 Admin Dashboard Starx-Server</h1>
        {role !== "none" && (
          <Button variant="destructive" onClick={handleLogout}>
            🚪 Logout
          </Button>
        )}
      </div>

      {alertMessage && (
        <div className="fixed top-4 right-4 bg-red-100 text-red-800 px-4 py-2 rounded shadow-lg z-50">
          {alertMessage}
        </div>
      )}

      {role === "none" && (
        <div className="text-red-500 mb-4">Unauthorized — please login first.</div>
      )}

      {role !== "none" && (
        <>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={fetchData}>Search</Button>
            <Button onClick={() => { setEditData(null); setIsAdd(true); }}>ADD</Button>
          </div>

          {isAdd && (
            <ContentForm
              initialData={editData}
              onDone={() => {
                setIsAdd(false);
                fetchData();
              }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contents.map((content) => (
              <ContentCard
                key={content._id}
                data={content}
                onDelete={() => handleDelete(content._id)}
                onEdit={() => handleEdit(content)}
              />
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={() => setPage((p) => Math.max(p - 1, 1))}>⬅️ Prev</Button>
            <span>Page {page}</span>
            <Button onClick={() => setPage((p) => p + 1)}>Next ➡️</Button>
          </div>
        </>
      )}
    </div>
  );
}
