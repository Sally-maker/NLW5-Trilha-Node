import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";



@EntityRepository(Connection)
class ConnetionRepository extends Repository<Connection>{

}

export { ConnetionRepository }