class Apiresponse {
    constructor( statusCode = 200, message = '',  data={}, errors = {}){
          this.successs=true
          this.statusCode=statusCode
          this.message=message
          this.data=data
          
    }
}

export default Apiresponse