import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Training from './Training';

@Entity('performed_training')
class PerformedTraining {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  calories: number;

  @Column('varchar')
  duration: string;

  @Column('varchar')
  distance: string;

  @Column('float', { name: 'v_med' })
  vMed: number;

  @Column('float', { name: 'v_max' })
  vMax: number;

  @Column('int', { name: 'fc_rest' })
  fcRest: number;

  @Column('int', { name: 'fc_med' })
  fcMed: number;

  @Column('int', { name: 'fc_max' })
  fcMax: number;

  @Column('uuid', { name: 'training_id' })
  trainingId: string;

  @OneToOne(() => Training, training => training.performedTraining, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'training_id', referencedColumnName: 'id' })
  training: Training;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: Date;
}

export default PerformedTraining;
