import { Request, Response, NextFunction } from "express";

export type RouteFunction = (req: Request, res: Response, next: NextFunction) => void;
export type Controller = {[key: string]: RouteFunction};

function tryRunFunction(fn: RouteFunction): RouteFunction {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await fn(req, res, next)
        } catch (_error) {
            const error = _error as Error;

            if (error.message.includes("not found")) {
                res.status(404).send({error: "not found"});
            } else if (error.message.includes("incorrect data")) {
                res.status(400).send({error: "incorrect data"});
            } else if (process.env.NODE_ENV == "production") {
                res.status(500).send({error: "internal error"});
            } else {
                console.error(_error);
                next(_error)
            }
        }
    }
}

export function withHandleError(controllerFunctions: {[key: string]: RouteFunction}): Controller {
    const functionsWithErrorHandler: Controller = {};

    Object.keys(controllerFunctions).forEach((key) => {
        functionsWithErrorHandler[key] = tryRunFunction(controllerFunctions[key]);
    })

    return functionsWithErrorHandler
}