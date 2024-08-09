// Assuming Apierror is defined as a class
class Apierror extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // Indicate if the error is operational
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default Apierror;
  