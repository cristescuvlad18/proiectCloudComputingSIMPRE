"use client";

import { useRouter } from "next/navigation";

import TaskForm from "@/components/TaskForm";

import { createTask } from "@/utils/taskFunctions";

import { taskDefaultValues } from "@/utils/constants";

export default function CreateTaskPage() {
  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await createTask(data);

    if (response) {
      router.push("/");
    } else {
      alert("Sarcina nu a fost creata.");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Adauga sarcina
      </h1>

      <TaskForm
        data={taskDefaultValues}
        onSubmit={onSubmit}
      />
    </main>
  );
}