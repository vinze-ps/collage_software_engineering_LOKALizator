<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function index(): JsonResponse
    {
        $userId = Auth::id();
        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->get();
        return response()->json($messages);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'advertisement_id' => 'required|exists:advertisements,id',
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        $data['sender_id'] = Auth::id();
        $message = Message::create($data);

        return response()->json($message, 201);
    }

    public function show(Message $message): JsonResponse
    {
        $loggedUser = Auth::user();

        if ($loggedUser->id !== $message->sender_id && $loggedUser->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($message);
    }

    public function update(Request $request, Message $message): JsonResponse
    {
        $loggedUser = Auth::user();

        if ($loggedUser->id !== $message->sender_id && $loggedUser->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'content' => 'sometimes|string',
        ]);

        $message->update($data);
        return response()->json($message);
    }

    public function destroy(Message $message): JsonResponse
    {
        $loggedUser = Auth::user();

        if ($loggedUser->id !== $message->sender_id && $loggedUser->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $message->delete();
        return response()->json(['message' => 'Message deleted successfully']);
    }
}
