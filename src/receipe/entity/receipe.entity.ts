import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ingredients } from "./ingredients.entity";

@Entity({name: 'receipe'})
export class Receipe {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Ingredients, (ingredients) => ingredients.receipe, {
        cascade: true,
        eager: true
    })
    ingredients: Ingredients[];
}