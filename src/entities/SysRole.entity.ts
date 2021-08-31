import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_role", { schema: "xxzynm" })
export class SysRoleEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "SSBM", nullable: true })
  ssbm: number | null;

  @Column("int", { name: "pid", nullable: true })
  pid: number | null;

  @Column("varchar", { name: "RoleName", nullable: true, length: 50 })
  roleName: string | null;

  @Column("int", { name: "ISUSED", nullable: true })
  isused: number | null;

  @Column("int", { name: "DispOrder", nullable: true })
  dispOrder: number | null;

  @Column("datetime", { name: "ADDTIME", nullable: true })
  addtime: Date | null;

  @Column("int", { name: "CreateUser", nullable: true })
  createUser: number | null;

  @Column("int", { name: "sjfw", nullable: true })
  sjfw: number | null;
}
