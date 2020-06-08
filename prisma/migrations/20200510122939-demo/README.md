# Migration `20200510122939-demo`

This migration has been generated by Muhammad Rafiul Ilmi Syarifudin at 5/10/2020, 12:29:39 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."User" (
"email" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT   )

CREATE TABLE "quaint"."Post" (
"authorId" INTEGER   ,"content" TEXT   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"published" BOOLEAN NOT NULL DEFAULT false ,"title" TEXT NOT NULL  ,FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE)

CREATE TABLE "quaint"."Salary" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"salary" INTEGER NOT NULL  ,"userId" INTEGER   ,FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

CREATE UNIQUE INDEX "quaint"."Salary_userId" ON "Salary"("userId")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200510122939-demo
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,33 @@
+  
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:./here.db"
+}
+
+model User {
+  email   String  @unique
+  id      Int     @default(autoincrement()) @id
+  name    String?
+  salary  Salary?
+  posts   Post[]
+}
+
+model Post {
+  authorId  Int?
+  content   String?
+  id        Int     @default(autoincrement()) @id
+  published Boolean @default(false)
+  title     String
+  author    User?   @relation(fields: [authorId], references: [id])
+}
+
+model Salary {
+  id        Int     @default(autoincrement()) @id
+  userId    Int?
+  user      User?   @relation(fields:[userId], references: [id])
+  salary    Int 
+}
```

