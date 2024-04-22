import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Job } from './job.entity';

@Entity('JobSkill')
export class JobSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  skillName: string;

  @ManyToOne(() => Job, (job) => job.skills, { onDelete: 'CASCADE' })
  job: Job;

  @BeforeInsert()
  skillNameToLowerCase() {
    this.skillName = this.skillName.toLowerCase();
  }
}
