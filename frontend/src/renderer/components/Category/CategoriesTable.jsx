import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTypesMetaux } from '../../redux/typesMetauxSlice';

export default function CategoriesTable({ typesMetaux }) {
  const dispatch = useDispatch();
  
  return (
    <React.Fragment>
      <div className="col-xl-8 col-lg-12">
        <div className="ec-cat-list card card-default">
          <div
            className="card-body"
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            }}
          >
            <div className="table-responsive">
              <table
                id="responsive-data-table"
                style={{ textAlign: 'center' }}
                className="table"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tipo de Metales</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {typesMetaux.length > 0 &&
                    typesMetaux.map((type) => (
                      <tr key={type.id}>
                        <td>{type.id}</td>
                        <td>{type.nom}</td>
                        <td>
                          <a
                            className='btn btn-danger'
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                window.confirm(
                                  '¿Desea eliminar este tipo?',
                                )
                              ) {
                                dispatch(deleteTypesMetaux(type.id));
                              }
                            }}
                          >
                            Eliminar
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
