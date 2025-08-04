## Çalışan comtainer leri görüntüle

docker ps

## Tüm servisleri başlat

docker-compose up -d

## Tüm servisleri durdur

docker-compose down

## Prisma Komutları

**npx prisma db push**

Ne zaman çalıştırılır: Sadece schema.prisma dosyasında model değişikliği yaptığında
Ne yapar: Schema değişikliklerini database'e uygular (tablolar oluşturur/günceller)
Örnek durumlar:

- Yeni model eklediğinde
- Mevcut modele yeni field eklediğinde
- Field tipini değiştirdiğinde
- İlişki eklediğinde/değiştirdiğinde

**npx prisma generate**

Ne zaman çalıştırılır: schema.prisma dosyasında herhangi bir değişiklik yaptığında
Ne yapar: TypeScript client kodunu yeniden oluşturur
Neden gerekli: TypeScript'te yeni modellerin tiplerini kullanabilmek için
