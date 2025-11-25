def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('matakuliah_list', '/api/matakuliah', request_method=['GET', 'POST'])
    
    # 2. Route untuk /api/matakuliah/{id} (GET, PUT, DELETE)
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}', request_method=['GET', 'PUT', 'DELETE'])
    
    
