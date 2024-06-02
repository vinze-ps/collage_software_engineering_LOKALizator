<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \Illuminate\Http\JsonResponse;
use \Illuminate\Database\Eloquent\Collection;

class UserController extends Controller
{
    public function index(): Collection
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'string|in:user,admin'
        ]);


        return User::create([
            'name' => $data['name'],
            'password' => Hash::make($data['password']),
            'email' => $data['email'],
            'role' => 'user',
        ]);
    }

    public function show(User $user): User|JsonResponse
    {
        $loggedUser = Auth::user();

        if ($loggedUser->id != $user->id && !$loggedUser->isAdminOrModerator()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $user;
    }

    public function update(Request $request, User $user)
    {
        $loggedUser = Auth::user();

        if ($loggedUser->id != $user->id && $loggedUser->role != 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'name' => 'string|max:255',
            'password' => 'string|min:6',
            'email' => 'string|email|max:255|unique',
            'role' => 'string|in:user,moderator,admin'
        ]);

        if (isset($data['role']) && $loggedUser->role != 'admin') {
            unset($data['role']);
        }

        $user->update($data);
        return $user->refresh();
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
