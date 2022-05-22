
export const createError = (status, message) =>{
    const error = new Error();
    error.status= status;
    error.message = message

    return error;
} 



// const failed = true;
// if(failed) return next(createError(401, 'You are not authenticated.'))