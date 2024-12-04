export default interface IBaseResponse{
    status: boolean;
    message: string; 
}

export interface IParseResponse  extends IBaseResponse{
    documents: Document<Record<string, andy>>[];
}