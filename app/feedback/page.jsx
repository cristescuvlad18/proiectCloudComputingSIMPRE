"use client";

import { useState } from "react";

import { sendFeedback } from "@/utils/feedbackFunctions";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function FeedbackPage() {
  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const success = await sendFeedback(
      formData
    );

    if (success) {
      setStatus(
        "Feedback-ul a fost trimis cu succes!"
      );

      setFormData(initialForm);
    } else {
      setStatus(
        "Feedback-ul nu a fost trimis."
      );
    }

    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">
        Feedback
      </h1>

      <p className="text-gray-500 mb-8">
        Trimteti-ne sugestiile voastre.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Nume"
          value={formData.name}
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
          name="subject"
          placeholder="Subiect"
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

        <textarea
          name="message"
          placeholder="Mesaj"
          rows={6}
          value={formData.message}
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {loading
            ? "Se trimite..."
            : "Trimite Feedback"}
        </button>

        {status && (
          <p className="text-sm">
            {status}
          </p>
        )}
      </form>
    </main>
  );
}