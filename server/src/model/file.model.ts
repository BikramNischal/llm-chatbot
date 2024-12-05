import {File} from "../entity/file.entity"
import { AppDataSource } from "../service/db"


export class FileDb {
    private static _file = AppDataSource.getRepository(File) 

    public static async storeFiles(files: File[]){
        try{ 
            await FileDb._file.save(files);
            return true;
        } catch (err){
           console.error(err) 
           return false;
        }
    }

    public static async getFileByName(fileName: string): Promise<File | null>{
        try{
            const file = await FileDb._file.findOneBy({name: fileName});
            return file
        } catch(err){
            console.error(err)
            return null;
        }
    }

    public static async getFileByOriginalName(fileName: string): Promise<File | null>{
        try{
            const files = await FileDb._file.findBy({originalName: fileName});
            const file = files.reduce((latest, current) =>{
                return  (new Date(latest.date) > new Date(current.date)) ? latest : current
            })  
            return file
        } catch(err){
            console.error(err)
            return null;
        }
    }

}