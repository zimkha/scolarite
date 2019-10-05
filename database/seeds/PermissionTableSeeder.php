<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            array("name" => "liste-role", "display_name" => "Voir la liste des roles"),
            array("name" => "creation-role", "display_name" => "Créer un role"),
            array("name" => "modification-role", "display_name" => "modofication d'un role"),
            array("name" => "suppression-role", "display_name" => "supprimer un role"),

            array("name" => "liste-eleve", "display_name" => "liste des eleve"),
            array("name" => "creation-eleve", "display_name" => "Créer un eleve"),
            array("name" => "modification-eleve", "display_name" => "modification d'un eleve"),
            array("name" => "suppression-eleve", "display_name" => "surppirmer un eleve"),

            array("name" => "dashboard-vue", "display_name" => "dashboard"),
            array("name" => "dashboard-voir", "display_name" => "Créer un eleve"),
            array("name" => "dashboard-menu", "display_name" => "menu du dashboard"),
            array("name" => "dashboard-eleve", "display_name" => "dashboard  eleve"),



            array("name" => "liste-inscription" , "display_name" => "Voir la liste des inscription"),
            array("name" => "creation-inscription" , "display_name" => "Créer une  inscription"),
            array("name" => "modification-inscription" , "display_name" => "Modifier une inscription"),
            array("name" => "suppression-inscription" , "display_name" => "Supprimer une  inscription"),

            array("name" => "liste-evaluation" , "display_name" => "Voir la liste des evaluation"),
            array("name" => "creation-evaluation" , "display_name" => "Ajouter un nouveau evaluation"),
            array("name" => "modification-evaluation" , "display_name" => "Mettre à jour les infos d'un evaluation"),
            array("name" => "suppression-evaluation" , "display_name" => "Supprimer un evaluation"),
            array("name" => "detail-evaluation" , "display_name" => "Voir les détails d'un evaluation"),


            array("name" => "liste-classe" , "display_name" => "Voir la liste des classes"),
            array("name" => "creation-classe" , "display_name" => "Ajouter un nouveau classe"),
            array("name" => "modification-classe" , "display_name" => "Mettre à jour les infos d'un classe"),
            array("name" => "suppression-classe" , "display_name" => "Supprimer un classe"),
            array("name" => "detail-classe" , "display_name" => "Voir les détails d'un classe"),

            array("name" => "liste-matiere" , "display_name" => "Voir la liste des matieres"),
            array("name" => "creation-matiere" , "display_name" => "Ajouter un nouveau matiere"),
            array("name" => "modification-matiere" , "display_name" => "Mettre à jour les infos d'un matiere"),
            array("name" => "suppression-matiere" , "display_name" => "Supprimer un matiere"),
            array("name" => "detail-matiere" , "display_name" => "Voir les détails d'un matiere"),

            array("name" => "liste-depense" , "display_name" => "Voir la liste des depenses"),
            array("name" => "creation-depense" , "display_name" => "Ajouter un nouveau depense"),
            array("name" => "modification-depense" , "display_name" => "Mettre à jour les infos d'un depense"),
            array("name" => "suppression-depense" , "display_name" => "Supprimer un depense"),
            array("name" => "detail-depense" , "display_name" => "Voir les détails d'un depense"),
        ];
        foreach ($permissions as $permission)
        {
            if (Permission::where('name', $permission['name'])->first()==null) {
                Permission::create(['name' => $permission['name'], 'display_name' => $permission['display_name']]);

            }

        }
    }
}
