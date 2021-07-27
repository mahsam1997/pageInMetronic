/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export function BreadCrumbs({ items }) {
   if (!items || !items.length) {
      return "";
   }

   return (
      <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
         <Link className="breadcrumb-item" to="/dashboard">
            <FormattedMessage id="DEFAULT.DASHBOARD" />
         </Link>
         {items.map((item, index) => (
            <li className="breadcrumb-item" key={index}>
               <Link className="text-muted " to={{ pathname: item.pathname }}>
                  {item.title}
               </Link>
            </li>
         ))}
      </ul>
   );
}
