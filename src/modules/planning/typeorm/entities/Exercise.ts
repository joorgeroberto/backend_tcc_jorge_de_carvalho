import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExerciseGroup from './ExerciseGroup';

type ExerciseType = 'duration' | 'distance';

@Entity('exercise')
class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'exercise_group_id' })
  exerciseGroupId: string;

  @Column('varchar')
  type: ExerciseType;

  @Column('varchar')
  duration: string;

  @Column('float')
  distance: number;

  @Column('varchar')
  description: string;

  @ManyToOne(() => ExerciseGroup, exerciseGroup => exerciseGroup.exercises, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'exercise_group_id', referencedColumnName: 'id' })
  exerciseGroup: ExerciseGroup;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

export default Exercise;
