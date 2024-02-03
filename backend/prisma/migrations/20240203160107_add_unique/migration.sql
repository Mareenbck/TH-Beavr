/*
  Warnings:

  - A unique constraint covering the columns `[internal_id]` on the table `Guideline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `SubTheme` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Theme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guideline_internal_id_key" ON "Guideline"("internal_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubTheme_title_key" ON "SubTheme"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_title_key" ON "Theme"("title");
