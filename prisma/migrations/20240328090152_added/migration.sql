/*
  Warnings:

  - Added the required column `gym_id` to the `checkins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_Id` to the `checkins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkins" ADD COLUMN     "gym_id" TEXT NOT NULL,
ADD COLUMN     "user_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
