/*
  Warnings:

  - A unique constraint covering the columns `[themeId,subThemeId,guidelineId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_themeId_subThemeId_guidelineId_key" ON "Question"("themeId", "subThemeId", "guidelineId");
