import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Receipe } from './receipe.entity';

@Entity({ name: 'ingredients' })
export class Ingredients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  unit: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Receipe, (receipe) => receipe.ingredients, {
    onDelete: 'CASCADE',
  })
  receipe: Receipe;
}
