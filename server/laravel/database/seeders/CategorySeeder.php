<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Elektronika', 'description' => 'Gadżety i urządzenia elektroniczne.'],
            ['name' => 'AGD', 'description' => 'Sprzęty i meble do domu.'],
            ['name' => 'Książki', 'description' => 'Różnego rodzaju książki i literatura.'],
            ['name' => 'Odzież', 'description' => 'Ubrania i akcesoria.'],
            ['name' => 'Sport', 'description' => 'Sprzęt sportowy i fitness.'],
        ]);
    }
}
