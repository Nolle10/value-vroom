/**
 * Generated by @openapi-codegen
 *
 * @version 0.1.0
 */
export type BodyCreateBookingBookingsPost = {
  /**
   * @format date-time
   */
  end_date: string
  car_id: number
  start_date?: string | null
}

export type BodyCreateReview = {
  rating: number
  review: string
  car_id: number
}

export type BodyLoginTokenPost = {
  grant_type?: string | null
  username: string
  password: string
  /**
   * @default
   */
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type BodySignupSignupPost = {
  username: string
  email: string
  full_name: string
  password: string
}

/**
 * Represents a Booking record
 */
export type Booking = {
  id: number
  /**
   * @format date-time
   */
  start_date: string
  /**
   * @format date-time
   */
  end_date: string
  car_id: number
  car?: Car | null
  user?: User | null
  username: string
  status_name: string
  status?: BookingStatus | null
}

/**
 * Represents a BookingStatus record
 */
export type BookingStatus = {
  name: string
  Booking?: Booking[] | null
}

/**
 * Represents a Car record
 */
export type Car = {
  id: number
  car_model?: CarModel | null
  car_model_name: string
  year: number
  country: string
  city: string
  price: number
  rating: number
  Booking?: Booking[] | null
  Reviews?: Review[] | null
}

/**
 * Represents a CarBrand record
 */
export type CarBrand = {
  name: string
  CarModel?: CarModel[] | null
}

/**
 * Represents a CarModel record
 */
export type CarModel = {
  name: string
  brand_name: string
  image_name: string
  horse_power: number
  fuel_type: string
  fuel_economy: number
  brand?: CarBrand | null
  image?: Image | null
  Car?: Car[] | null
}

export type HTTPValidationError = {
  detail?: ValidationError[]
}

/**
 * Represents a Image record
 */
export type Image = {
  name: string
  /**
   * @format byte
   */
  data: string
  CarModel?: CarModel[] | null
}

/**
 * Represents a Review record
 */
export type Review = {
  id: number
  car_id: number
  car?: Car | null
  user?: User | null
  username: string
  rating: number
  comment: string
}

/**
 * Represents a Token record
 */
export type Token = {
  access_token: string
  token_type: string
}

/**
 * Represents a User record
 */
export type User = {
  username: string
  email: string
  full_name: string
  hashed_password: string
  Booking?: Booking[] | null
  Reviews?: Review[] | null
}

export type ValidationError = {
  loc: (string | number)[]
  msg: string
  type: string
}
