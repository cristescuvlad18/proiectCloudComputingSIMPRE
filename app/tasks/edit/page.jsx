"use client";

import { Suspense, useEffect, useState } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import TaskForm from "@/components/TaskForm";

import {
  getTaskById,
  updateTask,
} from "@/utils/taskFunctions";

import { taskDefaultValues } from "@/utils/constants";

function EditContent() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [task, setTask] = useState(
    taskDefaultValues
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const id = searchParams.get("id");

      if (!id) {
        router.push("/");

        return;
      }

      const data = await getTaskById(id);

      if (data) {
        setTask(data);
      }

      setLoading(false);
    };

    fetchTask();
  }, [searchParams, router]);

  const onSubmit = async (data) => {
    const response = await updateTask(data);

    if (response) {
      router.push("/");
    } else {
      alert("Sarcina nu a putut fi modificata");
    }
  };

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Editeaza Sarcina
      </h1>

      <TaskForm
        data={task}
        onSubmit={onSubmit}
      />
    </main>
  );
}

export default function EditTaskPage() {
  return (
    <Suspense fallback={<p>Se incarca...</p>}>
      <EditContent />
    </Suspense>
  );
}