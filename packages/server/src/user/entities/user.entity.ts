import { Exclude } from "class-transformer";
import { CommonEntity } from "src/shared/entities/common.entiry";
import {
  Entity,
  Column,
  Unique,
  UpdateDateColumn,
  ObjectIdColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ObjectID,
  OneToMany
} from "typeorm";
@Entity('users')
export class UserEntity extends CommonEntity{

  @PrimaryGeneratedColumn()
  userId: number;

  // 昵称
  @Column("text")
  nickName: string;

  // 手机号
  @Column({
    type:"varchar",
    length: 150,
    unique: true,
  })
  phoneNumber: string;

  //密码
  @Column({
   type:"text"
  })
  password: string;

  // 头像
  @Column({
    type:"varchar",
    default:""
  })
  avatar:string
  
  @Column()
  salt: string;
}
