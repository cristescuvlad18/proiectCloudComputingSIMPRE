"use client";

import { useEffect, useState } from "react";

const TaskForm = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        name="subject"
        placeholder="Titlu"
        value={formData.subject}
        onChange={handleChange}
        className="border p-3 rounded"
        required
        onInvalid={(e) =>
  e.target.setCustomValidity(
    "Acest camp este obligatoriu."
  )
}

onInput={(e) =>
  e.target.setCustomValidity("")
}
      />

      <input
        type="text"
        name="topic"
        placeholder="Subiect"
        value={formData.topic}
        onChange={handleChange}
        className="border p-3 rounded"
        required
         onInvalid={(e) =>
  e.target.setCustomValidity(
    "Acest camp este obligatoriu."
  )
}

onInput={(e) =>
  e.target.setCustomValidity("")
}
      />

      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className="border p-3 rounded"
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="border p-3 rounded"
      >
        <option>Scazuta</option>
        <option>Medie</option>
        <option>Ridicata</option>
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-3 rounded"
      >
        <option>Neinceput</option>
        <option>In lucru</option>
        <option>Completat</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notite"
        value={formData.notes}
        onChange={handleChange}
        className="border p-3 rounded"
        rows={4}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
      >
        {formData._id
          ? "Salveaza modificarile"
          : "Creeaza sarcina"}
      </button>
    </form>
  );
};

export default TaskForm;