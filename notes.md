## Catetan buat konek + test DB
``` js
require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  "postgres",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);

const try_connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

try_connect();
```

## Catetan buat Endpoint
### Kos Detail
- Method : POST
- Purpose : Buat nge submit booking
- Request URI/Params : 
``` 
/api/book
```
- Request Body :
``` json
{
    data:{
        userToken : string,
        kosId : string,
        roomId : string,
        ownerId : string,
        startFrom : datetime,
        endAt : datetime,
        roomPrice : integer,
        default : {
            id : uuid,
            willPay : boolean (false),
            isPaid : boolean (false),
            paymentImage : string (null),
            isConfirmed : boolean (false),
            isCancelled : boolean (false)
        }
    }
}
```
- Response Body : -

### Pemesanan Kos - List pemesanan
- Method : GET
- Purpose : Buat nge list booking yang udah dibuat user
- Request URI/Params : 
``` 
/api/book
```
- Request Body : 
``` json
    {
        userId : string
    }
```
- Response Body : 
``` json
{
    data : [
        {
            bookId : string,
            kosId : string,
            kosName : string,
            roomUrl : string,
            kosLocation : string,
            roomId : string,
            roomPrice : integer,
            startFrom : datetime,
            endAt : datetime,
            willPay : boolean,
            isPaid : boolean,
            isConfrimed : boolean
        },
        {
            bookId : string,
            kosId : string,
            kosName : string,
            imageUrl : string,
            kosLocation : string,
            roomId : string,
            roomPrice : integer,
            startFrom : datetime,
            endAt : datetime,
            willPay : boolean,
            isPaid : boolean,
            isConfrimed : boolean
        }
    ]
}
```

### Pemesanan Kos - Klik Button "Lanjutkan" setelah Button "Bayar Kos"
- Method : PUT
- Purpose : Buat user masuk ke tahap upload bukti bayar
- Request URI/Params : 
``` 
/api/book?bookId={bookId : string}&willpay=true
```
- Request Body : -
<!-- ``` json
{
    bookId : string,
    willPay : Boolean (true)
}
``` -->
- Response Body : -

### Pemesanan Kos - Klik Button "Sudah Bayar"
- Method : PUT
- Purpose : Buat ngirim bukti bayar kos dari user
- Request URI/Params : 
``` 
/api/book/image?bookId={bookId : string}
```
- Request Body (To Be Discussed) : 
``` json
{
    paymentImage : File,
    isPaid=true
}
```
- Response Body : status code


### Pemesanan Kos - Konfirmasi Pemilik
- Method : PUT
- Purpose : Buat pemilik untuk konfirmasi pembayaran pencari
- Request URI/Params : 
``` 
/api/book/confirm?bookId={bookId : string}
```
- Request Body : 
``` json
{
    isConfirmed : boolean (true)
}
```
- Response Body : -  

### Menunggu Konfirmasi 
- Method : GET
- Purpose : Buat nge list booking yang udah dibayar user dan belom di acc pemilik
- Request URI/Params : 
``` 
/api/book/confirm?bookId={bookId : string}
```
- Request Body : 
``` json
{
    userId : string
}
```
- Response Body : 
``` json
{
    data : [
        {
            bookId : string,
            kosId : string,
            kosName : string,
            roomUrl : string,
            kosLocation : string,
            roomId : string,
            startFrom : datetime,
            endAt : datetime,
        },
        {
            bookId : string,
            kosId : string,
            kosName : string,
            roomUrl : string,
            kosLocation : string,
            roomId : string,
            startFrom : datetime,
            endAt : datetime,
        }
    ],
    where : {
        isPaid : boolean (true),
        isConfirmed : boolean (false),
    }
}
```


### Pembatalan Kos
- Method : GET
- Purpose : Buat nge list booking yang udah di cancel user
- Request Body : 
``` json
{
    userId : string
}
```
- Response Body : 
``` json
{

}
```

### Riwayat Pembayaran Kos
- Method : GET
- Purpose : Buat nge list riwayat pembayaran user
- Request Body : 
``` json
{
    userId : string
}
```
- Response Body : 
``` json
{
    data : [
        {
            bookId : string,
            kosId : string,
            kosName : string,
            roomUrl : string,
            kosLocation : string,
            roomId : string,
            startFrom : datetime,
            endAt : datetime,
        },
        {
            bookId : string,
            kosId : string,
            kosName : string,
            roomUrl : string,
            kosLocation : string,
            roomId : string,
            startFrom : datetime,
            endAt : datetime,
        }
    ],
    where : {
        isPaid : boolean (true),
        isConfirmed : boolean (false),
    }
}
```

### Template
- Method : GET/POST
- Purpose : Buat nge list booking yang udah dibuat user
- Request Body : 
``` json
{

}
```
- Response Body : 
``` json
{

}
```

<!-- ## Bentuk Tabel Sementara
### tb_booking
- id -> unique,
- user_id -> FK tb.user.id
- kos_id -> FK tb.kos.id
- room_id -> FK 
- booking_date_start -> datetime
- booking_date_end -> datetime
- is_paid -> boolean (false)
- will_pay -> boolean (false)
- is_confirmed -> boolean (false)
- is_cancelled -> boolean (false)
- payment_image_url -> string Nullable
- created_at -> datetime
- updated_at -> datetime -->

## Tabel dipisah
### tb_booking
- id -> unique,
- user_id -> FK tb.user.id
- kos_id -> FK tb.kos.id
- room_id -> FK 
- booking_date_start -> datetime
- booking_date_end -> datetime
- created_at -> datetime
- updated_at -> datetime

### tb_booking_detail
- booking_id -> FK tb_booking.id
- is_paid -> boolean (false)
- will_pay -> boolean (false)
- is_confirmed -> boolean (false)
- is_cancelled -> boolean (false)
- payment_method -> enum
- payment_image_url -> string Nullable

