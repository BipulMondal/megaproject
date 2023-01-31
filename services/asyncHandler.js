const asyncHandler = (fn) => async (req, res,next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}

export default asyncHandler;


//const asyncHandler = () => {};
//const asyncHandler = (fn) => {};
//const asyncHandler = (fn) => () => {};
//const asyncHandler = (fn) => async () => {}

//this function is same with above function, this is done by normal function but above is done by arrow function. Both are same

// function asyncHandler(fn) {
//     return async function (req, res, next) {
//         try {
//             await fn(req, res, next);
//         } catch (error) {
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message
//             })
//         }
//     }
// }