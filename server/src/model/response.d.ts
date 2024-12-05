export default interface IBaseResponse{
    success: boolean;
    message: string; 
}

export interface IParseResponse  extends IBaseResponse{
    documents: Document<Record<string, andy>>[];
}