export type GenericResponse<T> = {
    success: boolean;
    data: T;
    message: string;
};
