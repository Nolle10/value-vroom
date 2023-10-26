use actix_web::web::Json;
use sqlx::postgres::{PgPoolOptions, PgRow };
use sqlx::{FromRow, Row };
use actix_web::{get,App ,Responder, HttpServer, web, HttpResponse, post, delete };
use serde::{Serialize, Deserialize};
use serde_json::{Value, from_str};

#[derive(Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub full_name: Option<String>,
    pub hashed_password: String,
}

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct Car {
    pub id: i32,
    pub car_model_name: String,
    pub year: i32,
    pub country: String,
    pub city: String,
    pub price: i32,
    pub isavailable: bool,
}

#[derive(Serialize, Deserialize)]
pub struct Booking {
    pub id: i32,
    pub start_date: String, // You might want to use a more appropriate type
    pub end_date: String,   // You might want to use a more appropriate type
    pub car_id: i32,
    pub username: String,
    pub status_name: String,
}

#[derive(Serialize, Deserialize)]
pub struct Image {
    pub name: String,
    pub data: Vec<u8>, // BYTEA is usually mapped to a Vec<u8>
}

#[derive(Serialize, Deserialize)]
pub struct Token {
    pub access_token: String,
    pub token_type: String,
}
async fn init_pool() ->  sqlx::Pool<sqlx::Postgres>{
    
    let pool = PgPoolOptions::new().max_connections(5).connect("postgres://gnftqdni:b4zdkYCs8tO9-ZJcMzzYQtJ4q14vIMD2@surus.db.elephantsql.com/gnftqdni").await.unwrap();
    pool
}


#[post("/cars/create")]
async fn create_car(pool: web::Data<sqlx::Pool<sqlx::Postgres>>, req_body: String) -> impl Responder {

    let value:Value = from_str(&req_body).unwrap();
    let model: String = value["model"].as_str().unwrap().to_owned();
    let year: i64 = value["year"].as_i64().unwrap().to_owned();
    let seats: i64 = value["seats"].as_i64().unwrap().to_owned();
    let pricePerDay:f64 = value["pricePerDay"].as_f64().unwrap().to_owned();
    let rating:f64 = value["ratings"].as_f64().unwrap().to_owned();
    let description: String = value["description"].as_str().unwrap().to_owned();
    let result = sqlx::query(" Insert into cars(model,year,seats,pricePerDay,ratings,description) values ($1,$2,$3,$4,$5,$6)")
        .bind(&model).bind(&year).bind(&seats).bind(&pricePerDay).bind(&rating).bind(&description)
        .execute(&**pool)
        .await;
    HttpResponse::Ok().body("CREATED I THINK")

}

#[delete("/cars/delete")]
async fn echo(pool: web::Data<sqlx::Pool<sqlx::Postgres>>, req_body: String) -> impl Responder {

    println!("{}",req_body);
    let val:Value = from_str(&req_body).unwrap();
    let search:i64=  val["carId"].as_i64().unwrap();
    let row = sqlx::query("delete from cars where carId = $1;")
        .bind(&search)
        .execute(&**pool)
        .await.unwrap();
    HttpResponse::Ok().body(req_body)
    
}

#[get("/cars/list")]
async fn list(pool: web::Data<sqlx::Pool<sqlx::Postgres>> ) -> impl Responder {

    let result = sqlx::query("select * from cars")
        .fetch_all(&**pool)
        .await;
let mut text_result = String::new();

for pg in result.unwrap().iter(){
    let val:String = pg.try_get("model").unwrap();
    let bra:i32 = pg.try_get("year").unwrap();
    let pri:i32  = pg.try_get("seats").unwrap();
    text_result.push_str(&val);
    text_result.push_str("  ");
    text_result.push_str(&bra.to_string());
    text_result.push_str("  ");
    text_result.push_str(&pri.to_string());
    text_result.push('\n');
}


HttpResponse::Ok().body(text_result)
}


