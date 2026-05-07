import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";

import { getTasksCollection } from "@/lib/tasks";

function validateId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const taskId = validateId(id);

    if (!taskId) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const tasks = await getTasksCollection();

    const task = await tasks.findOne({
      _id: taskId,
    });

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...task,
      _id: task._id.toString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const taskId = validateId(id);

    if (!taskId) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    delete body._id;

    const tasks = await getTasksCollection();

    await tasks.updateOne(
      { _id: taskId },
      {
        $set: {
          subject: body.subject,
          topic: body.topic,
          deadline: body.deadline,
          priority: body.priority,
          status: body.status,
          notes: body.notes,
        },
      }
    );

    const updatedTask = await tasks.findOne({
      _id: taskId,
    });

    return NextResponse.json({
      ...updatedTask,
      _id: updatedTask._id.toString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const taskId = validateId(id);

    if (!taskId) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const tasks = await getTasksCollection();

    const result = await tasks.deleteOne({
      _id: taskId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Sarcina nu a fost gasita." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}