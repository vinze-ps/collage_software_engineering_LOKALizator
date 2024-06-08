<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdvertisementController extends Controller
{
    public function index()
    {
        return Advertisement::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'numeric',
            'category_id' => 'required|exists:categories,id',
        ]);

        if (Auth::check()) {
            $data['user_id'] = Auth::id();
        } else {
            $data['user_id'] = null;
        }
        return Advertisement::create($data);
    }

    public function show(Advertisement $advertisement)
    {
        return $advertisement;
    }

    public function update(Request $request, Advertisement $advertisement)
    {
        $loggedUser = Auth::user();
        if ($loggedUser->id != $advertisement->user()->id && !$loggedUser->isAdminOrModerator()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'category_id' => 'sometimes|exists:categories,id',
            'is_anonymous' => 'boolean',
        ]);

        $advertisement->update($data);
        return $advertisement->refresh();
    }

    public function destroy(Advertisement $advertisement)
    {
        $loggedUser = Auth::user();
        if ($loggedUser->id != $advertisement->user_id && !$loggedUser->isAdminOrModerator()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $advertisement->delete();
        return response()->json(['message' => 'Advertisement deleted successfully']);
    }

}