#[post("/users/create")]
async fn create_user(pool: web::Data<sqlx::Pool<sqlx::Postgres>> ,req_body: String) -> impl Responder {

    let value:Value = from_str(&req_body).unwrap();
    let fname: String = value["fname"].as_str().unwrap().to_owned();
    let lname: String = value["lname"].as_str().unwrap().to_owned();
    let email: String = value["email"].as_str().unwrap().to_owned();
    let password: String = value["password"].as_str().unwrap().to_owned(); // i know this is plain
                                                                           // text 
                                                                           // , but do i care is
                                                                           // a better question
    let result = sqlx::query(" Insert into users(fname,lname,email,password) values ($1,$2,$3,$4)")
        .bind(&fname).bind(&lname).bind(&email).bind(&password)
        .execute(&**pool)
        .await;
    HttpResponse::Ok().body("CREATED I THINK")

}

#[get("/users/list")]
async fn list_users(pool: web::Data<sqlx::Pool<sqlx::Postgres>> ) -> impl Responder {

    let result = sqlx::query("select * from users")
        .fetch_all(&**pool)
        .await;
let mut text_result = String::new();

for pg in result.unwrap().iter(){
    let val:String = pg.try_get("fname").unwrap();
    let bra:String = pg.try_get("lname").unwrap();
    let pri:String  = pg.try_get("email").unwrap();
    text_result.push_str(&val);
    text_result.push_str("  ");
    text_result.push_str(&bra.to_string());
    text_result.push_str("  ");
    text_result.push_str(&pri.to_string());
    text_result.push('\n');
}


HttpResponse::Ok().body(text_result)
}


#[delete("/users/{id}")]
async fn delete_users(pool: web::Data<sqlx::Pool<sqlx::Postgres>>, userId: web::Path<i32>) -> impl Responder {
    let _row = sqlx::query("delete from users where userId = $1;")
        .bind(userId.into_inner())
        .execute(&**pool)
        .await.unwrap();

    if _row.rows_affected()<1 {
        HttpResponse::Ok().body("No Users exits with that id")
    }
    else {
    HttpResponse::Ok().body("USER DELETED I HOPE")
    }
}
async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[get("/users/{id}")]
async fn get_user(pool: web::Data<sqlx::Pool<sqlx::Postgres>>, userId: web::Path<i32>) -> impl Responder {
    let _row = sqlx::query("select * from users where userId = $1;")
        .bind(userId.into_inner())
        .fetch_one(&**pool)
        .await;

    HttpResponse::Ok().body("")
}

// Login for access token
#[post("/token")]
async fn login_token_post(pool: web::Data<sqlx::Pool<sqlx::Postgres>>, req_body: String) -> impl Responder {
    // Implement your logic here
    HttpResponse::Ok().body("Token generated")
}

// Signup for access token
#[post("/signup")]
async fn signup_signup_post(pool: web::Data<sqlx::Pool<sqlx::Postgres>>, req_body: String) -> impl Responder {
    // Implement your logic here
    HttpResponse::Ok().body("User signed up")
}

// Get the current user
#[get("/current_user")]
async fn current_user_current_user_get() -> impl Responder {
    // Implement your logic here
    HttpResponse::Ok().body("Current user details")
}

// Get all users
#[get("/users")]
async fn get_users(pool: web::Data<sqlx::Pool<sqlx::Postgres>>) -> impl Responder {
    let result = sqlx::query("select * from users")
        .fetch_all(&**pool)
        .await;
let mut text_result = String::new();

for pg in result.unwrap().iter(){
    let val:String = pg.try_get("fname").unwrap();
    let bra:String = pg.try_get("lname").unwrap();
    let pri:String  = pg.try_get("email").unwrap();
    text_result.push_str(&val);
    text_result.push_str("  ");
    text_result.push_str(&bra.to_string());
    text_result.push_str("  ");
    text_result.push_str(&pri.to_string());
    text_result.push('\n');
}
HttpResponse::Ok().body(text_result)

}

