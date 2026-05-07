import { NextResponse } from "next/server";
import { getTasksCollection } from "@/lib/tasks";

export async function GET() {
  try {
    const tasks = await getTasksCollection();

    const allTasks = await tasks.find({}).toArray();

    return NextResponse.json(allTasks);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const task = {
      subject: body.subject,
      topic: body.topic,
      deadline: body.deadline,
      priority: body.priority,
      status: body.status,
      notes: body.notes,
      createdAt: new Date(),
    };

    const tasks = await getTasksCollection();

    const result = await tasks.insertOne(task);

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...task,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}