import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobSkill } from './job-skill.entity';

@Entity('Jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  company: string;

  @Column({ nullable: true })
  salary: number;

  @Column({ nullable: false })
  country: string;

  @CreateDateColumn()
  createdAt: Date;

  // @Column({ type: 'json', nullable: true, default: '' })
  @OneToMany(() => JobSkill, (jobSkill) => jobSkill.job, {
    cascade: true,
    eager: true,
  })
  skills: JobSkill[];

  @BeforeInsert()
  stringsToLowerCase() {
    this.country = this.country.toLowerCase();
  }
}
