<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecouvrementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recouvrements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('montant');
            $table->unsignedInteger('inscription_id')->nullable();
            $table->unsignedInteger('paiement_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recouvrements');
    }
}
