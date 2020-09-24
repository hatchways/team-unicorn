/**
 *
 * @property {bool} success - Describes whether api call succeeded.
 * @property {Object} data - Holds {key: (any) value} pairs for response payload.
 * @property {Object} error - Holds {key: (string) value} pairs containing error messages.
 */

class ApiResult {
  constructor({success, data = null, errors = null}) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }
}
const fail = ({errors}) => {
  const success = false;
  return new ApiResult({success, errors});
};

const succeed = ({data}) => {
  const success = true;
  return new ApiResult({success, data});
};

const ApiResultFactory = {
  success: () => {
    return succeed({});
  },
  // NOTE: Failure should include at least one
  //        error message! Therefore, no "failure"
  //        counterpart of sucess method in factory.

  withErrors: (errors) => {
    return fail({errors});
  },
  withData: (data) => {
    return succeed({data});
  },
};

export default ApiResultFactory;
