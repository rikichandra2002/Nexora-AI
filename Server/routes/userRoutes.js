import express from "express";

import { auth } from "../middlewares/auth.js";

import {
    getUserCreations,
    getPublishedCreations,
    toggleLikeCreation,
    deleteCreation,
    deleteAllCreations,
} from "../controllers/UserController.js";

const userRouter = express.Router();


// =====================================================
// GET USER CREATIONS
// =====================================================

userRouter.get(
    "/get-user-creations",
    auth,
    getUserCreations
);


// =====================================================
// GET PUBLISHED CREATIONS
// =====================================================

userRouter.get(
    "/get-published-creations",
    auth,
    getPublishedCreations
);


// =====================================================
// TOGGLE LIKE
// =====================================================

userRouter.post(
    "/toggle-like-creations",
    auth,
    toggleLikeCreation
);


// =====================================================
// DELETE ONE CREATION
// =====================================================

userRouter.delete(
    "/delete-creation/:id",
    auth,
    deleteCreation
);


// =====================================================
// DELETE ALL CREATIONS
// =====================================================

userRouter.delete(
    "/delete-all-creations",
    auth,
    deleteAllCreations
);


export default userRouter;