// Get all cars
#[get("/cars/all")]
async fn get_all_cars(pool: web::Data<sqlx::Pool<sqlx::Postgres>>) -> impl Responder {
    // Implement your logic here
 
    let result:Result<Vec<Car>, sqlx::Error> = sqlx::query_as("select * from cars;")
        .fetch_all(&**pool)
        .await;
let mut text_result = String::new();

 match result {
        Ok(cars) => {
            let text_result: String = cars
                .iter()
                .map(|car| format!("{} {} {} {} {} {}\n", car.id, car.car_model_name, car.year, car.country, car.city, car.price))
                .collect();
            HttpResponse::Ok().body(text_result)
        },
        Err(e) => {
            eprintln!("Database error: {}", e);
            HttpResponse::InternalServerError().finish()
        }
    }

}

// Get all booked cars
#[get("/cars/booked")]
async fn get_booked_cars(pool: web::Data<sqlx::Pool<sqlx::Postgres>>) -> impl Responder {
 
    let result = sqlx::query("select * from users where isavailable=false")
        .fetch_all(&**pool)
        .await;
let mut text_result = String::new();

for pg in result.unwrap().iter(){
    let val:String = pg.try_get("fname").unwrap();
    let bra:String = pg.try_get("lname").unwrap();
    let pri:String  = pg.try_get("email").unwrap();
    text_result.push_str(&val);
    text_result.push_str("  ");
    text_result.push_str(&bra.to_string());
    text_result.push_str("  ");
    text_result.push_str(&pri.to_string());
    text_result.push('\n');
}
HttpResponse::Ok().body(text_result)
}

// Get all available cars
#[get("/cars/available")]
async fn get_available_cars(pool: web::Data<sqlx::Pool<sqlx::Postgres>>) -> impl Responder {
    let result = sqlx::query("select * from cars;")
        .fetch_all(&**pool)
        .await;
let mut text_result = String::new();

for pg in result.unwrap().iter(){
    let val:String = pg.try_get("fname").unwrap();
    let bra:String = pg.try_get("lname").unwrap();
    let pri:String  = pg.try_get("email").unwrap();
    text_result.push_str(&val);
    text_result.push_str("  ");
    text_result.push_str(&bra.to_string());
    text_result.push_str("  ");
    text_result.push_str(&pri.to_string());
    text_result.push('\n');
}


HttpResponse::Ok().body(text_result)
}

// Get all bookings for a specific car
#[get("/cars/{car_id}/bookings")]
async fn get_car_bookings(car_id: web::Path<i32>) -> impl Responder {
    // Implement your logic here
    HttpResponse::Ok().body(format!("All bookings for car {}", car_id))
}
// Get all images
#[get("/images")]
async fn get_images_images_get() -> impl Responder {
    // Implement your logic here
    HttpResponse::Ok().body("All images")
}

// Get specific image
#[get("/images/{image_name}")]
async fn get_image_images__image_name__get(image_name: web::Path<String>) -> impl Responder {
    // Implement your logic here
    HttpResponse::Ok().body(format!("Image with name {}", image_name))
}

// Get all bookings
#[get("/bookings")]
async fn get_bookings_bookings_get() -> impl Responder {
    // Implement your logic here
    HttpResponse::Ok().body("All bookings")
}

// Create a booking
#[post("/bookings")]
async fn create_booking_bookings_post(pool: web::Data<sqlx::Pool<sqlx::Postgres>>, req_body: String) -> impl Responder {
    // Implement your logic here
    HttpResponse::Ok().body("Booking created")
}


#[actix_web::main]
async fn main() -> std::io::Result<()>{
let pool = init_pool().await;
let pool = web::Data::new(pool);

     HttpServer::new(move || {
        App::new()
            .app_data(pool.clone())
            .service(create_car)
            .service(echo)
            .service(get_users)
            .service(get_all_cars)
            .service(create_user)
            .service(list_users)
            .service(delete_users)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await

}
