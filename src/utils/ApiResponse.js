class ApiResponse{
    constructor(statusCode,data,messafe="Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode<400;
    }
}