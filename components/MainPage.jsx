"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  getTasks,
  deleteTask,
} from "@/utils/taskFunctions";

export default function MainPage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await getTasks();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteTask(id);

    if (success) {
      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } else {
      alert("Sarcina nu a putut fi stearsa.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-8">
   <div className="flex flex-col items-center text-center mb-10">
  <h1 className="text-5xl font-bold">
    TrackerSprint
  </h1>

  <p className="text-gray-500 mt-3">
    Organizează-ți sarcinile eficient!
  </p>

  <div className="flex gap-3 mt-6">
    <Link
      href="/feedback"
      className="bg-gray-700 text-white px-5 py-3 rounded hover:bg-gray-800 transition-colors"
    >
      Feedback
    </Link>

    <Link
      href="/tasks/create"
      className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition-colors"
    >
      Adaugă Sarcină
    </Link>
  </div>
</div>

      {tasks.length === 0 ? (
<div className="border rounded-xl p-10 text-center">
  <h2 className="text-2xl font-semibold mb-2">
    Nu au fost gasite sarcini.
  </h2>

  <p className="text-gray-500 mb-5">
    Creeaza o sarcina pentru a o gestiona mai eficient.
  </p>

  <Link
    href="/tasks/create"
    className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition-colors"
  >
    Creeaza prima sarcina
  </Link>
</div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {task.subject}
                  </h2>

                  <p className="text-gray-500">
                    {task.topic}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/tasks/edit?id=${task._id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                  >
                    Editeaza
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(task._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Sterge
                  </button>
                </div>
              </div>

              <div className="mt-4 flex gap-3 text-sm flex-wrap">
                <span className="bg-gray-100 px-3 py-1 rounded">
                  Prioritate: {task.priority}
                </span>

                <span className="bg-gray-100 px-3 py-1 rounded">
                  Stadiu: {task.status}
                </span>

                <span className="bg-gray-100 px-3 py-1 rounded">
                  Termen limita: {task.deadline}
                </span>
              </div>

              {task.notes && (
                <p className="mt-4 text-gray-700">
                  {task.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}