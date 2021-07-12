import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import * as auth from "../_redux/authRedux";
import RegistrationCom from "../../../components/Registration";

function Registration(props) {
   return <RegistrationCom {...props} />;
}

export default injectIntl(connect(null, auth.actions)(Registration));
