import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {

  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db("reviewsDB").collection("reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles: ${e}`)
    }
  }

  // ADD REVIEW
  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review
      }

      return await reviews.insertOne(reviewDoc)

    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  // GET REVIEW BY ID
  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: new ObjectId(reviewId) })
    } catch (e) {
      console.error(`Something went wrong: ${e}`)
      return { error: e }
    }
  }

  // GET REVIEWS BY MOVIE ID
  static async getReviewsByMovieId(movieId) {
    try {
      return await reviews.find({ movieId: movieId }).toArray()
    } catch (e) {
      console.error(`Unable to get movie reviews: ${e}`)
      return { error: e }
    }
  }

  // UPDATE
  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  // DELETE
  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId)
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }
}