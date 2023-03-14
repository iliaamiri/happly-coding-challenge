<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class QuoteController extends Controller
{
    public function index(): JsonResponse
    {
        $response = Http::get('https://api.kanye.rest');
        $quote = $response->json();
        return response()->json($quote);
    }
}
