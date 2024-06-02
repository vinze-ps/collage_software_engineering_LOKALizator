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
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'is_anonymous' => 'boolean',
        ]);

        $data['user_id'] = Auth::id();
        return Advertisement::create($data);
    }

    public function show(Advertisement $advertisement)
    {
        return $advertisement;
    }

    public function update(Request $request, Advertisement $advertisement)
    {
        $this->authorize('update', $advertisement);

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
        $this->authorize('delete', $advertisement);

        $advertisement->delete();
        return response()->json(['message' => 'Advertisement deleted successfully']);
    }
}
