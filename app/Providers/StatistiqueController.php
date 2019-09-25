<?php
namespace  App\Http\Controllers;

class StatistiqueController extends Controller
{
    public function journal()
    {
        $date_now = date('Y-m-d 00:00:00');
        $date_suivant =  date('y-m-d', strtotime($date_now . '1 days'));
    }
    public function JournalMesuel()
    {

    }
}
