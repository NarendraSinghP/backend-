
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
    // here don't forget to return.
}


export { asyncHandler }




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// higher order function that takes a function as an argument and returns a new function that wraps the original function in a try-catch block





// export {asyncHandler}
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}
// const asyncHandler = (fn) {}
// Important: The asyncHandler function is a higher-order function that takes an asynchronous function (fn) as an argument and returns a new function that wraps the original function in a try-catch block. This allows for error handling in asynchronous functions, making it easier to manage errors without having to write repetitive try-catch blocks throughout the codebase.