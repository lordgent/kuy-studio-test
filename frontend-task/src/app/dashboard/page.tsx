"use client";

import TaskActionModal from "@/components/ActionModal";
import EditModal from "@/components/EditModal";
import ProfileHeader from "@/components/ProfileHeader";
import TaskModal from "@/components/TaskModal";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  status: "pending" | "done";
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"pending" | "done">("pending");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const router = useRouter(); 

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTasks(data.data ?? data);
    } catch (err) {
      console.error(err);
      setError("Not Found");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });



      fetchTasks();
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus task.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, status }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menambahkan task.");
      }

      setTitle("");
      setStatus("pending");
      setShowModal(false);
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: updatedTask.title,
            status: updatedTask.status,
          }),
        }
      );

      if (!res.ok) throw new Error("Gagal update task");

      fetchTasks();
    } catch (err) {
      alert("Gagal update task.");
    }
  };

   const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login"); 
      return;
    }

    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mx-auto">
      <ProfileHeader />
        <div className="flex justify-between items-center mb-4">
          <h1 className="lg:text-3xl md:text-md font-bold text-[#424242]">
            Task Dashboard
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#424242] text-white px-4 py-2 rounded"
          >
            Tambah Task
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded">
            {error}
          </div>
        )}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => {
                setSelectedTask(task);
                setShowActionModal(true);
              }}
              className="cursor-pointer flex items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <span className="font-medium text-gray-700">{task.title}</span>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  task.status === "done"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {task.status.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <TaskModal
          title={title}
          status={status}
          setTitle={setTitle}
          setStatus={setStatus}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {showActionModal && selectedTask && (
        <TaskActionModal
          task={selectedTask}
          onClose={() => {
            setShowActionModal(false);
            setSelectedTask(null);
          }}
          onEdit={(task) => {
            setShowActionModal(false);
            setSelectedTask(task);
            setShowEditModal(true);
          }}
          onDelete={handleDeleteTask}
        />
      )}

      {showEditModal && selectedTask && (
        <EditModal
          task={selectedTask}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateTask}
        />
      )}
    </main>
  );
}
