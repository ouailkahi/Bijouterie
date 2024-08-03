import React, { useEffect } from "react";
import AddCategory from "./AddCategory";
import CategoriesTable from "./CategoriesTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypesMetaux } from "../../redux/typesMetauxSlice";


export default function Categories() {

  const dispatch = useDispatch();

  const typesMetaux = useSelector((state) => state.typesMetaux.items);
  const typesMetauxStatus = useSelector((state) => state.typesMetaux.status);
  const error = useSelector((state) => state.typesMetaux.error);

  useEffect(() => {
    if (typesMetauxStatus === 'idle') {
        dispatch(fetchTypesMetaux());
    }
}, [typesMetauxStatus, dispatch]);
 
  return (
    <React.Fragment>
      <div className="ec-content-wrapper">
        <div className="content">
          <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
            <h1 style={{color:"black"}}>Tipo</h1>
           
          </div>
          <div className="row">
            <AddCategory typesMetaux={typesMetaux} />
            <CategoriesTable typesMetaux={typesMetaux} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
