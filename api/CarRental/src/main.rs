use actix_web::web::Json;
use sqlx::postgres::{PgPoolOptions, PgRow };
use sqlx::{FromRow, Row };
use actix_web::{get,App ,Responder, HttpServer, web, HttpResponse, post, delete };
use serde_json::{Value, from_str};


#[post("/cars/create")]
async fn hello(req_body: String) -> impl Responder {

    let pool = PgPoolOptions::new().max_connections(5).connect("postgres://gnftqdni:b4zdkYCs8tO9-ZJcMzzYQtJ4q14vIMD2@surus.db.elephantsql.com/gnftqdni").await.unwrap();
    let value:Value = from_str(&req_body).unwrap();
    let model: String = value["model"].as_str().unwrap().to_owned();
    let year: i64 = value["year"].as_i64().unwrap().to_owned();
    let seats: i64 = value["seats"].as_i64().unwrap().to_owned();
    let pricePerDay:f64 = value["pricePerDay"].as_f64().unwrap().to_owned();
    let rating:f64 = value["ratings"].as_f64().unwrap().to_owned();
    let description: String = value["description"].as_str().unwrap().to_owned();
    let result = sqlx::query(" Insert into cars(model,year,seats,pricePerDay,ratings,description) values ($1,$2,$3,$4,$5,$6)")
        .bind(&model).bind(&year).bind(&seats).bind(&pricePerDay).bind(&rating).bind(&description)
        .execute(&pool)
        .await;
    HttpResponse::Ok().body("CREATED I THINK")

}

#[delete("/cars/delete")]
async fn echo(req_body: String) -> impl Responder {

    let pool = PgPoolOptions::new().max_connections(5).connect("postgres://gnftqdni:b4zdkYCs8tO9-ZJcMzzYQtJ4q14vIMD2@surus.db.elephantsql.com/gnftqdni").await.unwrap();
    println!("{}",req_body);
    let val:Value = from_str(&req_body).unwrap();
    let search:i64=  val["carId"].as_i64().unwrap();
    let row = sqlx::query("delete from cars where carId = $1;")
        .bind(&search)
        .execute(&pool)
        .await.unwrap();
    HttpResponse::Ok().body(req_body)
    
}

#[get("/cars/list")]
async fn list() -> impl Responder {

    let pool = PgPoolOptions::new().max_connections(5).connect("postgres://gnftqdni:b4zdkYCs8tO9-ZJcMzzYQtJ4q14vIMD2@surus.db.elephantsql.com/gnftqdni").await.unwrap();
    let result = sqlx::query("select * from cars")
        .fetch_all(&pool)
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
async fn create_user(req_body: String) -> impl Responder {

    let pool = PgPoolOptions::new().max_connections(5).connect("postgres://gnftqdni:b4zdkYCs8tO9-ZJcMzzYQtJ4q14vIMD2@surus.db.elephantsql.com/gnftqdni").await.unwrap();
    let value:Value = from_str(&req_body).unwrap();
    let fname: String = value["fname"].as_str().unwrap().to_owned();
    let lname: String = value["lname"].as_str().unwrap().to_owned();
    let email: String = value["email"].as_str().unwrap().to_owned();
    let password: String = value["password"].as_str().unwrap().to_owned(); // i know this is plain
                                                                           // text but do i care is
                                                                           // a better question
    let result = sqlx::query(" Insert into users(fname,lname,email,password) values ($1,$2,$3,$4)")
        .bind(&fname).bind(&lname).bind(&email).bind(&password)
        .execute(&pool)
        .await;
    HttpResponse::Ok().body("CREATED I THINK")

}

#[get("/users/list")]
async fn list_users() -> impl Responder {

    let pool = PgPoolOptions::new().max_connections(5).connect("postgres://gnftqdni:b4zdkYCs8tO9-ZJcMzzYQtJ4q14vIMD2@surus.db.elephantsql.com/gnftqdni").await.unwrap();
    let result = sqlx::query("select * from users")
        .fetch_all(&pool)
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


#[delete("/users/delete")]
async fn delete_users(req_body: String) -> impl Responder {

    let pool = PgPoolOptions::new().max_connections(5).connect("postgres://gnftqdni:b4zdkYCs8tO9-ZJcMzzYQtJ4q14vIMD2@surus.db.elephantsql.com/gnftqdni").await.unwrap();
    println!("{}",req_body);
    let val:Value = from_str(&req_body).unwrap();
    let search:i64=  val["userId"].as_i64().unwrap();
    let row = sqlx::query("delete from users where userId = $1;")
        .bind(&search)
        .execute(&pool)
        .await.unwrap();
    HttpResponse::Ok().body(req_body)
    
}


async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()>{

    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .service(list)
            .service(create_user)
            .service(list_users)
            .service(delete_users)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await

}
