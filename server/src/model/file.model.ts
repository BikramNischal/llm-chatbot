import {File} from "../entity/file.entity"
import { AppDataSource } from "../service/db"

export const fileRepo = AppDataSource.getRepository(File);