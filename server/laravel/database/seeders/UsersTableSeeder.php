<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => 1,
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'role' => 'admin',
            'email_verified_at' => '2021-09-01 00:00:00',
            'password' => Hash::make('123'),
        ]);

        User::create([
            'id' => 2,
            'name' => 'Moderator',
            'email' => 'moderator@gmail.com',
            'role' => 'moderator',
            'email_verified_at' => '2021-09-01 00:00:00',
            'password' => Hash::make('123'),
        ]);

        User::create([
            'id' => 3,
            'name' => 'Jan Kowalski',
            'email' => 'kowalski@gmail.com',
            'role' => 'user',
            'email_verified_at' => '2021-09-01 00:00:00',
            'password' => Hash::make('123'),
        ]);
    }
}
