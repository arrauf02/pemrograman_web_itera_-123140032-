from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound, 
    HTTPBadRequest, 
    HTTPNoContent, 
    HTTPMethodNotAllowed
)
# Tambahkan import Response untuk memanipulasi header
from pyramid.response import Response 
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select

from ..models import Matakuliah


@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list_create_view(request):
    dbsession = request.dbsession
    if request.method == 'OPTIONS':
        response = Response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,DELETE,OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Accept'
        response.headers['Access-Control-Max-Age'] = '3600'
        return response
    if request.method == 'GET':
        query = select(Matakuliah).order_by(Matakuliah.id, Matakuliah.semester, Matakuliah.kode_mk)
        matakuliah_list = dbsession.scalars(query).all()
        
        data_json = [mk.to_dict() for mk in matakuliah_list]
        
        response = Response(json_body=data_json)
        

        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Accept'
        
        return response

    elif request.method == 'POST':
        try:
            data = request.json_body
        except ValueError:
            raise HTTPBadRequest('Invalid JSON body')

        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
       
        if not all(field in data for field in required_fields):
            raise HTTPBadRequest('Missing required fields (kode_mk, nama_mk, sks, semester)')
        
        try:
            sks = int(data['sks'])
            semester = int(data['semester'])
        except ValueError:
            raise HTTPBadRequest('sks and semester must be integers')

        try:
            new_mk = Matakuliah(
                kode_mk=data['kode_mk'],
                nama_mk=data['nama_mk'],
                sks=sks,
                semester=semester
            )
            dbsession.add(new_mk)
            dbsession.flush() 
            
            
            response = Response(json_body=new_mk.to_dict())
            response.status = 201 
            
           
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS' 
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Accept'
            
            return response
            
        except IntegrityError:
          
            dbsession.rollback()
            raise HTTPBadRequest('Matakuliah with this kode_mk already exists.')

    else:
       
        raise HTTPMethodNotAllowed()


@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail_crud_view(request):
    dbsession = request.dbsession
    
    if request.method == 'GET':
        response = Response(json_body=matakuliah.to_dict())

        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,DELETE,OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Accept'

        
        return response
 
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        raise HTTPBadRequest('Invalid ID format. ID must be an integer.')


    matakuliah = dbsession.get(Matakuliah, mk_id)
    if matakuliah is None:
        raise HTTPNotFound(f'Matakuliah with ID {mk_id} not found')

   

    elif request.method == 'PUT':
        try:
            data = request.json_body
        except ValueError:
            raise HTTPBadRequest('Invalid JSON body')
        
        try:
            if 'kode_mk' in data:
                matakuliah.kode_mk = data['kode_mk']
            if 'nama_mk' in data:
                matakuliah.nama_mk = data['nama_mk']
            if 'sks' in data:
                matakuliah.sks = int(data['sks'])
            if 'semester' in data:
                matakuliah.semester = int(data['semester'])
            
            dbsession.flush()
            
            response = Response(json_body=matakuliah.to_dict())
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
            
        except (IntegrityError, ValueError):
            dbsession.rollback()
            raise HTTPBadRequest('Update failed (e.g., duplicate kode_mk or invalid data type)')

    # --- DELETE: Menghapus data matakuliah ---
    elif request.method == 'DELETE':
        dbsession.delete(matakuliah)
        
        # Mengembalikan Status 204 No Content (dengan CORS header)
        response = HTTPNoContent()
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    else:
        # Menangani method selain GET, PUT, dan DELETE pada route ini
        raise HTTPMethodNotAllowed()