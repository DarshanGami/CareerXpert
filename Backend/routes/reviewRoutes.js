import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewares/auth';
import { addReview, deleteReview, getReviews, updateReview } from '../controllers/reviewController';

const reviewRouter = express.Router();

reviewRouter.post('/:companyId', isAuthenticated, isAuthorized('Job Seeker'), addReview)
reviewRouter.get('/:companyId', isAuthenticated, getReviews)
reviewRouter.delete('/:reviewId', isAuthenticated, isAuthorized('Job Seeker'),
deleteReview)
reviewRouter.patch('/:reviewId', isAuthenticated, isAuthorized('Job Seeker'), updateReview)

export default reviewRouter;