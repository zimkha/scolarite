<div class="card-content collapse show">
    <div class="card-body card-dashboard">
        <p class="card-text">A dot (.) is used to mark the decimal place in Javascript, however, many parts of the world use a comma (,) and other characters such as the Unicode decimal separator (⎖) or a dash (-) are often used to show the decimal place in a displayed number.</p>
        <div id="DataTables_Table_10_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4"><div class="row"><div class="col-sm-12 col-md-6"><div class="dataTables_length" id="DataTables_Table_10_length"><label>Show <select name="DataTables_Table_10_length" aria-controls="DataTables_Table_10" class="form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div></div><div class="col-sm-12 col-md-6"><div id="DataTables_Table_10_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_10"></label></div></div></div><div class="row"><div class="col-sm-12"><table class="table table-striped table-bordered comma-decimal-place dataTable" id="DataTables_Table_10" role="grid" aria-describedby="DataTables_Table_10_info">
                        <thead>
                        <tr role="row">
                            <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 238px;">Matricule</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 359px;">Nom</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 184px;">Prenom</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 82px;">Date naissance</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 160px;">classe</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_10" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 153px;">Action</th></tr>
                        </thead>
                        <tbody>
                        @foreach($inscriptions as $item)
                        <tr>
                            <td>{{ $item->eleve->matricule }}</td>
                            <td>{{ $item->eleve->nom }}</td>
                            <td>{{ $item->eleve->prenom }}</td>
                            <td>{{ $item->eleve->naissance }}</td>
                            <td>{{ $item->classe->nom_classe}}</td>

                        </tr>
                        @endforeach
                        </tbody>

                    </table></div></div><div class="row">
                <div class="col-sm-12 col-md-5"><div class="dataTables_info" id="DataTables_Table_10_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                </div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_10_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_10_previous"><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                            </li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="5" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="6" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="DataTables_Table_10_next"><a href="#" aria-controls="DataTables_Table_10" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
    </div>
</div>
