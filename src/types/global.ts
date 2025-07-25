import { Request } from 'express'

export interface RequestWithBody<T> extends Request<{}, {}, T> {
}

export interface RequestWithQuery<T> extends Request<{}, {}, {}, T> {
}

export interface RequestWithParams<T> extends Request<T> {
}

export interface RequestWithParamsAndBody<T, B> extends Request<T, {}, B> {
}



