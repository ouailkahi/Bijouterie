import React from "react";
import AddCategory from "./AddCategory";
import CategoriesTable from "./CategoriesTable";


export default function Categories() {
 
  return (
    <React.Fragment>
      <div className="ec-content-wrapper">
        <div className="content">
          <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
            <h1 style={{color:"black"}}>Categorie</h1>
            <p className="breadcrumbs">
              <span>
                
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Categories
            </p>
          </div>
          <div className="row">
            <AddCategory />
            <CategoriesTable  />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
