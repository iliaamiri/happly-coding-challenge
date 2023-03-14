<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class QuoteTest extends TestCase
{
    public function test_kanye_quotes_can_be_fetched(): void
    {
        $random = rand(1, 1000);
        // sign up and get token
        $response = $this->post('/api/register', [
            'name' => 'test' . $random,
            'email' => "test{$random}@gmail.com",
            'password' => 'test123',
        ]);

        $response->assertStatus(200);
        $token = $response->json('token');

        // get quote
        $response = $this->get('/api/newQuote', [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'quote',
        ]);
    }
}
