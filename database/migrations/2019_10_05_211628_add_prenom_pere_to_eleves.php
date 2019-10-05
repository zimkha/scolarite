<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPrenomPereToEleves extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('eleves', function (Blueprint $table) {
            $table->string('prenom_pere')->nullable();
            $table->string('prenom_mere')->nullable();
            $table->string('nom_mere')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('eleves', function (Blueprint $table) {
            $table->dropColumn('prenom_pere');
            $table->dropColumn('prenom_mere');
            $table->dropColumn('nom_mere');
        });
    }
}
