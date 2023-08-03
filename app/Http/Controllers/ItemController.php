<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Item::where('user_id', Auth::id())->orderBy('created_at', 'ASC')->get();
    }

    public function getUsers()
    {
        return User::all()->except(Auth::id());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required'
        ]);

        if($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors()
            ];
            return response()->json($response, 400);
        }

        $newItem = new Item;
        $newItem->name = $request->title;
        $newItem->user_id = Auth::id();
        $newItem->save();

        $response = [
            'success' => true,
            'data' => $newItem,
            'message' => 'Task added successfully'
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $existingItem = Item::where('user_id', Auth::id())->find($id);

        if($existingItem) {
            $existingItem->completed = $request->completed ? true : false;
            $existingItem->completed_at = $request->completed ? Carbon::now() : null;
            $existingItem->name = $request->name != '' ? $request->name : $existingItem->name;
            $existingItem->user_id = $request->user_id != 0 ? $request->user_id : $existingItem->user_id;
            $existingItem->save();

            $response = [
                'success' => true,
                'data' => $existingItem,
                'message' => 'Task updated successfully'
            ];
    
            return response()->json($response, 200);
        }

        return "No item found";
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $existingItem = Item::where('user_id', Auth::id())->find($id);

        if($existingItem) {
            $existingItem->delete();
            $response = [
                'success' => true,
                'data' => $existingItem,
                'message' => 'Task deleted successfully'
            ];
    
            return response()->json($response, 200);
        }

        return "No item found";
    }
}
