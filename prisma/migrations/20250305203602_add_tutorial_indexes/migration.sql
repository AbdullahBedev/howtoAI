-- CreateIndex
CREATE INDEX "Tutorial_published_idx" ON "Tutorial"("published");

-- CreateIndex
CREATE INDEX "Tutorial_category_idx" ON "Tutorial"("category");

-- CreateIndex
CREATE INDEX "Tutorial_difficulty_idx" ON "Tutorial"("difficulty");

-- CreateIndex
CREATE INDEX "Tutorial_type_idx" ON "Tutorial"("type");

-- CreateIndex
CREATE INDEX "Tutorial_isPremium_idx" ON "Tutorial"("isPremium");

-- CreateIndex
CREATE INDEX "Tutorial_tags_idx" ON "Tutorial"("tags");
