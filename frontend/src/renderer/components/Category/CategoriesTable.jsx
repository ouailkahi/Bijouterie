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
                    <th>Id</th>
                    <th>Type meteaux</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {typesMetaux.length > 0 &&
                    typesMetaux.map((typesMetaux) => (
                      <tr key={typesMetaux.id}>
                        <td>{typesMetaux.id}</td>
                        <td>{typesMetaux.nom}</td>
                        <td>
                            <a
                              className='btn btn-danger'
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => {
                                e.preventDefault();
                                if (
                                  window.confirm(
                                    'Voulez-vous supprimer ce type?',
                                  )
                                ) {
                                  dispatch(deleteTypesMetaux(typesMetaux.id));
                                }
                              }}
                            >
                              Supprimer
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
