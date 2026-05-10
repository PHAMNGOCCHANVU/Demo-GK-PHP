<?php

namespace Tests\Feature\Api;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_filters_products_by_search_and_category(): void
    {
        $phones = Category::factory()->create(['name' => 'Dien thoai']);
        $laptops = Category::factory()->create(['name' => 'Laptop']);

        Product::factory()->create([
            'name' => 'iPhone 15',
            'category_id' => $phones->id,
        ]);

        Product::factory()->create([
            'name' => 'MacBook Air',
            'category_id' => $laptops->id,
        ]);

        $response = $this->getJson("/api/products?search=iPhone&category_id={$phones->id}");

        $response
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.name', 'iPhone 15')
            ->assertJsonPath('0.category.id', $phones->id);
    }

    public function test_it_creates_a_product(): void
    {
        $category = Category::factory()->create();

        $response = $this->postJson('/api/products', [
            'name' => 'Galaxy S24',
            'price' => 21990000,
            'category_id' => $category->id,
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('name', 'Galaxy S24')
            ->assertJsonPath('category.id', $category->id);

        $this->assertDatabaseHas('products', [
            'name' => 'Galaxy S24',
            'category_id' => $category->id,
        ]);
    }

    public function test_it_prevents_deleting_a_category_with_products(): void
    {
        $category = Category::factory()->create();
        Product::factory()->create(['category_id' => $category->id]);

        $response = $this->deleteJson("/api/categories/{$category->id}");

        $response
            ->assertStatus(422)
            ->assertJsonPath('message', 'Cannot delete category because it still has products.');
    }
}