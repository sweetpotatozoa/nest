// users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import { UserProfile } from '../user-profiles/user-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Board, (board) => board.user, { cascade: true })
  boards: Board[];

  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile: UserProfile;
}
