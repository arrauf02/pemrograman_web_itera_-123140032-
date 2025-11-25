from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')
        config.set_default_permission('deny')
        config.add_route('matakuliah_list', '/api/matakuliah', request_method=['GET', 'POST','OPTIONS'])
    
    # 2. Route untuk /api/matakuliah/{id} (GET, PUT, DELETE)
        config.add_route('matakuliah_detail', '/api/matakuliah/{id}', request_method=['GET', 'PUT', 'DELETE','OPTIONS'])
    # ... tambahkan views
        config.scan('.views')
    return config.make_wsgi_app()
