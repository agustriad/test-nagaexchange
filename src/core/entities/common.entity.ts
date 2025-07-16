import {
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";

export abstract class CommonEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;

    @Column({
        name: "is_active",
        type: "boolean",
        default: true,
    })
    isActive: boolean;

    @Column({
        name: "is_deleted",
        type: "boolean",
        default: false,
    })
    isDeleted: boolean;

    @Column({ name: "created_by_id", type: "uuid", nullable: true })
    createdById?: string;

    @Column({ name: "updated_by_id", type: "uuid", nullable: true })
    updatedById?: string;

    @CreateDateColumn({
        name: "created_at",
        nullable: true,
        type: "timestamp",
        select: false,
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: "updated_at",
        nullable: true,
        type: "timestamp",
        select: false,
    })
    updatedAt?: Date;

    @DeleteDateColumn({
        name: "deleted_at",
        type: "timestamp",
        nullable: true,
        select: false,
    })
    deletedAt?: Date;

    // EVENT
    private currentUserId?: string;
    setUserContext(userId: string): void {
        this.currentUserId = userId;
    }

    @BeforeInsert()
    private beforeInsert(): void {
        if (this.currentUserId) {
            this.createdById = this.currentUserId;
        }
    }

    @BeforeUpdate()
    private beforeUpdate(): void {
        if (this.currentUserId) {
            this.updatedById = this.currentUserId;
        }
    }
}
