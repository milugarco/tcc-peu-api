-- CreateTable
CREATE TABLE "comics" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "cover_photo" TEXT NOT NULL,
    "banner_photo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "comics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comic_pages" (
    "id" SERIAL NOT NULL,
    "comic_id" TEXT NOT NULL,
    "page_photo" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,

    CONSTRAINT "comic_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comic_rating" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "comic_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "comic_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comic_comments" (
    "id" SERIAL NOT NULL,
    "comic_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "comic_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comics_title_key" ON "comics"("title");

-- AddForeignKey
ALTER TABLE "comic_pages" ADD CONSTRAINT "comic_pages_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comic_rating" ADD CONSTRAINT "comic_rating_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comic_rating" ADD CONSTRAINT "comic_rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comic_comments" ADD CONSTRAINT "comic_comments_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comic_comments" ADD CONSTRAINT "comic_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
