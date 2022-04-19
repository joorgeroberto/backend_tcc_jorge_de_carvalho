import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePlanning1650329514348 implements MigrationInterface {
    name = 'CreatePlanning1650329514348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "athletes" DROP CONSTRAINT "AthletesGroup"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" DROP CONSTRAINT "advisor_id"`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "exercise_group_id" uuid NOT NULL, "type" character varying NOT NULL, "duration" character varying, "distance" double precision, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "training_id" uuid NOT NULL, "number_repetitions" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_5e11c2a0f58d656acd133e31541" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "performed_training" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "calories" double precision NOT NULL, "duration" character varying NOT NULL, "v_med" double precision NOT NULL, "v_max" double precision NOT NULL, "fc_rest" integer NOT NULL, "fc_med" integer NOT NULL, "fc_max" integer NOT NULL, "training_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "REL_0b9d897ee495bc5634a700f8f0" UNIQUE ("training_id"), CONSTRAINT "PK_6dda4d9dd50056cc0837e3a2397" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "training" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" character varying NOT NULL, "is_optional" boolean NOT NULL, "planning_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "planning" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "number_of_weeks" integer NOT NULL, "start_date" character varying NOT NULL, "end_date" character varying NOT NULL, "athlete_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_039eb2fba66a12575b858717fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP COLUMN "user_type"`);
        await queryRunner.query(`DROP TYPE "public"."athletes_user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD "user_type" character varying NOT NULL DEFAULT 'athlete'`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP CONSTRAINT "UQ_9d25db8fb891a90de06344dedce"`);
        await queryRunner.query(`ALTER TABLE "athletes" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP CONSTRAINT "UQ_55114d764be53bbd0f1d11042eb"`);
        await queryRunner.query(`ALTER TABLE "athletes" ALTER COLUMN "group_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "athletes_group" DROP CONSTRAINT "UQ_f651f145e4a5296a7b39a92c075"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" DROP COLUMN "sport_name"`);
        await queryRunner.query(`DROP TYPE "public"."athletes_group_sport_name_enum"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ADD "sport_name" character varying NOT NULL DEFAULT 'run'`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ALTER COLUMN "advisor_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ALTER COLUMN "advisor_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "athletes_group" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "athletes_group" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_e4b4568b1dc198ac03ffd9c606e" FOREIGN KEY ("exercise_group_id") REFERENCES "exercise_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exercise_group" ADD CONSTRAINT "FK_09969b93b77a29ed98f8e89a76c" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "performed_training" ADD CONSTRAINT "FK_0b9d897ee495bc5634a700f8f08" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_9735111eb97e927fbf48f987a2c" FOREIGN KEY ("planning_id") REFERENCES "planning"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "planning" ADD CONSTRAINT "FK_85f25e1490063bdaefd4bdd6460" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planning" DROP CONSTRAINT "FK_85f25e1490063bdaefd4bdd6460"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_9735111eb97e927fbf48f987a2c"`);
        await queryRunner.query(`ALTER TABLE "performed_training" DROP CONSTRAINT "FK_0b9d897ee495bc5634a700f8f08"`);
        await queryRunner.query(`ALTER TABLE "exercise_group" DROP CONSTRAINT "FK_09969b93b77a29ed98f8e89a76c"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_e4b4568b1dc198ac03ffd9c606e"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "athletes_group" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ALTER COLUMN "advisor_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ALTER COLUMN "advisor_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "athletes_group" DROP COLUMN "sport_name"`);
        await queryRunner.query(`CREATE TYPE "public"."athletes_group_sport_name_enum" AS ENUM('run')`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ADD "sport_name" "public"."athletes_group_sport_name_enum" NOT NULL DEFAULT 'run'`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ADD CONSTRAINT "UQ_f651f145e4a5296a7b39a92c075" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "athletes" ALTER COLUMN "group_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD CONSTRAINT "UQ_55114d764be53bbd0f1d11042eb" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "athletes" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD CONSTRAINT "UQ_9d25db8fb891a90de06344dedce" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP COLUMN "user_type"`);
        await queryRunner.query(`CREATE TYPE "public"."athletes_user_type_enum" AS ENUM('advisor', 'monitor', 'athlete')`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD "user_type" "public"."athletes_user_type_enum" NOT NULL DEFAULT 'athlete'`);
        await queryRunner.query(`DROP TABLE "planning"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`DROP TABLE "performed_training"`);
        await queryRunner.query(`DROP TABLE "exercise_group"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`ALTER TABLE "athletes_group" ADD CONSTRAINT "advisor_id" FOREIGN KEY ("advisor_id") REFERENCES "athletes"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD CONSTRAINT "AthletesGroup" FOREIGN KEY ("group_id") REFERENCES "athletes_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
