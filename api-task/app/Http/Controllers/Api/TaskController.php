<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->get();

        return response()->json([
            'status' => true,
            'data' => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'in:pending,done'
        ]);

        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'status' => $request->status ?? 'pending',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Task created',
            'data' => $task
        ], 201);
    }

    public function show($id)
    {
        $task = Task::where('user_id', Auth::id())->find($id);

        if (!$task) {
            return response()->json([
                'status' => false,
                'message' => 'Task not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $task
        ]);
    }

    public function update(Request $request, $id)
    {
        $task = Task::where('user_id', Auth::id())->find($id);

        if (!$task) {
            return response()->json([
                'status' => false,
                'message' => 'Task not found'
            ], 404);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|in:pending,done'
        ]);

        $task->update($request->only('title', 'status'));

        return response()->json([
            'status' => true,
            'message' => 'Task updated',
            'data' => $task
        ]);
    }

    public function destroy($id)
    {
        $task = Task::where('user_id', Auth::id())->find($id);

        if (!$task) {
            return response()->json([
                'status' => false,
                'message' => 'Task not found'
            ], 404);
        }

        $task->delete();

        return response()->json([
            'status' => true,
            'message' => 'Task deleted'
        ]);
    }
}



// | Method | Endpoint          | Fungsi       | Controller Method       |
// | ------ | ----------------- | ------------ | ----------------------- |
// | GET    | `/api/tasks`      | List task    | `index()`               |
// | POST   | `/api/tasks`      | Buat task    | `store()`               |
// | GET    | `/api/tasks/{id}` | Lihat detail | `show($id)`             |
// | PUT    | `/api/tasks/{id}` | Ubah task    | `update($request, $id)` |
// | DELETE | `/api/tasks/{id}` | Hapus task   | `destroy($id)`          |
