export async function getTasks() {
  const response = await fetch("/api/tasks");

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export async function createTask(data) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  return response.ok;
}

export async function getTaskById(id) {
  const response = await fetch(`/api/tasks/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function updateTask(data) {
  const { _id, ...body } = data;

  const response = await fetch(`/api/tasks/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}